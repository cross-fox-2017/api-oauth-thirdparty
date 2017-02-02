var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var db = mongoose.connection;

var Users = new Schema({
  username : {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    displayName: String
  },
  twitter: {
    id: String,
    token: String,
    username: String,
    displayName: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    displayName: String
  }
});

var users = mongoose.model('Users', Users);

module.exports = users
