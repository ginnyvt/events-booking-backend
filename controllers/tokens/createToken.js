const createTokenUc = require('../../usecase/tokens/createToken');
const createError = require('http-errors');

const invoke = async (req) => {
	if (!req.body.email || !req.body.password) {
		throw createError(400, `Inputs are not valid!`);
	}
	const foundUser = await createTokenUc.handle(req.body);
	const removeProp = 'password';
	const { [removeProp]: remove, ...rest } = foundUser;
	return rest;
};

module.exports = { invoke };
