const eventRepo = require('../../repositories/events');
const Event = require('../../entities/Event');

const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');
const dayjs = require('dayjs');

const handle = async (validatedEvent) => {
  const {
    title,
    address,
    startTime,
    endTime,
    registerBefore,
    cancelBefore,
    maxParticipants,
    minParticipants,
    latLong,
    imgUrl,
    description,
    userId,
  } = validatedEvent;

  const event = new Event();

  if (latLong !== '') {
    event.setLatLong(latLong);
  }

  if (imgUrl !== '') {
    event.setImgUrl(imgUrl);
  }

  if (description !== '') {
    event.setDescription(description);
  }

  event
    .setId(uuidv4())
    .setTitle(title)
    .setAddress(address)
    .setStartTime(startTime)
    .setEndTime(endTime)
    .setRegisterBefore(registerBefore)
    .setCancelBefore(cancelBefore)
    .setMaxParticipants(maxParticipants)
    .setMinParticipants(minParticipants)
    .setCreatedAt(dayjs().format())
    .setCreatedBy(userId)
    .setModifiedAt(dayjs().format())
    .setModifiedBy(userId);

  return await eventRepo.insert(event.toObject());
};

module.exports = { handle };
