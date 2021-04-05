const eventRepo = require('../../repositories/events');
const createError = require('http-errors');

const handle = async (eventType) => {
  if (eventType === 'upcoming') {
    return await eventRepo.listUpcomingEvents();
  }

  if (eventType === 'past') {
    return await eventRepo.listPastEvents();
  }

  throw createError(400, "Event's type not found!");
};

module.exports = { handle };
