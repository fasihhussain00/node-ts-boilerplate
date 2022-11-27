import { ResponseBuilder } from "./../utils/response.utils";
import { Request, Response } from "express";

export async function dashboard(req: Request, resp: Response) {
	resp
		.status(400)
		.send(ResponseBuilder.buildResponse(404, "admin dashboard not found."));
	return;
}

export default {
	dashboard,
};
