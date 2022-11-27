export class ResponseBuilder {
	public static buildResponse(
		status: number,
		message: string,
		payload: any | null = null
	): Response | BaseResponse {
		if (payload) return new Response(status, message, payload);
		return new BaseResponse(status, message);
	}
}

class BaseResponse {
	public status: number;
	public message: string;
	constructor(status: number, message: string) {
		this.message = message;
		this.status = status;
	}
}

class Response extends BaseResponse {
	public payload: any;
	constructor(status: number, message: string, payload: any) {
		super(status, message);
		this.payload = payload;
	}
}
