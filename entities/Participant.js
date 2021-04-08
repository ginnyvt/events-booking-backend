// const dayjs = require('dayjs');
const validator = require('validator');
const createError = require('http-errors');

class Participant {
  setId(id) {
    this._id = id;
    return this;
  }

  setEventId(eventId) {
    if (eventId && validator.isUUID(eventId, 4)) {
      this._eventId = eventId;
      return this;
    } else {
      throw createError(500, 'Invalid EventId');
    }
  }

  setUserId(userId) {
    if (userId) {
      const [type, id] = userId.split('|');
      if (type !== 'auth0') {
        throw createError(500, 'UserId type is not valid');
      }
      this._userId = userId;
      return this;
    } else {
      throw createError(500, 'UserId is required');
    }
  }

  setStatus(status) {
    this._status = status;
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

  getEventId() {
    return this._eventId;
  }

  getUserId() {
    return this._userId;
  }

  getStatus() {
    return this._status;
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
      eventId: this._eventId,
      userId: this._userId,
      status: this._status,
      createdAt: this._createdAt,
      createdBy: this._createdBy,
      modifiedAt: this._modifiedAt,
      modifiedBy: this._modifiedBy,
    });
  }
}

module.exports = Participant;
