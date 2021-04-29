const countParticipantsUc = require('../../usecase/participants/countParticipants');

const invoke = async (req) => {
  const { eventId } = req.params;
  return await countParticipantsUc.handle(eventId);
};

module.exports = { invoke };
