const updateEventUc = require('../../usecase/events/updateEvent');

const invoke = async (req) => {
  const event = { id: req.params.eventId, ...req.body, userId: req.user.sub };
  return await updateEventUc.handle(event);
};

module.exports = { invoke };
