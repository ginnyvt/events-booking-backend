const mongoConnect = require('../database/mongodb');
const createError = require('http-errors');

const insert = async (event) => {
  const db = await mongoConnect.connectdb();
  const _id = event.id;

  const removeProp = 'id';
  const { [removeProp]: remove, ...rest } = event;
  try {
    await db.collection('events').insertOne({
      _id: _id,
      rest,
    });
    return event;
  } catch (err) {
    throw createError(500, err.message);
  }
};

module.exports = { insert };
