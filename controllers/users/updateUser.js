const updateUserUc = require('../../usecase/users/updateUser');
const createError = require('http-errors');

const invoke = async (req) => {
  const userId = req.user.sub;
  const updatedUserDto = { ...req.body };

  if (
    req.body.given_name === '' &&
    req.body.family_name === '' &&
    req.body.email === ''
  ) {
    throw createError(400, 'Invalid input!');
  }

  if (req.body.given_name === '') {
    delete updatedUserDto.given_name;
  }

  if (req.body.family_name === '') {
    delete updatedUserDto.family_name;
  }

  if (req.body.email === '') {
    delete updatedUserDto.email;
  }

  return await updateUserUc.handle(userId, updatedUserDto);
};

module.exports = { invoke };
