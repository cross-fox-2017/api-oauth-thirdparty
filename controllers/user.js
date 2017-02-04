const User = require('../models/user')
const Jwt = require('jsonwebtoken')
const Hash = require('password-hash')

module.exports = {
  signupUser: function (req, res) {
    User.create({
      username: req.body.username,
      password: Hash.generate(req.body.password),
      email: req.body.email,
      createdAt: new Date(),
      updatedAt: new Date()

    }).then(function (user) {
      if (user)
        res.send({user})
      else
        res.send({message: `Something Wrong`})
    })
  },

  signinUser: function (req, res) {
    User.find({
      where: { username: req.body.username }
    })
      .then(function (data) {
        // create token
        const token = Jwt.sign({
          username: data.username,
          email: data.email
        }, `${process.env.SECRET}`)
        return token
      }).then(function (token) {
      res.send({ token: token  })
    }).catch(function (err) {
      res.send({message: err})
    })
  }

}
