const mailgun = require('mailgun-js');
const createError = require('http-errors');
const eventRepo = require('../repositories/events');
const userRepo = require('../repositories/users');

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
  const data = {
    from: `noreply <wynny.me@gmail.com>`,
    to: subscriberList,
    subject: `${eventInfo.title}`,
    template: 'newly-event-created',
    'h:X-Mailgun-Variables': JSON.stringify({
      ...eventInfo,
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
    const data = {
      from: `noreply <wynny.me@gmail.com>`,
      to: email,
      subject: `Stay up to date with your event`,
      template: 'updated-event',
      'h:X-Mailgun-Variables': JSON.stringify({
        eventId: event._id,
        title: event.title,
      }),
    };

    try {
      const result = await mg.messages().send(data);
      console.log(result);
    } catch (err) {
      throw createError(500, err.message);
    }
  });
};
module.exports = { insert, sendCreatedEventEmail, sendUpdatedEventEmail };
