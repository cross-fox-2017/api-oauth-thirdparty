var User = require('../models/users')

module.exports = {
  createUser: function (req, res, next) {
    var newUser = new User()
    newUser.local.username = req.body.username
    newUser.local.password = req.body.password

    newUser.save(function(err){
      if(err)throw err
    })
    res.send("Success!!")
  },
  signIn:function(req,res,next){
    res.send('berhasil')
  }
}
