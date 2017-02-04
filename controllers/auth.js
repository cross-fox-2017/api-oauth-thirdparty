const Users = require('../models/users');
const passwordHash = require('password-hash');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');


module.exports = {
  signin: (req, res) => {
    if (!req.body.email) {
      res.status(400).send('email required');
      return;
    }
    if (!req.body.password) {
      res.status(400).send('password required');
      return;
    }

    Users.findOne({
      email: req.body.email
    }).then(function(user) {
      if (!passwordHash.verify(req.body.password, user.password)) {
        res.send("Invalid Password")
      } else {
        let myToken = jwt.sign({
          id: user.id,
          email: user.email,
          username: user.username
        }, 'secret', {
          expiresIn: '24h'
        });
        console.log(user.email, user.id, user.username);
        res.json(myToken);
      }
    });
  }
}
