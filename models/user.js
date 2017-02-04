var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  name:String,
  email:String,
  username:String,
  password:String,
  facebook:{
    id:String,
    token:String,
    name:String
  },
  twitter:{
    id:String,
    token:String,
    name:String
  },
  google:{
    id:String,
    token:String,
    name:String
  }
});

var User = mongoose.model('users',userSchema)

module.exports = User
