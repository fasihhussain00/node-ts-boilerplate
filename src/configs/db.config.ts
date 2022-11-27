export default {
	host: process.env.NODE_APP_DB_HOST,
	user: process.env.NODE_APP_DB_USER,
	password: process.env.NODE_APP_DB_PASSWORD,
	port: parseInt(process.env.NODE_APP_DB_PORT || "3306"),
	database: process.env.NODE_APP_DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	namedPlaceholders: true,
	multipleStatements: true,
	timezone: "+00:00",
};
