const eventRepo = require('../../repositories/events');
const createError = require('http-errors');

const handle = async (eventId) => {
  const foundEvent = await eventRepo.getById(eventId);
  if (foundEvent) {
    await eventRepo.remove(foundEvent._id);
    return foundEvent;
  } else {
    throw createError(404, 'No event with that id found!');
  }
};

module.exports = { handle };
