export async function autoGenerateCredentails(): Promise<{
	username: string;
	password: string;
}> {
	let usernameRandomCodeLength = 4,
		passwordRandomCodeLength = 8;

	let usernameCharset = "abcdefghijklmnopqrstuvwxyz0123456789",
		passwordCharset =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	let usernameRandomCode = "",
		passwordRandomCode = "";

	for (
		let i = 0, n = usernameCharset.length;
		i < usernameRandomCodeLength;
		++i
	) {
		usernameRandomCode += usernameCharset.charAt(Math.floor(Math.random() * n));
	}

	for (
		let i = 0, n = passwordCharset.length;
		i < passwordRandomCodeLength;
		++i
	) {
		passwordRandomCode += passwordCharset.charAt(Math.floor(Math.random() * n));
	}

	let username = usernameRandomCode;
	let password = passwordRandomCode;

	return { username: username, password: password };
}
