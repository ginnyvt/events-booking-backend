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

  setAddress(address) {
    this._address = address;
    return this;
  }

  setLngLat(lngLat) {
    this._lngLat = lngLat;
    return this;
  }

  setStartTime(startTime) {
    if (startTime < Date.now().toString()) {
      throw new Error('Starting time cannot be in the past');
    }
    this._startTime = startTime;
    return this;
  }

  setDuration(hours) {
    if (hours <= 0) {
      throw new Error('Duration must be greater than 0');
    }
    this._duration = hours;
    return this;
  }

  setRegisterBefore(time) {
    if (time > this._startTime) {
      throw new Error('Registration time cannot be after the starting time');
    }
    this._registerBefore = time;
    return this;
  }

  setCancelBefore(time) {
    if (time > this._startTime) {
      throw new Error(' Cancellation time cannot be after the starting');
    }
    this._cancelBefore = time;
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

  setImageUrl(imgUrl) {
    this._imgUrl = imgUrl;
    return this;
  }

  setCreatedAt(datetime) {
    this._createdAt = datetime;
    return this;
  }

  setCreatedBy(userId) {
    this._createdBy = userId;
    return this;
  }

  setModifiedAt(datetime) {
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
      duration: this._duration,
      registerBefore: this._registerBefore,
      cancelBefore: this._cancelBefore,
      minParticipants: this._minParticipants,
      maxParticipants: this._maxParticipants,
      imgUrl: this._imgUrl || null,
      createdAt: this._createdAt,
      createdBy: this._createdBy,
      modifiedAt: this._modifiedAt,
      modifiedBy: this._modifiedBy,
    });
  }
}

module.exports = Event;
