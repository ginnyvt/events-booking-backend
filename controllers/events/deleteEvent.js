const deleteEventUc = require('../../usecase/events/deleteEvent');

const invoke = async (req) => {
  const eventId = req.params.eventId;
  return await deleteEventUc.handle(eventId);
};

module.exports = { invoke };
