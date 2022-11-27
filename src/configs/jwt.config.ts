export default {
	secretKey: process.env.GFE_APP_JWT_SECRET_KEY || "",
	expiresIn: 9999999999,
};
