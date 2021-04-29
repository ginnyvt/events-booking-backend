const participantRepo = require('../../repositories/participants');

const handle = async (eventId) => {
  return await participantRepo.listParticipants(eventId);
};

module.exports = { handle };
