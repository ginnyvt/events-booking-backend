const createEvent_uc = require('../../repositories/events');
const Event = require('../../entities/Event');

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
  } = validatedEvent;

  const event = new Event();

  return await createEvent_uc.insert(validatedEvent);
};

module.exports = { handle };
