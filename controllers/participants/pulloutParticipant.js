const pulloutParticipantUc = require('../../usecase/participants/pulloutParticipant');

const invoke = async (req) => {
  const userId = req.user.sub;
  const { eventId } = req.params;
  const pulloutParticipantDto = { userId, eventId };
  return await pulloutParticipantUc.handle(pulloutParticipantDto);
};

module.exports = { invoke };
