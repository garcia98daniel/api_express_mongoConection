require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 8080,
	CORS: process.env.CORS,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME
}

module.exports = { config };