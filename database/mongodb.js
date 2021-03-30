const MongoClient = require('mongodb').MongoClient;

const createHttpError = require('http-errors');

const CONNECTION_URL = process.env.MONGO_URL;

const connectdb = async () => {
  let database;
  try {
    const client = await MongoClient.connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    database = await client.db('events-booking');
    console.log('Connected to events-booking database');
  } catch (err) {
    throw createHttpError(500, err.message);
  }
  return database;
};

module.exports = { connectdb };
