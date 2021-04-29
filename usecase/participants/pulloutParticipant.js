const participantRepo = require('../../repositories/participants');
// const userRepo = require('../../repositories/users');
const eventRepo = require('../../repositories/events');

const dayjs = require('dayjs');
const createError = require('http-errors');

const handle = async (pulloutDto) => {
  // Check if event exists
  const foundEvent = await eventRepo.getById(pulloutDto.eventId);
  if (!foundEvent) {
    throw createError(404, 'No event found!');
  }

  // Check cancel time
  const currentTime = dayjs().format();
  if (currentTime > foundEvent.cancelBefore) {
    throw createError(400, 'Cancellation time is over');
  }

  //Check if participant joined event
  const registration = await participantRepo.findParticipant(
    pulloutDto.userId,
    pulloutDto.eventId
  );
  const joined = registration.filter((r) => {
    return r.status === 'joined';
  });

  // console.log(joined);
  if (joined.length === 0) {
    throw createError(400, `You don't join this event!`);
  }

  // All good
  const updateRegistration = {
    ...joined[0],
    status: 'cancelled',
    modifiedAt: dayjs().format(),
    modifiedBy: pulloutDto.userId,
  };
  const pullout = await participantRepo.update(updateRegistration);
  // const foundUser = await userRepo.get(pullout.userId);
  // return { ...pullout, modifier: { ...foundUser } };
  return pullout;
};

module.exports = { handle };
