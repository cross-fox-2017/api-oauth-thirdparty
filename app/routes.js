module.exports = function(app, passport) {

    app.get('/', function(req, res, next) {
        res.render('index.ejs', {
            title: "Testing"
        })
    })

    app.get('/login', function(req, res, next) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        })
    })

    app.get('/signup', function(req, res, next) {
        res.render('signup.ejs', {
          message: req.flash('signupMessage')
        })
    })

    app.get('/profile',isLoggedIn, function(req, res, next) {
      res.sender('profile.ejs',{
        user: req.user
      })
    })

    app.get('logout',function(req, res, next) {
      req.logout();
      res.redirect('/')
    })

    function isLoggedIn(req, res, next){
      if(req.isAuthenticated())
      return next()

      res.redirect('/')
    }


}
