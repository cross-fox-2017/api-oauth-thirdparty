module.exports = function(app, passport) {

    //<========================================================================>
        //Get Home
    app.get('/', function(req, res, next) {
        res.render('index.ejs')
    })
    //To Profile Page
    app.get('/profile',isLoggedIn, function(req, res, next) {
      res.render('profile.ejs',{
        user: req.user
      })
    })
    //Logout
    app.get('/logout',function(req,res){
      req.logout();
      res.redirect('/')
    })


    //<========================================================================>
    //Get Login "Pesan Error Jika Salah"
    app.get('/login', function(req, res, next) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        })
    })
    //Input Login
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))


    //<========================================================================>
    //Get Signup "Pesan Error Jika Salah"
    app.get('/signup', function(req, res, next) {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        })
    })
    //Register Local (Signup)
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash message
    }));

    //<========================================================================>
    /*Cek Login Status
      1. Apakah Sudah Login, Jadi Tidak Perlu Login Lagi Jika Mengakses Page Login
      2. Atau Sudah Login dengan account media sosial lainnya
    */

    app.get('/connect/local',function(req, res, next){
      res.render('connect-local.ejs', {
        message: req.flash('loginMessage')
      })
    })

    app.post('/connect/local',passport.authenticate('local-signup',{
      successRedirect: '/profile',
      failureRedirect: '/connect-local',
      failureFlash: true
    }))


    //<========================================================================>

    app.get('/unlink/local',isLoggedIn, function(req, res, next){
      var user = req.user;
      user.local.email = undefined;
      user.local.password = undefined;
      user.save(function(err) {
        res.redirect('/profile')
      })
    })

}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()

    res.redirect('/')
}
