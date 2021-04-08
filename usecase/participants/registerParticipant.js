const participantRepo = require('../../repositories/participants');
const userRepo = require('../../repositories/users');
const eventRepo = require('../../repositories/events');
const Participant = require('../../entities/Participant');

const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const createError = require('http-errors');

const handle = async (registrationDto) => {
  // Get event
  const foundEvent = await eventRepo.getById(registrationDto.eventId);

  if (foundEvent) {
    // Check registration time
    const currentTime = dayjs().format();
    if (currentTime < foundEvent.registerBefore) {
      const registered = await participantRepo.findParticipant(
        registrationDto.userId,
        registrationDto.eventId
      );

      if (registered !== null && registered.status !== 'cancelled') {
        throw createError(400, 'You have already registered!');
      }

      const count = await participantRepo.countParticipants(foundEvent.eventId);
      if (count < foundEvent.maxParticipants) {
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
        const registration = await participantRepo.insert(participant);
        const foundUser = await userRepo.get(registration.userId);
        return { ...registration, creator: { ...foundUser } };
      } else {
        throw createError(400, 'Event is full');
      }
    } else {
      throw createError(400, 'Registration time is over');
    }
  }
};

module.exports = { handle };
