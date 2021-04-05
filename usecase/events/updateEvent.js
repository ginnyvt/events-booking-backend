const eventRepo = require('../../repositories/events');
const createError = require('http-errors');
const dayjs = require('dayjs');
const getUserUc = require('../../usecase/users/getUser');

const Event = require('../../entities/Event');

const handle = async (eventDto, currentUser) => {
  // Find the event to update
  const foundEvent = await eventRepo.getById(eventDto.id);

  if (foundEvent) {
    //Check permission. Only allows admin and event's owner to update
    const adminListArr = process.env.ADMINLIST.split(',');
    if (
      adminListArr.includes(currentUser) ||
      foundEvent.createdBy === currentUser
    ) {
      const updatedEventObj = new Event();
      updatedEventObj
        .setId(foundEvent._id)
        .setTitle(eventDto.title || foundEvent.title)
        .setAddress(eventDto.address || foundEvent.address)
        .setStartTime(eventDto.startTime || foundEvent.startTime)
        .setEndTime(eventDto.endTime || foundEvent.endTime)
        .setRegisterBefore(eventDto.registerBefore || foundEvent.registerBefore)
        .setCancelBefore(eventDto.cancelBefore || foundEvent.cancelBefore)
        .setMaxParticipants(
          eventDto.maxParticipants || foundEvent.maxParticipants
        )
        .setMinParticipants(
          eventDto.minParticipants || foundEvent.minParticipants
        )
        .setCreatedAt(foundEvent.createdAt)
        .setCreatedBy(foundEvent.createdBy)
        .setModifiedAt(dayjs().format())
        .setModifiedBy(currentUser)
        .setLatLong(eventDto.latLong || foundEvent.latLong)
        .setImgUrl(eventDto.imgUrl || foundEvent.imgUrl)
        .setDescription(eventDto.description || foundEvent.description);

      const result = await eventRepo.update(updatedEventObj.toObject());
      if (result !== {}) {
        const userId = result.modifiedBy;
        const foundUser = await getUserUc.handle(userId);
        return { ...result, modifier: { ...foundUser } };
      } else {
        throw createError(500, 'Event unsuccessfully updated');
      }
    } else {
      throw createError(
        400,
        'Your account is not allowed to update the following event'
      );
    }
  } else {
    throw createError(404, `No event with that id found!`);
  }
};

module.exports = { handle };
