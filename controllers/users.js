const Users = require('../models/users');
const passwordHash = require('password-hash');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const token = require('../token');

module.exports = {
  signup: (req, res) => {
    let newUser = Users({
      username: req.body.username,
      password: passwordHash.generate(req.body.password),
      email: req.body.email
    });

    // save the User
    newUser.save((err, user) => {
      if (err) throw err;
      res.send(`Added new User!\n${user}`);
    });
  },
  getUsers: (req,res) => {
    Users.find({}, (err, users) => {
      if (err) throw err;

      // object of all the users
      res.send(users);
    });
  },
  delete: (req,res) => {
    // get the user
    Users.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) {
        // error handling
        res.send(`ID: ${req.params.id} not found!`)
      } else {
        // we have deleted the user
        let response = {
            message: "User successfully deleted",
            id: req.params.id
        };
        res.send(response);
      }
    });
  },
  verify: (req,res,next) => {
    let decoded = jwt.verify(req.header('auth'), 'secret');
    if(decoded) {
      next()
    } else {
      res.send("You don't have access!")
    }
  }
};
