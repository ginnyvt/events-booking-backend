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

const countParticipants = async (eventId) => {
  const db = await mongoConnect.connectdb();
  try {
    return await db
      .collection('participants')
      .countDocuments({ $and: [{ eventId: eventId }, { status: 'joined' }] });
  } catch (err) {
    throw createError(500, err.message);
  }
};

const findParticipant = async (userId, eventId) => {
  const db = await mongoConnect.connectdb();
  try {
    const result = await db
      .collection('participants')
      .find({ $and: [{ eventId: eventId }, { userId: userId }] })
      .toArray();
    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

const update = async (updateRegistration) => {
  const id = updateRegistration._id;
  delete updateRegistration._id;

  const db = await mongoConnect.connectdb();
  try {
    await db.collection('participants').updateOne(
      { _id: id },
      {
        $set: { ...updateRegistration },
      }
    );
    return updateRegistration;
  } catch (err) {
    throw createError(500, err.message);
  }
};

const listParticipants = async (eventId) => {
  const db = await mongoConnect.connectdb();
  try {
    const result = await db
      .collection('participants')
      .find({ $and: [{ eventId: eventId }, { status: 'joined' }] })
      .toArray();
    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

module.exports = {
  insert,
  countParticipants,
  findParticipant,
  update,
  listParticipants,
};
