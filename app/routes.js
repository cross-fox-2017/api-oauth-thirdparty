module.exports = function(app, passport) {

    //<========================================================================>
    //Get Home
    app.get('/', function(req, res, next) {
        res.render('index.ejs')
    })
    //To Profile Page
    app.get('/profile', isLoggedIn, function(req, res, next) {
        res.render('profile.ejs', {
            user: req.user
        })
    })
    //Logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/')
    })

    //<========================================================================>
    /*Cek Login Status || Authentication
        Authentication adalah proses untuk memastikan bahwa pelaku adalah benar-benar pelaku. Proses ini memastikan supaya kalau ada yang mengaku sebagai orang lain bisa terdeteksi sebagai orang lain. Demikian juga jika memang benar pelaku, maka proses juga dapat memastikan bahwa yang mengaku sebagai pelaku benar-benar sebagai pelaku.
        Dalam login aplikasi,  proses authentification yang berhasil biasanya ditandai dengan username dan password yang tepat yang dimasukkan oleh pemakai aplikasi. Setiap pemakai aplikasi diberi username dan password yang berbeda-beda dan hanya diketahui oleh user yang bersangkutan. Jika suatu login berhasil, maka dipastikan bahwa yang login adalah user yang bersangkutan karena hanya dialah yang tahu username dan passwordnya.
        Untuk menambah pengamanan dalam authentication ini ada yang menambahkan token yang dikirim lewat SMS atau melalui suatu perangkat tertentu. Token ini akan semakin menambah kepercayaan bahwa yang login adalah benar-benar user yang berhak
    */
    // Local -------------------------------

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


    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter', {
        scope: 'email'
    }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    //<========================================================================>
    /*
    Authorization
        Setelah proses authentication berhasil maka proses selanjutnya adalah authorization. Dalam proses authorization ini akan ditentukan menu apa saja yang bisa dijalankan oleh user tersebut. Biasanya setiap user sudah diberikan role-role tertentu dalam menjalankan aplikasi yang telah dibangun.
    */

    // Local -------------------------------

    app.get('/connect/local', function(req, res, next) {
        res.render('connect-local.ejs', {
            message: req.flash('loginMessage')
        })
    })

    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/connect-local',
        failureFlash: true
    }))


    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // Local -------------------------------

    app.get('/unlink/local', isLoggedIn, function(req, res, next) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile')
        })
    })

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()

    res.redirect('/')
}
