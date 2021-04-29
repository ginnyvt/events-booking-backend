const updateEventUc = require('../../usecase/events/updateEvent');

const invoke = async (req) => {
  const eventDto = { id: req.params.eventId, ...req.body };
  const currentUser = req.user.sub;
  console.log(eventDto);
  return await updateEventUc.handle(eventDto, currentUser);
};

module.exports = { invoke };
