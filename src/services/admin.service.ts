import dbfactory from "../dbmanager/db.factory";
import DBmanager from "../dbmanager/sql.manager";

export class AdminService {
	private dbmanager: DBmanager;
	constructor() {
		this.dbmanager = dbfactory.instance;
	}
	public static get instance() {
		return new AdminService();
	}
	public async dashboard(user: any, timezone: string) {}
}
