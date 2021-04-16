const getUserUc = require('../../usecase/users/getUser');

const invoke = async (req) => {
  const { userId } = req.params;
  return await getUserUc.handle(userId);
};

module.exports = { invoke };
