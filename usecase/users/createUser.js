const userRepo = require('../../repositories/users');
const User = require('../../entities/User');

const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');

const handle = async (validatedUser) => {
	const existUser = await userRepo.checkExist(validatedUser.email);
	if (!existUser) {
		const user = new User()
			.setId(uuidv4())
			.setFirstName(validatedUser.firstName)
			.setLastName(validatedUser.lastName)
			.setEmail(validatedUser.email);
		await user.setPassword(validatedUser.password);

		return await userRepo.insert(user.toObject());
	} else {
		throw createError(409, 'This user already exists!');
	}
};

module.exports = { handle };
