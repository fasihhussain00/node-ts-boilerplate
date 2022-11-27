import { Auth, CredentialReset } from "../models/auth.model";
import Dbfactory from "../dbmanager/db.factory";
import Dbmanager from "../dbmanager/db.manager";
import queries from "../utils/queries.utils";
import { generateToken } from "../utils/jwt.utils";
import { AuthStatusCode } from "../custom-exceptions/custom.base.exception";
import { generateHash, validateHash } from "../utils/hashing.utils";
import { getUUID } from "../utils/uuid.utils";
import appConfig from "../configs/app.config";
import { sendMail } from "../utils/email.utils";
import templates from "../utils/template.utils";

export class AuthService {
	private dbmanager: Dbmanager;
	constructor() {
		this.dbmanager = Dbfactory.instance;
	}
	public static get instance() {
		return new AuthService();
	}
	async authenticate(auth: Auth): Promise<{ code: AuthStatusCode; data: any }> {
		let authorizedUser: any;
		var parameters = {
			emailorusername: auth.emailOrUsername,
		};

		var table = await this.dbmanager.executeQuery(queries.authUser, parameters);
		if (table.rows)
			authorizedUser = Array.isArray(table.rows) ? table.rows[0] : table.rows;
		if (!authorizedUser) {
			return { code: AuthStatusCode.UserNotFound, data: {} };
		}

		if (!validateHash(auth.password, authorizedUser.password)) {
			return { code: AuthStatusCode.UserNotFound, data: {} };
		}
		if (!authorizedUser.isActive) {
			return { code: AuthStatusCode.UserNotActive, data: {} };
		}

		authorizedUser.password = undefined;

		try {
			let { token, generatedAt, expiresAt } = await generateToken(
				authorizedUser
			);
			authorizedUser.permissions = undefined;
			return {
				code: AuthStatusCode.Success,
				data: {
					data: authorizedUser,
					token: token,
					generatedAt: generatedAt,
					expiresAt: expiresAt,
				},
			};
		} catch (error: any) {
			return { code: AuthStatusCode.TokenNotGenerated, data: error };
		}
	}
	async saveCredentails(
		id: number,
		username: any,
		password: any,
		user: any | null = null
	): Promise<number> {
		let userid: number = 0;

		let parameters = {
			id: id,
			username: username,
			password: generateHash(password),
			updatedby: user?.id ?? null,
		};

		let table = await this.dbmanager.executeQuery(
			queries.saveCredentials,
			parameters,
			true
		);
		if (table.rows)
			userid = Array.isArray(table.rows)
				? table.rows[1][0].id
				: table.rows[0].id;

		return id;
	}

	async setActiveStatus(
		id: number,
		isActive: boolean,
		user: any | null = null
	): Promise<void> {
		let parameters = {
			id: id,
			isActive: isActive,
			updatedby: user?.id ?? null,
		};

		await this.dbmanager.executeQuery(queries.markActive, parameters, true);
	}

	async changeCredentials(
		credentialReset: CredentialReset,
		user: any
	): Promise<{ code: AuthStatusCode; data: any }> {
		let currentUser = await this.getUser(user.id);
		if (!currentUser) {
			return { code: AuthStatusCode.UserNotFound, data: null };
		}
		if (!validateHash(credentialReset.currentPassword, currentUser.password)) {
			return { code: AuthStatusCode.PasswordDoNotMatch, data: null };
		}
		await this.saveCredentails(
			currentUser.id,
			null,
			credentialReset.newPassword,
			{
				id: currentUser.id,
			}
		);
		return { code: AuthStatusCode.Success, data: null };
	}

	private async getUser(
		userId: number | null = null,
		email: string | null = null
	): Promise<any> {
		let parameters = {
			id: userId,
			email: email,
		};

		if (userId || email) {
			let table = await this.dbmanager.executeQuery(
				queries.getUser,
				parameters
			);
			return table.rows[0];
		}
		return null;
	}

	private async saveOtp(userid: number, otp: string) {
		let parameters = {
			userid: userid,
			token: otp,
		};
		await this.dbmanager.executeQuery(queries.saveOtp, parameters);
	}

	private async removeAllUserOtp(userid: number) {
		let parameters = {
			userid,
		};
		await this.dbmanager.executeQuery(queries.removeOtp, parameters);
	}

	private async getOTP(userid: number): Promise<any> {
		let parameters = {
			userid,
		};

		let table = await this.dbmanager.executeQuery(queries.fetchOtp, parameters);
		return table.rows[0];
	}
	async resetPassword(
		userid: number,
		otp: string,
		newPassword: string
	): Promise<AuthStatusCode> {
		let storedOtp = await this.getOTP(userid);
		if (otp !== storedOtp?.token) {
			return AuthStatusCode.InvalidOrExpiredOTP;
		}
		await this.saveCredentails(userid, null, newPassword, {
			id: userid,
		});
		await this.removeAllUserOtp(userid);
		return AuthStatusCode.Success;
	}
	async sendResetPasswordEmail(userEmail: string): Promise<AuthStatusCode> {
		let user = await this.getUser(null, userEmail);
		if (!user) return AuthStatusCode.UserNotFound;
		let otp = this.generateOTP();
		await this.saveOtp(user.id, otp);
		await this.sendPasswordResetLinkEmail(user, otp);
		return AuthStatusCode.Success;
	}

	private async sendPasswordResetLinkEmail(user: any, otp: string) {
		let url = `${appConfig.frontendBaseUrl}`;
		let templateData = {
			url: `${url}/password/reset?userid=${user.id}&otp=${otp}`,
			username: user.username,
			email: user.email,
			buttonTitle: "Reset Password",
		};
		let emailResponse = await sendMail(
			user.email,
			"Password Reset GFE",
			templates.passwordReset,
			true,
			templateData
		);
		return emailResponse;
	}

	private generateOTP(): string {
		return getUUID();
	}
}
