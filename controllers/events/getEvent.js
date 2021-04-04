const getEventUc = require('../../usecase/events/getEvent');
// const createError = require('http-errors');

const invoke = async (req) => {
  const eventId = req.params.eventId;
  // console.log(eventId);
  return await getEventUc.handle(eventId);
};
module.exports = { invoke };
