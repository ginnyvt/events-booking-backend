const eventRepo = require('../../repositories/events');
const createError = require('http-errors');

const handle = async (currentUser) => {
  return await eventRepo.listMyEvents(currentUser);
};

module.exports = { handle };
