const auth0Api = require('../utils/auth0-apis');
const createError = require('http-errors');
const axios = require('axios').default;
const domain = process.env.DOMAIN;

const get = async (userId) => {
  const { access_token } = await auth0Api.getTokenApi();
  const opts = {
    method: 'GET',
    url: `https://${domain}/api/v2/users/${userId}`,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const { data } = await axios.request(opts);
    return { name: data.name, email: data.email };
  } catch (err) {
    throw createError(500, err.message);
  }
};

module.exports = { get };
