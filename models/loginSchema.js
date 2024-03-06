const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  labName: String,
  labAddress: String
});

const Login = mongoose.model('Login', userSchema);

module.exports = { Login };
