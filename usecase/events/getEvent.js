const eventRepo = require('../../repositories/events');
const getUserUc = require('../../usecase/users/getUser');

const createError = require('http-errors');

const handle = async (eventId) => {
  const foundEvent = await eventRepo.getById(eventId);

  if (foundEvent) {
    const userId = foundEvent.createdBy;
    const foundUser = await getUserUc.handle(userId);
    return { ...foundEvent, creator: { ...foundUser } };
  } else {
    throw createError(404, 'No event with that id found!');
  }
};

module.exports = { handle };
