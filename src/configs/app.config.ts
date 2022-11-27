export default {
	port: parseInt(process.env.NODE_APP_PORT || "5000"),
	frontendBaseUrl: process.env.NODE_APP_BASE_URL,
	baseUrl: process.env.NODE_API_BASE_URL,
	corsOptions: {
		origin: "*",
		optionsSuccessStatus: 200,
	},
	socketCorsOptions: {
		origin: "*",
		optionsSuccessStatus: 200,
	},
	apiKey: process.env.NODE_APP_API_KEY,
	onlineAdminsAllowedPingDelayInSeconds: 60,
};
