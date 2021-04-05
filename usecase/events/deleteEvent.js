const eventRepo = require('../../repositories/events');
const createError = require('http-errors');

const handle = async (eventId, currentUser) => {
  // Find the event to delete
  const foundEvent = await eventRepo.getById(eventId);

  if (foundEvent) {
    // Check permission; ONLY admin and owner can delete event
    const adminListArr = process.env.ADMINLIST.split(',');
    if (
      adminListArr.includes(currentUser) ||
      foundEvent.createdBy === currentUser
    ) {
      await eventRepo.remove(foundEvent._id);
      return foundEvent;
    } else {
      throw createError(
        400,
        'Your account is not allowed to delete the following event'
      );
    }
  } else {
    throw createError(404, 'No event with that id found!');
  }
};

module.exports = { handle };
