const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'PUT name pepeg']
  },
  email: {
    type: String,
    require: [true, 'PUT name pepeg'],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, 'put a valid email moron!']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    require: [true, 'PUT password pepeg'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    require: [true, 'PUT passwordConfirm pepeg']
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;