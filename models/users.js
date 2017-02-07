`use strict`
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  email: String,
  token: String,
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  github: {
    id: String,
    token: String,
    displayName: String,
    username: String
  }
},
{
  timestamps: true
})

var User = mongoose.model('User', userSchema)

module.exports = User
