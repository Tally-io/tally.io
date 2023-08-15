const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  // only run if the password was modified
  // this allows for a username change / password change to be separate
  if (!this.isModified('password')) {
    next();
  }
  // generate salt for encryption
  const salt = await bcrypt.genSalt(10);
  // encrypt password
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('users', userSchema);

module.exports = { User };
