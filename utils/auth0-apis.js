const axios = require('axios').default;

// console.log(
//   process.env.DOMAIN,
//   process.env.MACHINE_CLIENT_ID,
//   process.env.MACHINE_CLIENT_SECRET
// );

const optAxios = {
  method: 'POST',
  url: `https://${process.env.DOMAIN}/oauth/token`,
  headers: { 'content-type': 'application/json' },
  data: JSON.stringify({
    grant_type: 'client_credentials',
    client_id: process.env.MACHINE_CLIENT_ID,
    client_secret: process.env.MACHINE_CLIENT_SECRET,
    audience: `https://${process.env.DOMAIN}/api/v2/`,
  }),
};

const getTokenApi = async () => {
  try {
    const response = await axios.request(optAxios);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getTokenApi };
