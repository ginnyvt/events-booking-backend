const listParticipantsUc = require('../../usecase/participants/listParticipants');

const invoke = async (req) => {
  const { eventId } = req.params;
  return await listParticipantsUc.handle(eventId);
};

module.exports = { invoke };
