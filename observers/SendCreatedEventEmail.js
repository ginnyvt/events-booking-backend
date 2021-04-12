const mailgunRepo = require('../repositories/mailgun');
const monthNames = require('../utils/monthNames');
const dayjs = require('dayjs');

class SendCreatedEventEmail {
  receive(createdEvent) {
    // const time = createdEvent.getStartTime();
    const eventInfo = {
      eventId: createdEvent.getId(),
      title: createdEvent.getTitle(),
      location: createdEvent.getAddress(),
      year: dayjs(createdEvent.getStartTime()).get('year'),
      month: monthNames[dayjs(createdEvent.getStartTime()).get('month')],
      day: dayjs(createdEvent.getStartTime()).get('date'),
      hour: dayjs(createdEvent.getStartTime()).get('hour'),
      minute: dayjs(createdEvent.getStartTime()).get('minute'),
    };

    return mailgunRepo.sendCreatedEventEmail(eventInfo);
  }
}

module.exports = SendCreatedEventEmail;
