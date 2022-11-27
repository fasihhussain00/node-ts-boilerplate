let locationModel = {
	data: {
		name: "location1",
		type: "state",
	},
	setData: function (name: string, type: string) {
		this.data.name = name;
		this.data.type = type;
		return this;
	},
};

let customerModel = {
	data: {
		companyName: "test company",
		companyPhone: "123456789",
		contactName: "test",
		companyEmail: "customer5@gfe.com",
		dbaName: "dbaName",
		businessWebsite: "dba@dba.com",
		multipleLocations: true,
		billingContactName: "contName",
		billingContactNumber: "123456789",
		medicalGroup: {
			firstname: "medical",
			lastname: "director",
			phone: "123456789",
			email: "medical@asd.com",
			licenseType: "MD",
		},
		companyAddress: [
			{
				streetName: "test",
				appartmentNumber: "123",
				city: "test",
				stateId: 1,
			},
			{
				streetName: "test",
				appartmentNumber: "123",
				city: "test",
				stateId: 2,
			},
		],
	},
	setData: function (email: string, stateIds: number[]) {
		this.data.companyEmail = email;
		this.data.companyAddress = stateIds.map((x) => {
			return {
				streetName: "test",
				appartmentNumber: "123",
				city: "test",
				stateId: x,
			};
		});
		return this;
	},
};
var authModel = {
	data: {
		email: "admin@gfe.com",
		password: "123",
	},
	setData: function (email: string, password: string) {
		this.data.email = email;
		this.data.password = password;
		return this;
	},
};

let customerContract = {
	data: {
		token: null,
		signatureUrl:
			"https://gfe-dev-api/api/file/40dd14b0-2469-11ed-a639-67a73c90b1ea.pdf",
		contractUrl:
			"https://gfe-dev-api/api/file/40dd14b0-2469-11ed-a639-67a73c90b1ea.jpg",
	},
	setData: function (token: string, signatureUrl: string, contractUrl: string) {
		this.data.token = token;
		this.data.signatureUrl = signatureUrl;
		this.data.contractUrl = contractUrl;
	},
};

export { customerModel, customerContract, authModel, locationModel };
