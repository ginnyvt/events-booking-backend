const mailgun = require('mailgun-js');
const createError = require('http-errors');
const dayjs = require('dayjs');

const eventRepo = require('../repositories/events');
const userRepo = require('../repositories/users');
const monthNames = require('../utils/monthNames');

const DOMAIN = process.env.MAILGUN_DOMAIN;
const MAILGUN_API = process.env.MAILGUN_API;

const mg = mailgun({ apiKey: MAILGUN_API, domain: DOMAIN });
const subscriberList = `subscribers@${DOMAIN}`;

const insert = async (subscriber) => {
  try {
    const data = await mg.lists(subscriberList).members().create(subscriber);
    return data;
  } catch (err) {
    throw createError(500, err.message);
  }
};

const sendCreatedEventEmail = async (eventInfo) => {
  let minute = dayjs(eventInfo.time).get('minute');
  if (minute === 0) {
    minute = '00';
  }
  const data = {
    from: `noreply <wynny.me@gmail.com>`,
    to: subscriberList,
    subject: `${eventInfo.title}`,
    template: 'newly-event-created',
    'h:X-Mailgun-Variables': JSON.stringify({
      eventId: eventInfo.eventId,
      title: eventInfo.title,
      location: eventInfo.location,
      month: monthNames[dayjs(eventInfo.time).get('month')],
      day: dayjs(eventInfo.time).get('date'),
      hour: dayjs(eventInfo.time).get('hour'),
      // minute: dayjs(eventInfo.time).get('minute'),
      minute: minute,
    }),
  };

  try {
    const result = await mg.messages().send(data);
    console.log(result);
  } catch (err) {
    throw createError(500, err.message);
  }
};

const sendUpdatedEventEmail = async (joinedParticipantsList, _id) => {
  const participantEmails = await Promise.all(
    joinedParticipantsList.map(async (participant) => {
      const participantInfo = await userRepo.get(participant.userId);
      return participantInfo.email;
    })
  );

  const event = await eventRepo.getById(_id);

  participantEmails.forEach(async (email) => {
    let data = {
      from: `noreply <wynny.me@gmail.com>`,
      to: email,
    };

    if (event.status === 'active') {
      data.subject = `Stay up to date with your event`;
      data.template = 'updated-event';
      data['h:X-Mailgun-Variables'] = JSON.stringify({
        eventId: event._id,
        title: event.title,
      });
    } else {
      let minute = dayjs(event.startTime).get('minute');
      if (minute === 0) {
        minute = '00';
      }
      data.subject = `Event is cancelled`;
      data.template = 'cancelled-event';
      data['h:X-Mailgun-Variables'] = JSON.stringify({
        eventId: event._id,
        title: event.title,
        location: event.address,
        month: monthNames[dayjs(event.startTime).get('month')],
        day: dayjs(event.startTime).get('date'),
        hour: dayjs(event.startTime).get('hour'),
        // minute: dayjs(event.startTime).get('minute'),
        minute: minute,
      });
    }
    try {
      const result = await mg.messages().send(data);
      console.log(result);
    } catch (err) {
      throw createError(500, err.message);
    }
  });
};
module.exports = { insert, sendCreatedEventEmail, sendUpdatedEventEmail };
