import { CustomerService } from "./../services/customer.service";
import { Request, Response } from "express";
import { Customer } from "../models/customer.model";
import { ResponseBuilder } from "../utils/response.utils";

export async function addCustomer(req: Request, resp: Response) {
	var customer = <Customer>req.body;
	resp
		.status(201)
		.send(
			ResponseBuilder.buildResponse(201, "successfully created customer", {})
		);
	return;
}

export async function getCustomer(req: Request, resp: Response) {
	resp
		.status(200)
		.send(ResponseBuilder.buildResponse(200, "customer found", {}));
	return;
}

export async function filterCustomer(req: Request, resp: Response) {
	resp
		.status(200)
		.send(ResponseBuilder.buildResponse(200, "customer found", {}));
	return;
}

export default {
	addCustomer,
	getCustomer,
	filterCustomer,
};
