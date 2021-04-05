const deleteEventUc = require('../../usecase/events/deleteEvent');

const invoke = async (req) => {
  const eventId = req.params.eventId;
  const currentUser = req.user.sub;
  return await deleteEventUc.handle(eventId, currentUser);
};

module.exports = { invoke };
