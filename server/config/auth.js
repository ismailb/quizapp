// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': 'your-secret-clientID-here', // your App ID
        'clientSecret': 'your-client-secret-here', // your App Secret
        'callbackURL': 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth': {
        'consumerKey': 'your-consumer-key-here',
        'consumerSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': '1095406519089-ar878jcnjn3qebu7eva3m543v00n9h8q.apps.googleusercontent.com',
        'clientSecret': 'ZBKZIfFWmtRXJBL2253lg645',
        'callbackURL': 'http://dry-fortress-2904.herokuapp.com/auth/google/callback'
        //'consumerKey': '1095406519089-2t10rkd3ospj8qj02t6ka3vtcbd938qv.apps.googleusercontent.com',
        //'consumerSecret': 'jFGWh1Lcvo_FQJbtVggXNlgY'//,
        
        //'returnURL': 'http://localhost:9000/auth/google/callback',
        //'realm': 'http://localhost:9000'
    }

};