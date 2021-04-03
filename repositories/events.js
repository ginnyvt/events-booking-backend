const mongoConnect = require('../database/mongodb');
const createError = require('http-errors');

const insert = async (event) => {
  const insertingEventObj = { ...event };
  delete insertingEventObj.id;
  const db = await mongoConnect.connectdb();

  try {
    await db.collection('events').insertOne({
      _id: event.id,
      ...insertingEventObj,
    });
    return event;
  } catch (err) {
    throw createError(500, err.message);
  }
};

module.exports = { insert };
