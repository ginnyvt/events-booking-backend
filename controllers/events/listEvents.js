const listEventsUc = require('../../usecase/events/listEvents');
const createError = require('http-errors');

const invoke = async (req) => {
  const queryObj = req.query;
  if (!queryObj.hasOwnProperty('type')) {
    throw createError(400, 'Type of events is required');
  } else {
    const prop = 'type';
    const eventType = queryObj[prop];
    return await listEventsUc.handle(eventType);
  }
};

module.exports = { invoke };
