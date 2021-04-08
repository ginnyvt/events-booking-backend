const participantRepo = require('../../repositories/participants');
const userRepo = require('../../repositories/users');
const eventRepo = require('../../repositories/events');
const Participant = require('../../entities/Participant');

const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const createError = require('http-errors');

const handle = async (regParticipantDto) => {
  // Get event
  const foundEvent = await eventRepo.getById(regParticipantDto.eventId);

  if (foundEvent) {
    // Check registration time
    const currentTime = dayjs().format();
    if (currentTime < foundEvent.registerBefore) {
      const registered = await participantRepo.findParticipant(
        regParticipantDto.userId
      );

      if (registered !== null) {
        throw createError(400, 'You have already registered!');
      }

      const count = await participantRepo.countParticipants();
      if (count < foundEvent.maxParticipants) {
        const participant = new Participant()
          .setId(uuidv4())
          .setUserId(regParticipantDto.userId)
          .setEventId(regParticipantDto.eventId)
          .setStatus('joined')
          .setCreatedAt(dayjs().format())
          .setCreatedBy(regParticipantDto.userId)
          .setModifiedAt(dayjs().format())
          .setModifiedBy(regParticipantDto.userId)
          .toObject();
        const registration = await participantRepo.insert(participant);
        const participantInfo = await userRepo.get(registration.userId);

        return { ...registration, participantInfo: { ...participantInfo } };
      } else {
        throw createError(400, 'Event is full');
      }
    } else {
      throw createError(400, 'Registration time is over');
    }
  }
};

module.exports = { handle };
