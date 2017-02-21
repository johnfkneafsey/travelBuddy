const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require('./models');
const config = require('./config');
const secret = require('./secret');

console.log(secret);

const app = express();
mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();

const database = {
};

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

      console.log('cb', cb);
        console.log('searching for user');
        //let user;

        User
            .find({googleId: profile.id}, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results.length) {
                    console.log('need to create');
                }
            })
            .exec()
            .then(res => {
                console.log('response _ID ----------',res[0]._id);

                if (res[0].googleId) {
                    console.log('if statement')
                User
                    .updateOne({_id: res[0]._id},
                        {$set: {accessToken: accessToken}}
                    )
                    .exec()
                    .then(res => {
                        console.log(res);
                    })}})
                    //db.restaurants.updateOne( {_id: myId}, {$set: {name: 'Bizz Bar Bang'}});
                        // update token
                        // user = response;
                    //  console.log('user variable', user);
                //     console.log('response from google log in; ', res);
            .catch(err => {
                console.log(err);
            })

        const user = database[accessToken] = {
            googleId: profile.id,
            accessToken: accessToken
        };

        // datebase {
        //     token#: {
        //         googleId: profile.id,
        //         accessToken: accessToken
        //     }
        // }

        console.log(user, 'user object');

        return cb(null, user);
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            if (!(token in database)) {
                return done(null, false);
            }
            return done(null, database[token]);
        }
    )
);
//what does data look like? how to do we grab and manipulate?

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
