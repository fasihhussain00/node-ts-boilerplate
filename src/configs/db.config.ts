export default {
	host: process.env.GFE_APP_DB_HOST,
	user: process.env.GFE_APP_DB_USER,
	password: process.env.GFE_APP_DB_PASSWORD,
	port: parseInt(process.env.GFE_APP_DB_PORT || "3306"),
	database: process.env.GFE_APP_DB_NAME,
	namedPlaceholders: true,
	multipleStatements: true,
	timezone: "+00:00",
};
