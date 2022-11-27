import jwt from "jsonwebtoken";
import jwtConfig from "../configs/jwt.config";

export function generateToken(payload: any): Promise<any> {
	return new Promise((resolve, reject) => {
		let generatedAt = Date.now();
		jwt.sign(
			{ ...payload },
			jwtConfig.secretKey,
			{
				expiresIn: jwtConfig.expiresIn,
			},
			(err, token) => {
				token &&
					resolve({
						token: token,
						generatedAt: generatedAt,
						expiresAt: generatedAt + jwtConfig.expiresIn,
					});
				err && reject(err);
			}
		);
	});
}

export function verifyToken(token: string): Promise<any> {
	return new Promise((resolve, reject) => {
		jwt.verify(token, jwtConfig.secretKey, (err, decode) => {
			decode && resolve(decode);
			err && reject(err);
		});
	});
}
