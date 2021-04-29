const listMyEventsUc = require('../../usecase/events/listMyEvents');
const createError = require('http-errors');

const invoke = async (req) => {
  const currentUser = req.user.sub;
  return await listMyEventsUc.handle(currentUser);
};

module.exports = { invoke };
