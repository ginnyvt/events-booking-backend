const validator = require('validator');
const bcrypt = require('bcryptjs');

class User {
	setId(id) {
		this._id = id;
		return this;
	}

	setUserName(username) {
		const validUser =
			validator.isAlphanumeric(username) &&
			validator.isLength(username, { min: 3, max: 10 });
		if (!validUser) {
			throw new Error(
				`username's length MUST contain at least 3 and a maximum of 10 alphanumeric characters`
			);
		}
		this._username = username;
		return this;
	}

	setEmail(email) {
		if (!validator.isEmail(email)) {
			throw new Error('Invalid Email');
		}
		this._email = email;
		return this;
	}

	async setPassword(password) {
		const validPassword = validator.isStrongPassword(password, {
			minLength: 6,
			maxLength: 12,
			minLowercase: 0,
			minUppercase: 0,
			minNumbers: 1,
			minSymbols: 0,
			returnScore: false,
		});

		if (!validPassword) {
			throw new Error(
				`password MUST contain at least one letter, at least one number, and password's length MUST be longer than 6 and maximum of 12 characters`
			);
		}
		//Hash password
		this._password = await bcrypt.hash(password, 12);
		return this;
	}

	getId() {
		return this._id;
	}

	getUserName() {
		return this._username;
	}

	getEmail() {
		return this._email;
	}

	getPassword() {
		return this._password;
	}

	toObject() {
		return Object.freeze({
			id: this._id,
			username: this._username,
			email: this._email,
			// password: this._password,
		});
	}
}

module.exports = User;
