const addSubscriberUc = require('../../usecase/subscribers/addSubscriber');
const createError = require('http-errors');

const invoke = async (req) => {
  if (!req.body.email) {
    throw createError(400, 'Email address is required!');
  }
  return await addSubscriberUc.handle(req.body.email);
};

module.exports = { invoke };
