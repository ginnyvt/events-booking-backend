const registerParticipantUc = require('../../usecase/participants/registerParticipant');

const invoke = async (req) => {
  const userId = req.user.sub;
  const { eventId } = req.params;
  const registerParticipantDto = { userId, eventId };
  return await registerParticipantUc.handle(registerParticipantDto);
};

module.exports = { invoke };
