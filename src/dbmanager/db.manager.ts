export interface IDbManager {
	releaseConnection(): void;
	query(query: string, parameters: {}): Promise<any[]>;
	beginTran(): Promise<void>;
	commitTran(): Promise<void>;
	rollbackTran(): Promise<void>;
}
