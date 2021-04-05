const userRepo = require('../../repositories/users');

const handle = async (userId) => {
  return await userRepo.get(userId);
};

module.exports = { handle };
