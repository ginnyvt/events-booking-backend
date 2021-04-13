const mailgunRepo = require('../repositories/mailgun');

class SendCreatedEventEmail {
  receive(createdEvent) {
    const eventInfo = {
      eventId: createdEvent.getId(),
      title: createdEvent.getTitle(),
      location: createdEvent.getAddress(),
      time: createdEvent.getStartTime(),
    };

    return mailgunRepo.sendCreatedEventEmail(eventInfo);
  }
}

module.exports = SendCreatedEventEmail;
