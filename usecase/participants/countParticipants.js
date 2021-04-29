const participantRepo = require('../../repositories/participants');

const handle = async (eventId) => {
  return await participantRepo.countParticipants(eventId);
};

module.exports = { handle };
