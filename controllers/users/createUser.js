const createUserUc = require('../../usecase/users/createUser');
const createError = require('http-errors');

const invoke = async (req) => {
	if (
		!req.body.firstName ||
		!req.body.lastName ||
		!req.body.email ||
		!req.body.password
	) {
		throw createError(400, `Inputs are not valid!`);
	}

	const incomingUser = { ...req.body };

	const insertedUser = await createUserUc.handle(incomingUser);
	const removeProp = 'password';
	const { [removeProp]: remove, ...rest } = insertedUser;
	return rest;
};

module.exports = { invoke };
