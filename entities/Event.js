const dayjs = require('dayjs');

const validateDatetime = (datetime) => {
  const datetimeRegex = /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(?:.\d{7})?[+|-](0[0-9]|1[0-2]):(00|15|30|45)/;
  return datetimeRegex.test(datetime);
};

class Event {
  setId(id) {
    this._id = id;
    return this;
  }

  setTitle(title) {
    if (title.length < 3 || title.length > 60) {
      throw new Error(
        'Title must have at least 3 characters and a maximum of 60 characters'
      );
    }
    this._title = title;
    return this;
  }

  // Validate address:
  setAddress(address) {
    if (address.length < 3 || address.length > 60) {
      throw new Error(
        'Address must have at least 3 characters and a maximum of 60 characters'
      );
    }
    this._address = address;
    return this;
  }

  // validate regular expression
  setLngLat(lngLat) {
    const lngLatRegex = /\-?[0-9]+[\.]{0,1}[0-9]*/;
    if (!lngLatRegex.test(lngLat)) {
      throw new Error('Invalid longtitude and lattitude!');
    }
    this._lngLat = lngLat;
    return this;
  }

  setStartTime(startTime) {
    if (!validateDatetime(startTime)) {
      throw new Error('Invalid datetime format');
    }
    if (startTime < dayjs().format()) {
      throw new Error('Starting time cannot be in the past');
    }
    this._startTime = startTime;
    return this;
  }

  setEndTime(endTime) {
    if (!validateDatetime(endTime)) {
      throw new Error('Invalid datetime format');
    }
    if (endTime < this._startTime) {
      throw new Error('Ending time cannot be before starting time');
    }
    this._endTime = endTime;
    return this;
  }

  setRegisterBefore(datetime) {
    if (!validateDatetime(datetime)) {
      throw new Error('Invalid datetime format');
    }
    if (datetime > this._startTime) {
      throw new Error('Registration time cannot be after the starting time');
    }
    this._registerBefore = datetime;
    return this;
  }

  setCancelBefore(datetime) {
    if (!validateDatetime(datetime)) {
      throw new Error('Invalid datetime format');
    }
    if (datetime > this._startTime) {
      throw new Error(' Cancellation time cannot be after the starting time');
    }
    this._cancelBefore = datetime;
    return this;
  }

  setMinParticipants(participants) {
    if (participants < 2) {
      throw new Error('Participants must have at least two');
    }
    this._minParticipants = participants;
    return this;
  }

  setMaxParticipants(participants) {
    if (participants < this._minParticipants) {
      throw new Error('Max participants must be greater than min participants');
    }
    this._maxParticipants = participants;
    return this;
  }

  setDescription(desc) {
    if (desc.length < 3 || desc.length > 300) {
      throw new Error(
        'Title must have at least 3 characters and a maximum of 300 characters'
      );
    }
    this._description = desc;
    return this;
  }

  setImgUrl(imgUrl) {
    this._imgUrl = imgUrl;
    return this;
  }

  setCreatedAt(datetime) {
    if (!validateDatetime(datetime)) {
      throw new Error('Invalid datetime format');
    }
    this._createdAt = datetime;
    return this;
  }

  setCreatedBy(userId) {
    this._createdBy = userId;
    return this;
  }

  setModifiedAt(datetime) {
    if (!validateDatetime(datetime)) {
      throw new Error('Invalid datetime format');
    }
    this._modifiedAt = datetime;
    return this;
  }

  setModifiedBy(userId) {
    this._modifiedBy = userId;
    return this;
  }

  getId() {
    return this._id;
  }

  getTitle() {
    return this._title;
  }

  getLngLat() {
    return this._lngLat;
  }

  getAddress() {
    return this._address;
  }

  getStartTime() {
    return this._startTime;
  }

  getDuration() {
    return this._duration;
  }

  getRegisterBefore() {
    return this._registerBefore;
  }

  getCancelBefore() {
    return this._cancelBefore;
  }

  getMinParticipants() {
    return this._minParticipants;
  }

  getMaxParticipants() {
    return this._maxParticipants;
  }

  getDescription() {
    return this._description;
  }
  getImageUrl() {
    return this._imgUrl;
  }

  getCreatedAt() {
    return this._createdAt;
  }

  getCreatedBy() {
    return this._createdBy;
  }

  getModifiedAt() {
    return this._modifiedAt;
  }

  geModifiedBy() {
    return this._modifiedBy;
  }

  toObject() {
    return Object.freeze({
      id: this._id,
      title: this._title,
      address: this._address,
      lngLat: this._lngLat || null,
      startTime: this._startTime,
      endTime: this._endTime,
      registerBefore: this._registerBefore,
      cancelBefore: this._cancelBefore,
      minParticipants: this._minParticipants,
      maxParticipants: this._maxParticipants,
      description: this._description || null,
      imgUrl: this._imgUrl || null,
      createdAt: this._createdAt,
      createdBy: this._createdBy,
      modifiedAt: this._modifiedAt,
      modifiedBy: this._modifiedBy,
    });
  }
}

module.exports = Event;
