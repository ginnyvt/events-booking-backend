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

const getById = async (eventId) => {
  const db = await mongoConnect.connectdb();
  try {
    const result = await db.collection('events').findOne({ _id: eventId });
    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

const update = async (event) => {
  const insertingEventObj = { _id: event.id, ...event };

  delete insertingEventObj.id;
  const db = await mongoConnect.connectdb();
  try {
    await db.collection('events').updateOne(
      { _id: insertingEventObj.id },
      {
        $set: { ...insertingEventObj },
      }
    );
    return insertingEventObj;
  } catch (err) {
    throw createError(500, err.message);
  }
};

const remove = async (eventId) => {
  const db = await mongoConnect.connectdb();
  try {
    await db.collection('events').deleteOne({ _id: eventId });
  } catch (err) {
    throw createError(500, err.message);
  }
};

module.exports = { insert, getById, update, remove };
