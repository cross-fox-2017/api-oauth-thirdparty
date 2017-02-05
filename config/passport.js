//load all the things we need

const LocalStrategy = require('passport-local').Strategy;

// load up the user model
const User = require('../app/models/user');

// expose this function to our app using module.exports

//userd to serialize the user for the session
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });

    //used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({
                'local.email': email
            }, function(err, user) {
                if (err) return done(err)

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
                } else {
                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password)

                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser)
                    });
                }
            })
        })
    }))

}
