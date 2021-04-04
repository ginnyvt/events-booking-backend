const axios = require('axios').default;

const domain = process.env.DOMAIN;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const getTokenOpts = {
  method: 'POST',
  url: `https://${domain}/oauth/token`,
  headers: { 'content-type': 'application/json' },
  data: JSON.stringify({
    grant_type: 'client_credentials',
    client_id: client_id,
    client_secret: client_secret,
    audience: `https://${domain}/api/v2/`,
  }),
};

const getTokenApi = async () => {
  try {
    const response = await axios.request(getTokenOpts);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getTokenApi };
