var mongoose = require('mongoose')
var Schema = mongoose.Schema

var usersSchema = new Schema({
  username: {
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
  },
  github: {
    id: String,
    token: String,
    email: String,
    displayName: String
  }
})

var Users = mongoose.model('Users', usersSchema)

module.exports = Users
