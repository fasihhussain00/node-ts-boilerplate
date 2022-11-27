import { PoolConnection, createPool, Pool } from "mysql2/promise";
import dbconfig from "../configs/db.config";
import { IDbManager } from "./db.manager";

let pool: Pool = createPool(dbconfig);

export class SqlDbManager implements IDbManager {
	connection!: PoolConnection;
	public async beginTran() {
		await this.createConnectionIfNotCreated();
		await this.connection.beginTransaction();
	}
	public async commitTran() {
		await this.connection.commit();
	}
	public async rollbackTran() {
		await this.connection.rollback();
	}
	public releaseConnection() {
		this.connection.release();
	}
	public async query(query: string, parameters: {}): Promise<any[]> {
		await this.createConnectionIfNotCreated();
		let [rows, fields] = await this.connection.query(query, parameters);
		return rows as any[];
	}
	private async createConnectionIfNotCreated() {
		if (!this.connection) this.connection = await pool.getConnection();
	}
}
