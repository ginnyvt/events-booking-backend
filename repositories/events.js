const mongoConnect = require('../database/mongodb');
const createError = require('http-errors');
const dayjs = require('dayjs');

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
      { _id: insertingEventObj._id },
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

const listUpcomingEvents = async () => {
  const db = await mongoConnect.connectdb();
  try {
    const currentDateTime = dayjs().format();
    return await db
      .collection('events')
      .find({ startTime: { $gt: currentDateTime } })
      .sort({ startTime: 1 })
      .toArray();
  } catch (err) {
    throw createError(500, err.message);
  }
};

const listPastEvents = async () => {
  const db = await mongoConnect.connectdb();
  try {
    const currentDateTime = dayjs().format();
    return await db
      .collection('events')
      .find({ startTime: { $lte: currentDateTime } })
      .sort({ startTime: 1 })
      .toArray();
  } catch (err) {
    throw createError(500, err.message);
  }
};

listMyEvents = async (currentUser) => {
  const db = await mongoConnect.connectdb();
  try {
    return await db
      .collection('events')
      .find({ createdBy: currentUser })
      .sort({ startTime: 1 })
      .toArray();
  } catch (err) {
    throw createError(500, err.message);
  }
};

module.exports = {
  insert,
  getById,
  update,
  remove,
  listUpcomingEvents,
  listPastEvents,
  listMyEvents,
};
