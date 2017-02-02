"use strict"

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  username  : { type:String, required: true, unique: true},
  email     : { type:String, required: true, unique: true},
  password  : { type:String, required: true},
  isAdmin   : { type:Boolean, required: true},
  createdAt : Date,
  updatedAt : Date
})

var Users = mongoose.model('Users', usersSchema)

module.exports = Users;
