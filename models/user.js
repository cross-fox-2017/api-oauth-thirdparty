var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  username: {
    type:String,
    required:true
  },
  password: {
    type:String,
    required:true
  }

});

var User = mongoose.model('users',userSchema)

module.exports = User
