const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    require: [true, 'PUT passwordConfirm pepeg'],
    validate: {
      // works ONLY on .create() and .save()
      validator: function(el) {
        return el === this.password;
      }
    },
    select: false
  },
  passwordChangedAt: {
    type: Date
    // require: true
  }
});
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);

  // **********************************INTERESTING that we dont persist the confiredpassword in db
  // and required = true in our model means only tht this is a required field
  this.passwordConfirm = undefined;
  next();
});
// AN INSTANCE METHOD
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changesPasswordAfter = function(JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimeStamp);

    return JWTTimeStamp < changedTimestamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
