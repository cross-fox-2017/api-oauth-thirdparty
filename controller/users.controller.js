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

    // SIGN UP
    signUp : function(req,res,next){
      user.create({
        username: req.body.username,
        email: req.body.email,
        password: hash.generate(req.body.password),
        isAdmin: req.body.isadmin
        // createdAt: new Date(),
        // updatedAt: new Date()
      })
      .then(function(data){
        res.send(data)
      })
    },

    //SIGN IN
    signIn : function(req,res,next) {
      user.findOne({username: req.body.username}).then(function(data) {
        if (data == null) {
          res.send('user not found')
        }
        var verify = hash.verify(req.body.password,data.password)
        // console.log(verify);
        if(verify ==true){
          var token = jwt.sign({ username: data.username, email: data.email }, 'May the force be with you', {expiresIn : 60*60});
          res.json({token: token})
        }
        else{
          res.send('invalid username or password')
        }
    })
  },

// ------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------
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
