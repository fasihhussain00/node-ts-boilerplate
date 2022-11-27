import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function validate(
	schema: Joi.ObjectSchema<any>,
	from: "body" | "param" | "query"
) {
	return [
		async (req: Request, res: Response, next: NextFunction) => {
			let validation;
			if (from === "body") validation = await schema.validateAsync(req.body);
			if (from === "param") validation = await schema.validateAsync(req.params);
			if (from === "query") validation = await schema.validateAsync(req.query);
			if (validation?.error) {
				let errorDetails = validation.error.details.map((x: any) => x.message);
				res.status(400).send(errorDetails);
				return;
			}
			next();
		},
	];
}
