import { Auth, CredentialReset } from "../models/auth.model";
import Dbfactory from "../dbmanager/db.factory";
import Dbmanager from "../dbmanager/sql.manager";
import queries from "../utils/queries.utils";

export class AuthService {
	private dbmanager: Dbmanager;
	constructor() {
		this.dbmanager = Dbfactory.instance;
	}
	public static get instance() {
		return new AuthService();
	}
	async authenticate(auth: Auth) {}
}
