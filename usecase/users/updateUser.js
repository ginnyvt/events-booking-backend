const userRepo = require('../../repositories/users');

const handle = async (userId, updatedUserDto) => {
  // console.log(userId, updatedUserDto);

  return await userRepo.update(userId, updatedUserDto);
};

module.exports = { handle };
