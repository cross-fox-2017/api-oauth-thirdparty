const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  facebook: {
    id: String,
    token: String,
    name: String
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

const User = mongoose.model('Users', userSchema);
module.exports = User;
