import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { Auth, CredentialReset } from "../models/auth.model";
import { ResponseBuilder } from "../utils/response.utils";

export async function login(req: Request, resp: Response) {
	var authUser = <Auth>req.body;
	resp
		.status(200)
		.send(ResponseBuilder.buildResponse(200, "authentication success", {}));
	return;
}

export default {
	login,
};
