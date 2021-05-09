const participantRepo = require('../repositories/participants');
const mailgunRepo = require('../repositories/mailgun');

class SendUpdatedEventEmail {
  async receive(updatedEvent) {
    const _id = updatedEvent.getId();
    const joinedParticipantsList = await participantRepo.listParticipants(_id);

    return mailgunRepo.sendUpdatedEventEmail(joinedParticipantsList, _id);
  }
}

module.exports = SendUpdatedEventEmail;
