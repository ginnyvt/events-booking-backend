const userRepo = require('../../repositories/users');

const handle = async (userId, updatedUserDto) => {
  // console.log(userId, updatedUserDto);

  if (updatedUserDto.email === '') {
    delete updatedUserDto.email;
  }
  return await userRepo.update(userId, updatedUserDto);
};

module.exports = { handle };
