const mongoConnect = require('../database/mongodb');
const createError = require('http-errors');

const insert = async (user) => {
	const { firstName, lastName, email, password } = user;
	const db = await mongoConnect.connectdb();
	try {
		await db.collection('users').insertOne({
			_id: user.id,
			firstName,
			lastName,
			email,
			password,
		});
		return user;
	} catch (err) {
		throw createError(500, err.message);
	}
};

const checkExist = async (userEmail) => {
	const db = await mongoConnect.connectdb();
	try {
		const result = await db
			.collection('users')
			.findOne({ email: `${userEmail}` });
		return result !== null;
	} catch (err) {
		throw createError(500, err.message);
	}
};

const getByEmail = async (userEmail) => {
	const db = await mongoConnect.connectdb();
	try {
		const result = await db.collection('users').findOne({ email: userEmail });
		return result;
	} catch (err) {
		throw createError(500, err.message);
	}
};

module.exports = { insert, checkExist, getByEmail };
