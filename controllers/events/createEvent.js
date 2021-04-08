const createEventUc = require('../../usecase/events/createEvent');
const createError = require('http-errors');

const invoke = async (req) => {
  if (!req.body.title) {
    throw new Error('Title is required!');
  }

  if (!req.body.address) {
    throw new Error('Address is required!');
  }

  if (!req.body.startTime) {
    throw new Error('Starting time is required!');
  }

  if (!req.body.endTime) {
    throw new Error('Ending time is required!');
  }

  if (!req.body.registerBefore) {
    throw new Error('Registration before is required!');
  }

  if (!req.body.cancelBefore) {
    throw new Error('Cancellation before is required!');
  }

  // if (!req.body.maxParticipants) {
  //   throw new Error('Max participants is required!');
  // }

  // if (!req.body.minParticipants) {
  //   throw new Error('Min participants is required');
  // }

  const validatedEvent = { ...req.body, userId: req.user.sub };

  return await createEventUc.handle(validatedEvent);
};

module.exports = { invoke };
