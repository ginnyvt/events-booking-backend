const eventRepo = require('../../repositories/events');
const createError = require('http-errors');
const axios = require('axios').default;

const auth0Api = require('../../utils/auth0-apis');
const domain = process.env.DOMAIN;

const handle = async (eventId) => {
  const foundEvent = await eventRepo.getById(eventId);

  if (foundEvent) {
    const userId = foundEvent.createdBy;
    const { access_token } = await auth0Api.getTokenApi();

    const opts = {
      method: 'GET',
      url: `https://${domain}/api/v2/users/${userId}`,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${access_token}`,
      },
    };

    return axios
      .request(opts)
      .then((res) => {
        const { name, email } = res.data;
        return { ...foundEvent, creator: { name, email } };
      })
      .catch((err) => {
        throw createError(500, err.message);
      });
  } else {
    throw createError(404, 'No event with that id found!');
  }
};

module.exports = { handle };
