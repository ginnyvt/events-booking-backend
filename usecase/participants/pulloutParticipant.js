const participantRepo = require('../../repositories/participants');
const userRepo = require('../../repositories/users');
const eventRepo = require('../../repositories/events');
// const Participant = require('../../entities/Participant');

const dayjs = require('dayjs');
const createError = require('http-errors');

const handle = async (pulloutDto) => {
  // Get event

  const foundEvent = await eventRepo.getById(pulloutDto.eventId);
  if (foundEvent) {
    // Check cancellation time
    const currentTime = dayjs().format();
    if (currentTime < foundEvent.cancelBefore) {
      // Find participant where registered or not
      const registered = await participantRepo.findParticipant(
        pulloutDto.userId,
        pulloutDto.eventId
      );

      // Check if is registered or not
      if (registered === null) {
        throw createError(400, 'You have not yet registered to the event!');
      }

      // Is registered but cancelled === not registered
      if (registered !== null && registered.status === 'cancelled') {
        throw createError(400, 'You have not yet registered to event!');
      }

      //Check permission. Only allows admin and participant to update
      const adminListArr = process.env.ADMINLIST.split(',');
      if (
        adminListArr.includes(pulloutDto.userId) ||
        registered.createdBy === pulloutDto.userId
      ) {
        const updateRegistration = {
          ...registered,
          status: 'cancelled',
          modifiedAt: dayjs().format(),
          modifiedBy: pulloutDto.userId,
        };
        const pullout = await participantRepo.update(updateRegistration);
        const foundUser = await userRepo.get(pullout.userId);
        return { ...pullout, modifier: { ...foundUser } };
      }
    } else {
      throw createError(400, 'Cancellation time is over');
    }
  }
};

module.exports = { handle };
