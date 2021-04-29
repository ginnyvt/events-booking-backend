const updateUserUc = require('../../usecase/users/updateUser');
const createError = require('http-errors');

const invoke = async (req) => {
  const userId = req.user.sub;
  const updatedUserDto = { ...req.body };

  if (req.body.given_name === '') {
    throw createError(400, 'First name is required!');
  }

  if (req.body.family_name === '') {
    throw createError(400, 'Last name is required!');
  }

  return await updateUserUc.handle(userId, updatedUserDto);
};

module.exports = { invoke };
