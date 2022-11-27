export class Auth {
	public emailOrUsername: string | undefined | null = null;
	public password: string | undefined | null = null;
}

export class CredentialReset {
	public currentPassword: string | undefined | null = null;
	public newPassword: string | undefined | null = null;
	public confirmPassword: string | undefined | null = null;
}
