var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var db = mongoose.connection;

var Users = new Schema({
  username : {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

var users = mongoose.model('Users', Users);

module.exports = users
