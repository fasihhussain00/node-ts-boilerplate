import { toSqlDatetime } from "./../utils/date.utils";
import Dbfactory from "../dbmanager/db.factory";
import Dbmanager from "../dbmanager/db.manager";
import queries from "../utils/queries.utils";
export class CustomerService {
	private dbmanager: Dbmanager;
	constructor() {
		this.dbmanager = Dbfactory.instance;
	}
	public static get instance() {
		return new CustomerService();
	}
	async addCustomer() {}
	async getCustomer(id: number) {}
	async filterCustomer(params: any) {}
}
