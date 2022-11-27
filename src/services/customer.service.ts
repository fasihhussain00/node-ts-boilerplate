import { toSqlDatetime } from "./../utils/date.utils";
import {
	CustomerInvoicingDetailSubscriptionFee,
	CustomerInvoicingDetail,
} from "./../models/customer.invoicing.model";
import { DirectorStatusCode } from "../custom-exceptions/custom.base.exception";
import { DirectorService } from "./director.service";
import Dbfactory from "../dbmanager/db.factory";
import Dbmanager from "../dbmanager/db.manager";
import queries from "../utils/queries.utils";
import { CustomerStatusCode } from "../custom-exceptions/custom.base.exception";
import { Customer, Location, MedicalGroup } from "../models/customer.model";
import { generateToken, verifyToken } from "../utils/jwt.utils";
import appConfig from "../configs/app.config";
import { sendMail } from "../utils/email.utils";
import templates from "../utils/template.utils";
import { CustomerContract } from "../models/customer.contract.model";
import { AuthService } from "./auth.service";
import { autoGenerateCredentails } from "../utils/auth.utils";
import contract from "../utils/contract.utils";
import { fileToBase64, getRootDirectory } from "../utils/file.utils";
import { htmlStringToPdf } from "../utils/pdf.utils";
import { getUUID } from "../utils/uuid.utils";
export class CustomerService {
	private dbmanager: Dbmanager;
	constructor() {
		this.dbmanager = Dbfactory.instance;
	}
	public static get instance() {
		return new CustomerService();
	}
	async addCustomer(
		customer: Customer
	): Promise<{ code: CustomerStatusCode; data: any }> {
		let addedCustomerId: number = 0;

		var parameters = {
			email: customer.companyEmail,
			companyName: customer.companyName,
			contactName: customer.contactName,
			companyPhone: customer.companyPhone,
			dbaName: customer.dbaName,
			businessWebsite: customer.businessWebsite,
			multipleLocations: customer.multipleLocations,
			billingContactName: customer.billingContactName,
			billingContactNumber: customer.billingContactNumber,
			status: "Pending",
			createdby: null,
		};

		var table = await this.dbmanager.executeQuery(
			queries.insertCustomer,
			parameters,
			true
		);
		if (table.rows)
			addedCustomerId = Array.isArray(table.rows)
				? table.rows[3][0].userId
				: table.rows[0].userId;

		if (!addedCustomerId) {
			return { code: CustomerStatusCode.EmailAlreadyExist, data: null };
		}

		if (customer.medicalGroup)
			await this.createCustomerMedicalDirector(
				customer.medicalGroup,
				addedCustomerId
			);

		if (customer?.companyAddress)
			await this.setCustomerLocations(customer.companyAddress, addedCustomerId);

		let createdCustomer = await this.getCustomer(addedCustomerId);
		if (createdCustomer.code == CustomerStatusCode.NotFound) {
			return { code: CustomerStatusCode.NotCreated, data: null };
		}

		return { code: CustomerStatusCode.Success, data: createdCustomer.data };
	}
	async getCustomer(
		id: number
	): Promise<{ code: CustomerStatusCode; data: any }> {
		let customers: any[] | null = null;

		var parameters = {
			id: id,
		};

		var table = await this.dbmanager.executeQuery(
			queries.fetchCustomer,
			parameters
		);
		if (table.rows)
			customers = Array.isArray(table.rows) ? table.rows : [table.rows];

		if (!customers || !customers.length) {
			return { code: CustomerStatusCode.NotFound, data: {} };
		}

		customers = await Promise.all(
			customers.map(async (x) => {
				x.multipleLocations = x.multipleLocations ? true : false;
				x.isContractSubmitted = x.isContractSubmitted ? true : false;
				let companyAddressAndMedicalDirector = await Promise.all([
					this.getCustomerLocations(x.id),
					this.fetchCustomerMedicalDirector(null, x.id),
				]);
				x.companyAddress = companyAddressAndMedicalDirector[0];
				x.medicalDirector = companyAddressAndMedicalDirector[1];
				return x;
			})
		);
		return { code: CustomerStatusCode.Success, data: customers[0] };
	}
	async filterCustomer(
		params: any
	): Promise<{ code: CustomerStatusCode; data: any[] }> {
		let customers: any[] | null = null;

		var parameters = { ...params };

		var table = await this.dbmanager.executeQuery(
			queries.filterCustomer,
			parameters
		);
		if (table.rows)
			customers = Array.isArray(table.rows) ? table.rows : [table.rows];

		if (!customers || !customers.length) {
			return { code: CustomerStatusCode.NotFound, data: [] };
		}

		customers = await Promise.all(
			customers.map(async (x) => {
				x.multipleLocations = x.multipleLocations ? true : false;
				x.isContractSubmitted = x.isContractSubmitted ? true : false;
				let companyAddressAndMedicalDirector = await Promise.all([
					this.getCustomerLocations(x.id),
					this.fetchCustomerMedicalDirector(null, x.id),
				]);
				x.companyAddress = companyAddressAndMedicalDirector[0];
				x.medicalDirector = companyAddressAndMedicalDirector[1];
				return x;
			})
		);
		return { code: CustomerStatusCode.Success, data: customers };
	}
	async patchCustomer(
		params: any,
		user: any = null
	): Promise<{ code: CustomerStatusCode; data: any[] }> {
		let patchedCustomerId: number = 0;

		var parameters = {
			customerid: params.id,
			companyName: params.companyName ?? null,
			contactName: params.contactName ?? null,
			companyphone: params.companyphone ?? null,
			companyAddress: params.companyAddress ?? null,
			dbaName: params.dbaName ?? null,
			businessWebsite: params.businessWebsite ?? null,
			multipleLocations: params.multipleLocations ?? null,
			stateOperateIn: params.stateOperateIn ?? null,
			billingContactName: params.billingContactName ?? null,
			billingContactNumber: params.billingContactNumber ?? null,
			medicalGroup: params.medicalGroup ?? null,
			status: params.status ?? null,
			gracePeriod: params.gracePeriod ?? null,
			subscriptionType: params.subscriptionType ?? null,
			updatedby: user?.id ?? params.id,
		};

		var table = await this.dbmanager.executeQuery(
			queries.patchCustomer,
			parameters
		);

		if (table.rows)
			patchedCustomerId = Array.isArray(table.rows)
				? table.rows[1][0]?.id
				: table.rows[0]?.id;

		if (!patchedCustomerId) {
			return { code: CustomerStatusCode.NotFound, data: [] };
		}

		let fetchedCustomer = await this.getCustomer(patchedCustomerId);
		if (
			!fetchedCustomer.data.isContractSubmitted &&
			fetchedCustomer.data.status.toLowerCase() == "approved"
		) {
			await sendContract(
				fetchedCustomer.data.id,
				fetchedCustomer.data.medicalDirector.email, //fetchedCustomer.data.companyEmail
				`${fetchedCustomer.data.medicalDirector.firstname} ${fetchedCustomer.data.medicalDirector.lastname}`
			);
		}

		return { code: CustomerStatusCode.Success, data: fetchedCustomer.data };
	}
	async addContract(
		contract: CustomerContract
	): Promise<{ code: CustomerStatusCode; data: any }> {
		let customerid: number = 0;
		let decodedPayload: any = null;
		if (contract?.token) {
			try {
				decodedPayload = await verifyToken(contract?.token);
			} catch (ex) {
				decodedPayload = null;
			}
		}

		if (!decodedPayload) {
			return { code: CustomerStatusCode.Error, data: null };
		}

		let customer = await this.getCustomer(decodedPayload.id);

		if (customer.data.isContractSubmitted) {
			return { code: CustomerStatusCode.NotCreated, data: null };
		}

		if (customer.data.status?.toLowerCase() != "approved") {
			return { code: CustomerStatusCode.NotCreated, data: null };
		}

		let medicalDirector = await DirectorService.instance.getMedicalDirector();

		if (medicalDirector.code == DirectorStatusCode.NotFound) {
			return { code: CustomerStatusCode.MedicalDirectorNotFound, data: null };
		}

		let contractFileUrl = generateContractAndGetUrl(
			contract,
			`${medicalDirector.data[0].firstname} ${medicalDirector.data[0].lastname}`
		);

		if (!contractFileUrl) {
			return { code: CustomerStatusCode.SignatureFileNotFound, data: null };
		}

		let parameters = {
			id: decodedPayload.id,
			contract: contractFileUrl,
			signature: contract.signatureUrl,
		};

		let table = await this.dbmanager.executeQuery(
			queries.addCustomerContract,
			parameters,
			true
		);
		if (table.rows)
			customerid = Array.isArray(table.rows)
				? table.rows[1][0].id
				: table.rows[0].id;

		let customerResult = await this.getCustomer(customerid);
		let { username, password } = await generateCredentials(customerResult.data);
		let userid = await AuthService.instance.saveCredentails(
			customerResult.data.id,
			username,
			password
		);
		await AuthService.instance.setActiveStatus(customerid, true, null);

		let { directorUsername, directorPassword } =
			await generateDirectorCredentials(customerResult.data.medicalDirector);

		if (customerResult.data.medicalDirector) {
			await AuthService.instance.saveCredentails(
				customerResult.data.medicalDirector.id,
				directorUsername,
				directorPassword
			);
			await AuthService.instance.setActiveStatus(
				customerResult.data.medicalDirector.id,
				true,
				null
			);
		}

		if (!userid) {
			return { code: CustomerStatusCode.Error, data: null };
		}
		await sendCrentials(
			customerResult.data.companyName,
			customerResult.data.companyEmail,
			username,
			password,
			templates.customerCredentials
		);
		if (customerResult.data.medicalDirector)
			await sendCrentials(
				`${customerResult.data.medicalDirector.firstname} ${customerResult.data.medicalDirector.lastname}`,
				customerResult.data.medicalDirector.email,
				directorUsername,
				directorPassword,
				templates.customerDirectorCredentials
			);
		return { code: CustomerStatusCode.Success, data: null };
	}

	public async countReport(
		queryParams: any
	): Promise<{ code: CustomerStatusCode; data: any }> {
		let customerCountReport: any[] = [];
		var parameters = {
			fromCreatedAt: queryParams?.fromCreatedAt
				? toSqlDatetime(queryParams?.fromCreatedAt)
				: null,
			toCreatedAt: queryParams?.toCreatedAt
				? toSqlDatetime(queryParams?.toCreatedAt)
				: null,
			status: queryParams?.status,
		};
		let table = await this.dbmanager.executeQuery(
			queries.customerCountReport,
			parameters
		);
		if (table.rows)
			customerCountReport = Array.isArray(table.rows)
				? table.rows
				: [table.rows];

		if (!customerCountReport.length)
			return { code: CustomerStatusCode.NotFound, data: null };

		return { code: CustomerStatusCode.Success, data: customerCountReport[0] };
	}

	private async setCustomerLocations(
		locations: Location[],
		customerId: number
	): Promise<void> {
		for (const location of locations) {
			let parameters = {
				userid: customerId,
				stateid: location.stateId,
				streetname: location.streetName,
				appartmentnumber: location.appartmentNumber,
				city: location.city,
				zip: location.zip,
			};
			await this.dbmanager.executeQuery(
				queries.insertCustomerLocation,
				parameters,
				true
			);
		}
	}

	private async saveCustomerSubscriptions(
		locationSubscription: CustomerInvoicingDetailSubscriptionFee,
		customerId: number
	): Promise<void> {
		let parameters = {
			id: locationSubscription.customerLocationId,
			fee: locationSubscription.fee,
			gfeFee: locationSubscription.gfeFee,
			userid: customerId,
		};
		await this.dbmanager.executeQuery(
			queries.saveCustomerSubscription,
			parameters,
			true
		);
	}

	private async getCustomerLocations(customerId: number): Promise<any> {
		let customers: any[] | null = null;
		let parameters = {
			customerid: customerId,
		};

		var table = await this.dbmanager.executeQuery(
			queries.fetchCustomerLocation,
			parameters
		);

		if (table.rows)
			customers = Array.isArray(table.rows) ? table.rows : [table.rows];

		return customers;
	}

	public async saveCustomerTreatments(
		treatmentIds: number[],
		user: any
	): Promise<{ code: CustomerStatusCode; data: any }> {
		let parameters = {
			customerId: user.id,
			treatmentIds: treatmentIds,
		};
		await this.dbmanager.executeQuery(
			queries.saveCustomerTreatment,
			parameters,
			true
		);

		let customerResult = await this.getCustomerTreatments(user.id);
		if (customerResult.code == CustomerStatusCode.NotFound) {
			return { code: CustomerStatusCode.NotFound, data: null };
		}
		return { code: CustomerStatusCode.Success, data: customerResult.data };
	}

	public async getCustomerTreatments(
		customerId: number
	): Promise<{ code: CustomerStatusCode; data: any }> {
		let customerTreatments = [];
		let parameters = {
			customerId: customerId,
		};
		let table = await this.dbmanager.executeQuery(
			queries.fetchCustomerTreatment,
			parameters
		);

		if (table.rows)
			customerTreatments = Array.isArray(table.rows)
				? table.rows
				: [table.rows];

		if (!customerTreatments || !customerTreatments.length) {
			return { code: CustomerStatusCode.NotFound, data: [] };
		}

		return { code: CustomerStatusCode.Success, data: customerTreatments };
	}

	public async createCustomerMedicalDirector(
		medicalDirector: MedicalGroup,
		customerId: number
	): Promise<void> {
		let parameters = {
			email: medicalDirector.email,
			customerId: customerId,
			firstname: medicalDirector.firstname,
			lastname: medicalDirector.lastname,
			phone: medicalDirector.phone,
			licenseType: medicalDirector.licenseType,
		};
		await this.dbmanager.executeQuery(
			queries.insertCustomerMedicalDirector,
			parameters,
			true
		);
	}
	public async fetchCustomerMedicalDirector(
		medicalDirectorId: number | null = null,
		customerId: number | null = null
	): Promise<any> {
		let customerMedicalDirector: any[] = [];
		let parameters = {
			id: medicalDirectorId,
			customerid: customerId,
		};
		let table = await this.dbmanager.executeQuery(
			queries.fetchCustomerMedicalDirector,
			parameters
		);

		if (table.rows)
			customerMedicalDirector = Array.isArray(table.rows)
				? table.rows
				: [table.rows];

		if (!customerMedicalDirector || !customerMedicalDirector.length) {
			return null;
		}

		return customerMedicalDirector[0];
	}

	public async emailCredentials(
		customerid: number
	): Promise<CustomerStatusCode> {
		let customerResult = await this.getCustomer(customerid);
		if (customerResult.code == CustomerStatusCode.NotFound) {
			return CustomerStatusCode.NotFound;
		}
		let { username, password } = await generateCredentials(customerResult.data);
		await AuthService.instance.saveCredentails(customerid, username, password);
		await AuthService.instance.setActiveStatus(customerid, true);
		await sendCrentials(
			customerResult.data.companyName,
			customerResult.data.companyEmail,
			username,
			password,
			templates.customerCredentials
		);
		return CustomerStatusCode.Success;
	}

	public async emailContract(customerid: number): Promise<CustomerStatusCode> {
		let customerResult = await this.getCustomer(customerid);
		if (customerResult.code == CustomerStatusCode.NotFound) {
			return CustomerStatusCode.NotFound;
		}

		if (customerResult.data.isContractSubmitted) {
			return CustomerStatusCode.ContractAlreadySubmitted;
		}

		await sendContract(
			customerid,
			customerResult.data.medicalDirector.email,
			`${customerResult.data.medicalDirector.firstname} ${customerResult.data.medicalDirector.lastname}`
		);
		return CustomerStatusCode.Success;
	}

	public async saveInvoicingDetail(
		invoicingDetail: CustomerInvoicingDetail,
		user: any
	): Promise<{ code: CustomerStatusCode; data: null }> {
		let subscriptionDetailToBePatched = {
			id: invoicingDetail.customerId,
			subscriptionType: invoicingDetail.subscriptionType,
			gracePeriod: invoicingDetail.gracePeriod,
		};
		await this.patchCustomer(subscriptionDetailToBePatched, user);
		if (invoicingDetail.subscriptionFee)
			for (const feeDetail of invoicingDetail.subscriptionFee) {
				if (invoicingDetail.customerId)
					await this.saveCustomerSubscriptions(
						feeDetail,
						invoicingDetail.customerId
					);
			}
		return { code: CustomerStatusCode.Success, data: null };
	}
}
async function generateCredentials(customer: any): Promise<{
	username: string;
	password: string;
}> {
	let { username, password } = await autoGenerateCredentails();
	username = `${customer.contactName}${username}`.replace(/\s/g, "");
	return { username, password };
}

async function generateDirectorCredentials(director: any): Promise<{
	directorUsername: string;
	directorPassword: string;
}> {
	let { username, password } = await autoGenerateCredentails();
	let directorUsername =
		`${director.firstname}${director.lastname}${username}`.replace(/\s/g, "");
	return { directorUsername, directorPassword: password };
}
async function sendCrentials(
	name: string,
	email: string,
	username: string,
	password: string,
	template: string
) {
	let url = `${appConfig.frontendBaseUrl}`;
	let templateData = {
		name: name,
		url: url,
		username: username,
		email: email,
		password: password,
	};
	let emailResponse = await sendMail(
		email,
		"Credentials GFE",
		template,
		true,
		templateData
	);
	return emailResponse;
}

async function sendContract(
	customerid: number,
	customerEmail: string,
	customerMedicalDirectorName: string
): Promise<string> {
	let token = await generateToken({
		id: customerid,
		permissions: "CUSTOMER_FETCH,DIRECTOR_MEDICAL_FETCH",
	});
	let contractUrl = `${appConfig.frontendBaseUrl}/customer/contracts?id=${customerid}&token=${token.token}`;
	let templateData = {
		contractUrlTitle: "Submit Contracts",
		contractUrl: contractUrl,
		name: customerMedicalDirectorName,
	};
	let emailResponse = await sendMail(
		customerEmail,
		"GFE Contracts",
		templates.customerContract,
		true,
		templateData
	);
	return emailResponse;
}
function generateContractAndGetUrl(
	customerContractData: CustomerContract,
	medicalDirectorName: string
): string | null {
	let newFileName = `${getUUID()}.pdf`;
	let fileAccessPath = `${appConfig.baseUrl}/api/file/${newFileName}`;

	let destinationContractPdfPath = `${getRootDirectory()}/files/${newFileName}`;

	let signatureFileName =
		customerContractData.signatureUrl?.split("/").at(-1) || "error.png";

	let signatureFilePath = `${getRootDirectory()}/files/${signatureFileName}`;
	let signatureFileBase64 = fileToBase64(signatureFilePath);

	if (!signatureFileBase64) return null;
	let contactTemplateData = {
		CONTRACT_EFFECTIVE_DATE: customerContractData.effectiveDate,
		CUSTOMER_MEDICAL_DIRECTOR_1: customerContractData.customerMedicalDirector,
		CONTRACT_COMPANY_NAME: customerContractData.companyName,
		CONTRACT_COMPANY_LOCATION: customerContractData.companyLocation,
		CONTRACT_SUBSCRIPTION_FEE: customerContractData.subscriptionFee,
		MEDICAL_DIRECTOR_NAME: medicalDirectorName,
		CUSTOMER_SIGNATURE: `data:image/png;base64,${signatureFileBase64}`,
		CUSTOMER_MEDICAL_DIRECTOR_2: customerContractData.customerMedicalDirector,
	};
	htmlStringToPdf(
		contract.customerContractTemplate,
		destinationContractPdfPath,
		contactTemplateData
	);
	return fileAccessPath;
}
