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
      .findOne({ $and: [{ eventId: eventId }, { userId: userId }] });
    return result;
  } catch (err) {
    throw createError(500, err.message);
  }
};

const update = async (updateRegistration) => {
  const insertingObj = { _id: updateRegistration.id, ...updateRegistration };
  delete insertingObj.id;

  const db = await mongoConnect.connectdb();
  try {
    await db.collection('participants').updateOne(
      { _id: insertingObj._id },
      {
        $set: { ...insertingObj },
      }
    );
    return insertingObj;
  } catch (err) {
    throw createError(500, err.message);
  }
};

// const remove = async (updateRegistrationId) => {
//   const db = await mongoConnect.connectdb();
//   try {
//     await db
//       .collection('participants')
//       .deleteOne({ _id: updateRegistrationId });
//   } catch (err) {
//     throw createError(500, err.message);
//   }
// };

module.exports = { insert, countParticipants, findParticipant, update };
