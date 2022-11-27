import { IDbManager } from "./db.manager";
import { SqlDbManager } from "./sql.manager";
export class DbFactory {
	public static get instance(): IDbManager {
		return new SqlDbManager();
	}
}
