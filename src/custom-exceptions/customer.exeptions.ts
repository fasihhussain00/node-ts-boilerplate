import { CustomException } from "./custom.base.exception";

export class CustomerNotFound extends CustomException {
	statusCode: number;
	customCode: number;
	message: string;
	data: any;
	constructor() {
		super();
		this.customCode = 1001;
		this.data = null;
		this.message = "customer not found";
		this.statusCode = 404;
	}
}
export class CustomerEmailAlreadyExist extends CustomException {
	statusCode: number;
	customCode: number;
	message: string;
	data: any;
	constructor() {
		super();
		this.customCode = 1002;
		this.data = null;
		this.message = "customer email already exist";
		this.statusCode = 400;
	}
}
