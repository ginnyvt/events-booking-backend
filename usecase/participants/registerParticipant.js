const participantRepo = require('../../repositories/participants');
// const userRepo = require('../../repositories/users');
const eventRepo = require('../../repositories/events');
const Participant = require('../../entities/Participant');

const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const createError = require('http-errors');

const handle = async (registrationDto) => {
  // Check if even exist
  const foundEvent = await eventRepo.getById(registrationDto.eventId);
  console.log(foundEvent);
  if (!foundEvent) {
    throw createError(404, 'No event found!');
  }

  // Check registration time
  const currentTime = dayjs().format();
  if (currentTime > foundEvent.registerBefore) {
    throw createError(400, 'Registration time is over');
  }

  // Check max participants
  const count = await participantRepo.countParticipants(foundEvent._id);
  if (count >= +foundEvent.maxParticipants) {
    throw createError(400, 'The event is full!');
  }

  // Check whether participant is registered
  const registration = await participantRepo.findParticipant(
    registrationDto.userId,
    registrationDto.eventId
  );
  registration.forEach((r) => {
    if (r.status === 'joined') {
      throw createError(400, 'You have already registered!');
    }
  });

  // All good
  const participant = new Participant()
    .setId(uuidv4())
    .setUserId(registrationDto.userId)
    .setEventId(registrationDto.eventId)
    .setStatus('joined')
    .setCreatedAt(dayjs().format())
    .setCreatedBy(registrationDto.userId)
    .setModifiedAt(dayjs().format())
    .setModifiedBy(registrationDto.userId)
    .toObject();

  return await participantRepo.insert(participant);
};

module.exports = { handle };
