import { CustomException } from "./custom.base.exception";

export class IncorrectCredentials extends CustomException {
	statusCode: number;
	customCode: number;
	message: string;
	data: any;
	constructor() {
		super();
		this.customCode = 2001;
		this.data = null;
		this.message = "Incorrect credentials";
		this.statusCode = 404;
	}
}
