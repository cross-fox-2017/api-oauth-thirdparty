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
  }
});

var users = mongoose.model('Users', Users);

module.exports = users
