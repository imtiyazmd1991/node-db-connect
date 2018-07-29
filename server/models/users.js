const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var { ObjectID } = require('mongodb');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		min: 1,
		trim: true,
		unique: true,
		validate: {
			validator: (email) => {
				return validator.isEmail(email);
			},
			message: '{VALUE} is not a valid email'
		}
	},

	password: {
		type: String,
		required: true,
		min: 6,
		trim: true
	},

	tokens: [
		{
			access: {
				type: String,
				required: true
			},
			token: {
				type: String,
				required: true
			}
		}]
});

userSchema.methods.toJSON = function () {
	var user = this;
	var body = _.pick(this, ['_id', 'email']);
	return body
};

userSchema.methods.generateAuthToken = function () {
	var users = this;
	var access = 'auth';
	var token = jwt.sign({ _id: users._id.toHexString(), access }, process.env.secretKey).toString();
	users.tokens.push({ access, token });
	return users.save().then((users) => {
		return token;
	}).catch((err) => {
		return err;
	})
};

userSchema.methods.deleteByToken = function (token) {
	var user = this;
	return user.update({
		$pull: {
			tokens: {
				token
			}
		}
	})
};

userSchema.statics.findByToken = function (token) {
	var user = this;
	var decoded;
	try {
		decoded = jwt.verify(token, process.env.secretKey);
	} catch (e) {
		return Promise.reject();
	}
	return user.findOne({
		'_id': decoded._id,
		'tokens.token': token
	}).then((users) => {
		if (users) {
			return users;
		} else {
			return Promise.reject();
		}
	})
};


userSchema.statics.findByPassword = function (email, password) {
	var user = this;
	return user.findOne({ email }).then((user) => {
		if (!user) {
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					return resolve(user);
				}
				return reject();
			})
		})
	})
};

userSchema.pre('save', function (next) {
	var user = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

var users = mongoose.model('User', userSchema);

module.exports = { users };
