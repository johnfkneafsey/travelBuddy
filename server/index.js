const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User, Question } = require('./models');
const config = require('./config');
const secret = require('./secret');

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



function questionHistory() {
     Question
        .find()
        .exec()
        .then(res => {
            return res;
        })
}




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

       // console.log(profile.name+ 'profile');
       let questionHistory = [];

        Question
            .find()
            .exec()
            .then(res => {
//                console.log('QUESTION RESPONSE  ',res);
                questionHistory = res;
            })





        User
            .findOne({googleId: profile.id}) 
            .exec()
            .then(user => {
                if (!user) {
  //                  console.log('QUESTION HISTORY  ', questionHistory())
   //                 console.log('Creating a new user');
                    var newUser = {
                        googleId: profile.id,
                        accessToken: accessToken,
                        questionHistory: questionHistory,
                        name: profile.displayName
                    }
                    return User
                        .create(newUser)
                }
                else {
                    console.log('Updating accessToken for the existing user');
                    return User
                        .findOneAndUpdate({"googleId" : profile.id}, {$set:{accessToken : accessToken}}, {new: true})
                }
            })             
            .then(user => {
                console.log('USER ',user)
                return cb(null, user)
            })
            .catch(err => {
                console.log(err);
            })
    }
));

passport.use(
    new BearerStrategy(
        (accessToken, cb) => {
        // Job 3: Update this callback to try to find a user with a 
        // matching access token.  If they exist, let em in, if not,
        // don't.
        User.findOne({accessToken: accessToken}, function(err,user){
            if(err){
                console.log('ERROR WITH BEARER ');
                return cb(err);
            }
            if(!user){
                console.log('NO USER FOUND IN BEARER')
                return cb(null, false)
            }
            else {
                console.log('USER FOUND IN BEARER ')
                console.log(user);
                return cb(null, user, {scope: 'all'})
            }
        })
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
    (req, res) => {
        console.log('reached /api/me endpoint through bearer strategy')
        res.json({googleId: req.user.googleId})
    }
);

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        console.log('reached /api/questions endpoint through bearer strategy')
        console.log('REQUEST OBJECT ', req.user)
        res.json(req.user);
    }
);


app.post('/questions', jsonParser, (req, res) => {
    console.log('endpoint reached', req.body);
    Question
        .create({
            question: req.body.question,
            answer: req.body.answer,
            mValue: req.body.mValue
        })
        .then(response => {
            console.log('RESPONSE OBJECT (QUESTIONS ADDED)', response)
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