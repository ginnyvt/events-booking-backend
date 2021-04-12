const mailgun = require('mailgun-js');
const createError = require('http-errors');

const DOMAIN = process.env.MAILGUN_DOMAIN;
// const MY_EMAIL_ADDRESS = process.env.MY_EMAIL_ADDRESS;
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

module.exports = { insert, sendCreatedEventEmail };
