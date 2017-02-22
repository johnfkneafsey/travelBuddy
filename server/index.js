const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require('./models');
const config = require('./config');
const secret = require('./secret');
var findOrCreate = require('mongoose-findorcreate')
console.log(secret);


const app = express();
mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();

const database = {
};
console.log('THIS IS THE DATABASE', database)

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.CLIENT_ROOT);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(passport.initialize());

passport.use(
    new GoogleStrategy({
        clientID:  '634338731171-p1fa27i543iqh7bumg3git2r5iu15cug.apps.googleusercontent.com',
        clientSecret: secret,
        callbackURL: `${config.ROOT}/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {


// Job 1: Set up Mongo/Mongoose, create a User model which store the
// google id, and the access token
// Job 2: Update this callback to either update or create the user
// so it contains the correct access token
        console.log(profile.name+ 'profile');
        User
            .find({googleId: profile.id}, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results.length) {
                    console.log('Creating a new user');
                    var newUser = {
                        googleId: profile.id,
                        accessToken: accessToken,
                        name: profile.displayName
                        }
                User
                    .create(newUser)
                    .then(res => {
                        console.log('successfully created new user. Response: ', res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
                else {
                    console.log('Updating accessToken for the existing user');
                    User
                        .updateOne({"googleId" : profile.id}, {$set:{accessToken : accessToken}
                        })
                        .then(res => { 
                        console.log("Successfully updated token. Response: ", res );

                    }) 
                }
            })
            .exec()
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })

        const user = database[accessToken] = {
            googleId: profile.id,
            accessToken: accessToken
        };

        return cb(null, user);
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
// Job 3: Update this callback to try to find a user with a 
// matching access token.  If they exist, let em in, if not,
// don't.
        User.findOne({accessToken: token}, function(err,user){
            if(err){
                console.log('ERROR WITH BEARER ',err);
                return done(err);
            }
            if(!user){
              console.log('NO USER FOUND IN BEARER')
              return done(null, false)
            }
            else {
             console.log('USER FOUND IN BEARER '. user)
             return done(null, user, {scope: 'all'})
            }
        })
        // do we need this stuff below??? maybe send response code?
        .exec()
        .then(res => {
            console.log('BEARER STRATEGY RESPONSE', res);

        })
        .catch(err => {
            console.log(err);
        })

           console.log(token + 'token in Database' + database);
            if (!(token in database)) {
                return done(null, false);
            }
            return done(null, database[token]);
        }
    )
);



app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${config.CLIENT_ROOT}`,
        session: false
    }),
    (req, res) => {
        console.log('request object pre cookies', req.user);
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect(`${config.CLIENT_ROOT}`);
    }
);

app.get('/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json({
        googleId: req.user.googleId
    })
);

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json(['Question 1', 'Question 2'])
);


app.post('/users', jsonParser, (req, res) => {
    console.log('endpoint reached', req.body);
    User
        .create({
            googleId: req.body.googleId,
            accessToken: req.body.accessToken,
            email: req.body.email,
            name: req.body.name
        })
        .then(response => {
            res.status(201).json(response.apiRepr())
        })
        .catch(err => {
            res.status(500).json({error: '500 error'})
        })
});




let server;
function runServer(host, port) {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost/SpacedRepetition', function(err) {
            if(err) {
                return reject(err);
            }
        })
        server = app.listen(port, host, () => {
            console.log(`Server running on ${host}:${port}`);
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer(config.HOST, config.PORT);
}

module.exports = {
    app, runServer, closeServer
};