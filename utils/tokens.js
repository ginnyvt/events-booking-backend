const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const generateAccessToken = (userEmail) => {
	try {
		return jwt.sign({ userEmail }, process.env.TOKEN_SECRET, {
			expiresIn: '24h',
		});
	} catch (err) {
		throw createError(
			500,
			`Cannot generate access token, the error was ${err.message}`
		);
	}
};

module.exports = { generateAccessToken };
