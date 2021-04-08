const eventRepo = require('../../repositories/events');
const Event = require('../../entities/Event');

const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');
const dayjs = require('dayjs');

const handle = async (validatedEvent) => {
  const event = new Event();

  event
    .setId(uuidv4())
    .setTitle(validatedEvent.title)
    .setAddress(validatedEvent.address)
    .setStartTime(validatedEvent.startTime)
    .setEndTime(validatedEvent.endTime)
    .setRegisterBefore(validatedEvent.registerBefore)
    .setCancelBefore(validatedEvent.cancelBefore)
    .setMaxParticipants(validatedEvent.maxParticipants || null)
    .setMinParticipants(validatedEvent.minParticipants || 0)
    .setCreatedAt(dayjs().format())
    .setCreatedBy(validatedEvent.userId)
    .setModifiedAt(dayjs().format())
    .setModifiedBy(validatedEvent.userId)
    .setLatLong(validatedEvent.latLong || null)
    .setImgUrl(validatedEvent.imgUrl || null)
    .setDescription(validatedEvent.description || null);

  return await eventRepo.insert(event.toObject());
};

module.exports = { handle };
