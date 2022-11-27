import { Connection, createConnection } from "mysql2/promise";
import dbconfig from "../configs/db.config";
import { log } from "../utils/log.utils";

export default class dbmanager {
	constructor() {}

	public async executeQuery(
		query: string,
		parameters: {},
		executeWithinTranscation: boolean = false
	): Promise<{ rows: any; fields: any }> {
		let conn = await createConnection(dbconfig);
		await conn.connect();
		executeWithinTranscation && (await conn.beginTransaction());
		try {
			let [rows, fields] = await conn.query(query, parameters);
			executeWithinTranscation && (await conn.commit());
			conn.end();
			return { rows: Object.values(JSON.parse(JSON.stringify(rows))), fields };
		} catch (error) {
			executeWithinTranscation && (await conn.rollback());
			log(error);
		}
		return { rows: null, fields: null };
	}
}
