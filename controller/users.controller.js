let user      = require ('../models/users')
const hash     = require('password-hash');
// const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');

module.exports = {

    // Get all users
    getAllUser : function(req, res) {
      user.find({}, (err,data) => {
        res.send(data);
      })
    },

    // CREATE user
    createUser: function(req,res,next){
      var newUser = User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isadmin,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      newUser.save((err) =>{
        res.send('New user has been created');
    })},

    //SIGN UP
    signUp : function(req,res,next){
      user.create({username: req.body.username, password: hash.generate(req.body.password), role: req.body.role, createdAt: new Date(), updatedAt: new Date()})
      .then(function(data){
        res.send(data)
      })
    },

    //SIGN IN
    signIn : function(req,res,next) {
      user.findOne({ where: {username: req.body.username} }).then(function(login) {
        if (!login) {
          res.send('user not found!')
        }
        if(hash.verify(req.body.password,login.password)){
          var token = jwt.sign({ username: login.username, role: login.role }, 'May the force be with you', {expiresIn : 60*60});
          res.json({token: token})
        }
        else{
          res.send('invalid username or password')
        }
    })
  },

    verifyAdmin : function (req, res, next) {
      var decode = jwt.verify(req.header('token'), 'May the force be with you')
      if (decode && decode.role) {
        next()
      }
      else if (decode && decode.role == false) {
        res.send('BUKAN ADMIN WOY!')
      }
      else {
        res.send('WRONG')
      }
    },

    verifyUser : function (req, res, next) {
      var decode = jwt.verify(req.header('token'), 'May the force be with you')
      if (decode && decode.role) {
        next()
      }
      else if (decode && decode.role == false) {
        next()
      }
      else {
        res.send('WRONG PASS')
      }
    }

}
