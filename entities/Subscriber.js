const validator = require('validator');
const createError = require('http-errors');

class Subscriber {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  removeObserver(observer) {
    const index = this._observers.indexOf(observer);
    this._observers.splice(index, index);
  }

  notify() {
    this._observers.forEach((observer) => observer.receive(this));
  }

  setAddress(address) {
    if (!validator.isEmail(address)) {
      throw createError(400, 'Invalid email format!');
    }
    this._address = address;
    return this;
  }

  setSubscribed(subscribed) {
    this._subscribed = subscribed;
    return this;
  }

  getAddress() {
    return this._address;
  }

  getSubscribed() {
    return this._subscribed;
  }

  toObject() {
    return Object.freeze({
      address: this._address,
      subscribed: this._subscribed,
    });
  }
}

module.exports = Subscriber;
