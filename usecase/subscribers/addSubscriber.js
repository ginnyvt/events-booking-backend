const mailgunRepo = require('../../repositories/mailgun');
const Subscriber = require('../../entities/Subscriber');

const handle = async (email) => {
  const subscriber = new Subscriber().setAddress(email).setSubscribed(true);
  return mailgunRepo.insert(subscriber.toObject());
};

module.exports = { handle };
