export class Customer {
	public id: number | null | undefined = null;
	public companyName: string | null | undefined = null;
	public contactName: string | null | undefined = null;
	public companyPhone: string | null | undefined = null;
	public companyEmail: string | null | undefined = null;
	public companyAddress: Location[] | null | undefined = null;
	public dbaName: string | null | undefined = null;
	public businessWebsite: string | null | undefined = null;
	public multipleLocations: boolean | null | undefined = null;
	public stateOperateIn: string[] | null | undefined = null;
	public billingContactName: string | null | undefined = null;
	public billingContactNumber: string | null | undefined = null;
	public medicalGroup: MedicalGroup | null | undefined = null;
}
export class Location {
	public streetName: string | null | undefined = null;
	public appartmentNumber: string | null | undefined = null;
	public city: string | null | undefined = null;
	public zip: string | null | undefined = null;
	public stateId: number | null | undefined = null;
}

export class MedicalGroup {
	public firstname: string | null | undefined = null;
	public lastname: string | null | undefined = null;
	public phone: string | null | undefined = null;
	public email: string | null | undefined = null;
	public licenseType: string | null | undefined = null;
}
