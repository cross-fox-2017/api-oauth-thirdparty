const Users = require('../models/users');
var passwordHash = require('password-hash');

module.exports = {
  signup: function(req, res) {
    let newUser = Users({
      username: req.body.username,
      password: passwordHash.generate(req.body.password),
      email: req.body.email
    });

    // save the User
    newUser.save(function(err, user) {
      if (err) throw err;
      res.send(`Added new User!\n${user}`);
    });
  },
};
