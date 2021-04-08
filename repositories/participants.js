const mongoConnect = require('../database/mongodb');
const createError = require('http-errors');
const dayjs = require('dayjs');

const insert = async (regParticipantDto) => {
  const insertingParticipantObj = { ...regParticipantDto };
  delete insertingParticipantObj.id;
  const db = await mongoConnect.connectdb();

  try {
    await db.collection('participants').insertOne({
      _id: regParticipantDto.id,
      ...insertingParticipantObj,
    });
    return regParticipantDto;
  } catch (err) {
    throw createError(500, err.message);
  }
};

const countParticipants = async () => {
  const db = await mongoConnect.connectdb();
  try {
    return await db.collection('participants').countDocuments();
  } catch (err) {
    throw createError(500, err.message);
  }
};

const findParticipant = async (userId) => {
  const db = await mongoConnect.connectdb();
  try {
    const result = await db
      .collection('participants')
      .findOne({ userId: userId });
    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

module.exports = { insert, countParticipants, findParticipant };
