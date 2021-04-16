const updateUserUc = require('../../usecase/users/updateUser');

const invoke = async (req) => {
  const userId = req.user.sub;
  const updatedUserDto = { ...req.body };
  return await updateUserUc.handle(userId, updatedUserDto);
};

module.exports = { invoke };
