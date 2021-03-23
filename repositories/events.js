const mongoConnect = require('../database/mongodb');

const insert = async (event) => {
  const db = await mongoConnect.connectdb();
  console.log(db);
};

module.exports = { insert };
