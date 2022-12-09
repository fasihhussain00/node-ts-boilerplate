import { PoolConnection, createPool, Pool } from "mysql2/promise";
import dbconfig from "../configs/db.config";
import { IDbManager } from "./db.manager";

let pool: Pool = createPool(dbconfig);

export class SqlDbManager implements IDbManager {
	connection!: PoolConnection;
	public async beginTran() {
		this.connection ??= await pool.getConnection();
		await this.connection.beginTransaction();
	}
	public async commitTran() {
		await this.connection.commit();
		this.connection.release();
	}
	public async rollbackTran() {
		await this.connection.rollback();
		this.connection.release();
	}
	public releaseConnection() {
		this.connection.release();
	}
	public async query(query: string, parameters: {}): Promise<any[]> {
		this.connection ??= await pool.getConnection();
		try {
			let [rows] = await this.connection.query(query, parameters);
			return rows as any[];
		} catch (error) {
			await this.rollbackTran();
			throw error;
		}
	}
}
