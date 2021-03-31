const userRepo = require('../../repositories/users');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const { generateAccessToken } = require('../../utils/tokens');

const handle = async (validatedUser) => {
	const existUser = await userRepo.getByEmail(validatedUser.email);

	if (existUser) {
		return bcrypt
			.compare(validatedUser.password, existUser.password)
			.then((result) => {
				console.log(result);
				if (result) {
					// create token here
					const token = generateAccessToken(existUser.email);
					return { ...existUser, token };
				} else {
					throw createError(401, 'Incorrect Password!');
				}
			});
		// .catch((err) => {
		// 	throw createError(401, err.message);
		// });
	} else {
		throw createError(400, 'Cannot find the requested user!');
	}
};

module.exports = { handle };
