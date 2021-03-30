const validator = require('validator');
const bcrypt = require('bcryptjs');

class User {
	setId(id) {
		this._id = id;
		return this;
	}

	setFirstName(firstname) {
		this._firstName = firstname.toLowerCase();
		return this;
	}

	setLastName(lastname) {
		this._lastName = lastname.toLowerCase();
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

	getFirstName() {
		return this._firstName;
	}

	getLastName() {
		return this._lastName;
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
			firstName: this._firstName,
			lastName: this._lastName,
			email: this._email,
			password: this._password,
		});
	}
}

module.exports = User;
