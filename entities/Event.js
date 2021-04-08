const dayjs = require('dayjs');
const validator = require('validator');

class Event {
  setId(id) {
    this._id = id;
    return this;
  }

  setTitle(title) {
    if (!validator.isLength(title, { min: 3, max: 60 })) {
      throw new Error(
        'Title must have at least 3 and a maximum of 60 characters!'
      );
    }
    this._title = title;
    return this;
  }

  setAddress(address) {
    if (!validator.isLength(address, { min: 3, max: 60 })) {
      throw new Error(
        'Address must have at least 3 and a maximum of 60 characters!'
      );
    }
    this._address = address;
    return this;
  }

  setLatLong(latLong) {
    if (latLong !== null) {
      if (!validator.isLatLong(latLong)) {
        throw new Error('Invalid lattitude and longtitude!');
      }
    }
    this._latLong = latLong;
    return this;
  }

  setStartTime(startTime) {
    if (!validator.isISO8601(startTime)) {
      throw new Error('Invalid datetime format!');
    }
    if (startTime < dayjs().format()) {
      throw new Error('Starting time cannot be in the past!');
    }
    this._startTime = startTime;
    return this;
  }

  setEndTime(endTime) {
    if (
      !validator.isISO8601(endTime, { strict: true, strictSeparator: true })
    ) {
      throw new Error('Invalid datetime format!');
    }
    if (endTime < this._startTime) {
      throw new Error('Ending time cannot be before starting time!');
    }
    this._endTime = endTime;
    return this;
  }

  setRegisterBefore(datetime) {
    if (
      !validator.isISO8601(datetime, { strict: true, strictSeparator: true })
    ) {
      throw new Error('Invalid datetime format!');
    }
    if (datetime > this._startTime) {
      throw new Error('Registration time cannot be after the starting time!');
    }
    this._registerBefore = datetime;
    return this;
  }

  setCancelBefore(datetime) {
    if (
      !validator.isISO8601(datetime, { strict: true, strictSeparator: true })
    ) {
      throw new Error('Invalid datetime format!');
    }
    if (datetime > this._startTime) {
      throw new Error(' Cancellation time cannot be after the starting time!');
    }
    this._cancelBefore = datetime;
    return this;
  }

  setMinParticipants(participants) {
    if (participants < 0) {
      throw new Error('Participants cannot be 0!');
    }
    this._minParticipants = participants;
    return this;
  }

  setMaxParticipants(participants) {
    if (participants !== null && participants < this._minParticipants) {
      throw new Error('Max participants must be greater than min participants');
    }

    this._maxParticipants = participants;
    return this;
  }

  setDescription(desc) {
    if (desc !== null) {
      if (!validator.isLength(desc, { min: 0, max: 300 })) {
        throw new Error('Description must have a maximum of 300 characters!');
      }
    }
    this._description = desc;
    return this;
  }

  setImgUrl(imgUrl) {
    if (imgUrl !== null) {
      if (!validator.isURL(imgUrl)) {
        throw new Error('Invalid URL!');
      }
    }
    this._imgUrl = imgUrl;
    return this;
  }

  setCreatedAt(datetime) {
    if (
      !validator.isISO8601(datetime, { strict: true, strictSeparator: true })
    ) {
      throw new Error('Invalid datetime format!');
    }
    this._createdAt = datetime;
    return this;
  }

  setCreatedBy(userId) {
    this._createdBy = userId;
    return this;
  }

  setModifiedAt(datetime) {
    if (
      !validator.isISO8601(datetime, { strict: true, strictSeparator: true })
    ) {
      throw new Error('Invalid datetime format!');
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

  getEndTime() {
    return this._endTime;
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

  getImgUrl() {
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
      latLong: this._latLong,
      startTime: this._startTime,
      endTime: this._endTime,
      registerBefore: this._registerBefore,
      cancelBefore: this._cancelBefore,
      minParticipants: this._minParticipants,
      maxParticipants: this._maxParticipants,
      description: this._description,
      imgUrl: this._imgUrl,
      createdAt: this._createdAt,
      createdBy: this._createdBy,
      modifiedAt: this._modifiedAt,
      modifiedBy: this._modifiedBy,
    });
  }
}

module.exports = Event;
