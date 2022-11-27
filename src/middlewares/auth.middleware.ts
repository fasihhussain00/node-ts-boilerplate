import { verifyToken } from "../utils/jwt.utils";
import { NextFunction, Request, response, Response } from "express";
import appConfig from "../configs/app.config";

export function authorize(allowedPermissions: string[]) {
	return [
		async (req: Request, res: Response, next: NextFunction) => {
			let [tokenExists, token] = getTokenIfExist(req);
			let [apiKeyExists, apiKey] = getApiKeyIfExist(req);
			if (!tokenExists && !apiKeyExists) {
				res.status(401).send({
					status: 4001,
					message:
						"insufficient permission to access this resource. please use token or api-key to access authorized resource",
				});
			}
			if (tokenExists && apiKeyExists) {
				res.status(400).send({
					status: 4002,
					message: "only one must be use either token or api-key",
				});
			}
			if (apiKeyExists) {
				let valid = isApiKeyValid(apiKey);
				if (!valid)
					res.status(401).send({
						status: 4003,
						message: "api-key mismatched",
					});
				if (!isApiAuthenticationAllowed(allowedPermissions)) {
					res.status(401).send({
						status: 4004,
						message: "resource is not api-key authorized",
					});
				}
				return next();
			}
			if (tokenExists) {
				let [valid, payload] = await verifyTokenAndGetPayload(token);
				if (!valid) {
					res.status(401).send({
						status: 4005,
						message: "invalid or expired token",
					});
				}
				let tokenPermissions = getTokenPermissionsFromPayload(payload);
				if (
					!isTokenHasAnyAllowedPermission(tokenPermissions, allowedPermissions)
				) {
					res.status(401).send({
						status: 4006,
						message: "insufficient permission to access this resource.",
					});
				}
			}
		},
	];
}

async function verifyTokenAndGetPayload(
	token: any
): Promise<[valid: boolean, payload: any]> {
	try {
		let payload = await verifyToken(token);
		return [true, payload];
	} catch (err: any) {
		return [false, null];
	}
}

function isTokenHasAnyAllowedPermission(
	tokenPermissions: string[],
	allowedPermissions: string[]
): boolean {
	if (!allowedPermissions.filter((x) => x != "API_AUTH").length) return true;
	return allowedPermissions.some((permission) =>
		tokenPermissions.includes(permission)
	);
}

function getTokenPermissionsFromPayload(payload: any): string[] {
	return payload.permissions?.split(",");
}

function getTokenIfExist(req: Request): [exist: boolean, token: string] {
	if (typeof req.headers["authorization"] === "string") {
		return [true, req.headers["authorization"]];
	}
	return [false, ""];
}

function getApiKeyIfExist(req: Request): [exist: boolean, apiKey: string] {
	if (typeof req.headers["api-key"] === "string") {
		return [true, req.headers["api-key"]];
	}
	return [false, ""];
}

function isApiAuthenticationAllowed(allowedPermissions: string[]) {
	return allowedPermissions.some((x) => x == "API_AUTH");
}

function isApiKeyValid(apiKey: string) {
	return apiKey == appConfig.apiKey;
}
