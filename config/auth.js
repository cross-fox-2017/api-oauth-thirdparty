module.exports = {

    'facebookAuth' : {
        'clientID'      : '190721458072417', // your App ID
        'clientSecret'  : 'b01a09d82d3dda7a221cb5a99ac9fc42', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'd9KDvrJAXqefSOSmnUDNWBc1O',
        'consumerSecret'    : 'pU1Jz1Amb505yyIvpW0YApfAlmpQHsZvqFKu9lKYSEtqsXU98d',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
