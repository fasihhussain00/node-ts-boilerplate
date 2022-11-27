export class Admin {
	public id: number | undefined | null;
	public name: string | undefined | null;
	public email: string | undefined | null;
	public createdAt: Date | undefined | null;
	public createdBy: number | undefined | null;
	public updatedAt: Date | undefined | null;
	public updatedBy: number | undefined | null;

	constructor() {
		this.id = null;
		this.name = null;
		this.email = null;
		this.createdAt = null;
		this.createdBy = null;
		this.updatedAt = null;
		this.updatedBy = null;
	}
}
