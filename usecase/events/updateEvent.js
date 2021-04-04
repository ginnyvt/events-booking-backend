const eventRepo = require('../../repositories/events');
const createError = require('http-errors');
const dayjs = require('dayjs');
const axios = require('axios').default;

const auth0Api = require('../../utils/auth0-apis');
const domain = process.env.DOMAIN;

const Event = require('../../entities/Event');

const handle = async (validatedEvent) => {
  const foundEvent = await eventRepo.getById(validatedEvent.id);

  if (foundEvent) {
    const updatedEventObj = new Event();
    updatedEventObj
      .setId(foundEvent._id)
      .setTitle(validatedEvent.title || foundEvent.title)
      .setAddress(validatedEvent.address || foundEvent.address)
      .setStartTime(validatedEvent.startTime || foundEvent.startTime)
      .setEndTime(validatedEvent.endTime || foundEvent.endTime)
      .setRegisterBefore(
        validatedEvent.registerBefore || foundEvent.registerBefore
      )
      .setCancelBefore(validatedEvent.cancelBefore || foundEvent.cancelBefore)
      .setMaxParticipants(
        validatedEvent.maxParticipants || foundEvent.maxParticipants
      )
      .setMinParticipants(
        validatedEvent.minParticipants || foundEvent.minParticipants
      )
      .setCreatedAt(foundEvent.createdAt)
      .setCreatedBy(foundEvent.createdBy)
      .setModifiedAt(dayjs().format())
      .setModifiedBy(validatedEvent.userId)
      .setLatLong(validatedEvent.latLong || foundEvent.latLong)
      .setImgUrl(validatedEvent.imgUrl || foundEvent.imgUrl)
      .setDescription(validatedEvent.description || foundEvent.description);

    const result = await eventRepo.update(updatedEventObj.toObject());
    console.log(result);
    if (result !== {}) {
      const userId = result.modifiedBy;
      console.log(userId);
      const { access_token } = await auth0Api.getTokenApi();
      console.log(access_token);

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
          console.log(res.data);
          const { name, email } = res.data;
          return { ...result, modifier: { name, email } };
        })
        .catch((err) => {
          throw createError(500, err.message);
        });
    } else {
      throw createError(500, 'Event unsuccessfully updated');
    }
  } else {
    throw createError(404, `No event with that id found!`);
  }
};

module.exports = { handle };
