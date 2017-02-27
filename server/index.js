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


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.CLIENT_ROOT);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(passport.initialize());


app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
   next();
});

passport.use(
    new GoogleStrategy({
        clientID:  '634338731171-p1fa27i543iqh7bumg3git2r5iu15cug.apps.googleusercontent.com',
        clientSecret: secret,
        callbackURL: `${config.ROOT}/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {

       let questionHistory = [];

        Question
            .find()
            .exec()
            .then(res => {
                console.log('WHAT IS THE RESPONSE???? ',res);
                questionHistory = res;
            })

        User
            .findOne({googleId: profile.id}) 
            .exec()
            .then(user => {
                if (!user) {
                    var newUser = {
                        googleId: profile.id,
                        accessToken: accessToken,
                        questionHistory: questionHistory,
                        name: profile.displayName,
                        answerHistory: {
                            questions: 0,
                            correctAnswers: 0
                        } 
                    }
                    console.log('NEW USER ', newUser)
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
    res.redirect('http://localhost:3000');
    
});

app.put('/api/logout', jsonParser, (req, res) => {
    res.status(200)
    console.log('IS THIS WORKING???? ', req.body.answerHistory)

    User
        .findOneAndUpdate({"googleId": req.body.googleId}, {$set:{"questionHistory": req.body.questionHistory, "answerHistory": req.body.answerHistory}})
        .exec()
        .then(updatedStudent => res.status(201).json())
        .catch(err => res.status(500).json({message: 'Your update was unsuccessful'}));
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
            spanish: [{
                question: req.body.spanish[0].question,
                answer: req.body.spanish[0].answer,
                mValue: req.body.spanish[0].mValue
            },
            {
                question: req.body.spanish[1].question,
                answer: req.body.spanish[1].answer,
                mValue: req.body.spanish[1].mValue
            },
            {
                question: req.body.spanish[2].question,
                answer: req.body.spanish[2].answer,
                mValue: req.body.spanish[2].mValue
            },
            {
                question: req.body.spanish[3].question,
                answer: req.body.spanish[3].answer,
                mValue: req.body.spanish[3].mValue
            },
            {
                question: req.body.spanish[4].question,
                answer: req.body.spanish[4].answer,
                mValue: req.body.spanish[4].mValue
            },
            {
                question: req.body.spanish[5].question,
                answer: req.body.spanish[5].answer,
                mValue: req.body.spanish[5].mValue
            },
            {
                question: req.body.spanish[6].question,
                answer: req.body.spanish[6].answer,
                mValue: req.body.spanish[6].mValue
            },
            {
                question: req.body.spanish[7].question,
                answer: req.body.spanish[7].answer,
                mValue: req.body.spanish[7].mValue
            },
            {
                question: req.body.spanish[8].question,
                answer: req.body.spanish[8].answer,
                mValue: req.body.spanish[8].mValue
            },
            {
                question: req.body.spanish[9].question,
                answer: req.body.spanish[9].answer,
                mValue: req.body.spanish[9].mValue
            },
            {
                question: req.body.spanish[10].question,
                answer: req.body.spanish[10].answer,
                mValue: req.body.spanish[10].mValue
            },
            {
                question: req.body.spanish[11].question,
                answer: req.body.spanish[11].answer,
                mValue: req.body.spanish[11].mValue
            },
            {
                question: req.body.spanish[12].question,
                answer: req.body.spanish[12].answer,
                mValue: req.body.spanish[12].mValue
            },
            {
                question: req.body.spanish[13].question,
                answer: req.body.spanish[13].answer,
                mValue: req.body.spanish[13].mValue
            },
            {
                question: req.body.spanish[14].question,
                answer: req.body.spanish[14].answer,
                mValue: req.body.spanish[14].mValue
            },
            {
                question: req.body.spanish[15].question,
                answer: req.body.spanish[15].answer,
                mValue: req.body.spanish[15].mValue
            },
            {
                question: req.body.spanish[16].question,
                answer: req.body.spanish[16].answer,
                mValue: req.body.spanish[16].mValue
            },
            {
                question: req.body.spanish[17].question,
                answer: req.body.spanish[17].answer,
                mValue: req.body.spanish[17].mValue
            },
            {
                question: req.body.spanish[18].question,
                answer: req.body.spanish[18].answer,
                mValue: req.body.spanish[18].mValue
            },
            {
                question: req.body.spanish[19].question,
                answer: req.body.spanish[19].answer,
                mValue: req.body.spanish[19].mValue
            }
            ],
french: [{
                question: req.body.french[0].question,
                answer: req.body.french[0].answer,
                mValue: req.body.french[0].mValue
            },
            {
                question: req.body.french[1].question,
                answer: req.body.french[1].answer,
                mValue: req.body.french[1].mValue
            },
            {
                question: req.body.french[2].question,
                answer: req.body.french[2].answer,
                mValue: req.body.french[2].mValue
            },
            {
                question: req.body.french[3].question,
                answer: req.body.french[3].answer,
                mValue: req.body.french[3].mValue
            },
            {
                question: req.body.french[4].question,
                answer: req.body.french[4].answer,
                mValue: req.body.french[4].mValue
            },
            {
                question: req.body.french[5].question,
                answer: req.body.french[5].answer,
                mValue: req.body.french[5].mValue
            },
            {
                question: req.body.french[6].question,
                answer: req.body.french[6].answer,
                mValue: req.body.french[6].mValue
            },
            {
                question: req.body.french[7].question,
                answer: req.body.french[7].answer,
                mValue: req.body.french[7].mValue
            },
            {
                question: req.body.french[8].question,
                answer: req.body.french[8].answer,
                mValue: req.body.french[8].mValue
            },
            {
                question: req.body.french[9].question,
                answer: req.body.french[9].answer,
                mValue: req.body.french[9].mValue
            },
            {
                question: req.body.french[10].question,
                answer: req.body.french[10].answer,
                mValue: req.body.french[10].mValue
            },
            {
                question: req.body.french[11].question,
                answer: req.body.french[11].answer,
                mValue: req.body.french[11].mValue
            },
            {
                question: req.body.french[12].question,
                answer: req.body.french[12].answer,
                mValue: req.body.french[12].mValue
            },
            {
                question: req.body.french[13].question,
                answer: req.body.french[13].answer,
                mValue: req.body.french[13].mValue
            },
            {
                question: req.body.french[14].question,
                answer: req.body.french[14].answer,
                mValue: req.body.french[14].mValue
            },
            {
                question: req.body.french[15].question,
                answer: req.body.french[15].answer,
                mValue: req.body.french[15].mValue
            },
            {
                question: req.body.french[16].question,
                answer: req.body.french[16].answer,
                mValue: req.body.french[16].mValue
            },
            {
                question: req.body.french[17].question,
                answer: req.body.french[17].answer,
                mValue: req.body.french[17].mValue
            },
            {
                question: req.body.french[18].question,
                answer: req.body.french[18].answer,
                mValue: req.body.french[18].mValue
            },
            {
                question: req.body.french[19].question,
                answer: req.body.french[19].answer,
                mValue: req.body.french[19].mValue
            }
            ],
italian: [{
                question: req.body.italian[0].question,
                answer: req.body.italian[0].answer,
                mValue: req.body.italian[0].mValue
            },
            {
                question: req.body.italian[1].question,
                answer: req.body.italian[1].answer,
                mValue: req.body.italian[1].mValue
            },
            {
                question: req.body.italian[2].question,
                answer: req.body.italian[2].answer,
                mValue: req.body.italian[2].mValue
            },
            {
                question: req.body.italian[3].question,
                answer: req.body.italian[3].answer,
                mValue: req.body.italian[3].mValue
            },
            {
                question: req.body.italian[4].question,
                answer: req.body.italian[4].answer,
                mValue: req.body.italian[4].mValue
            },
            {
                question: req.body.italian[5].question,
                answer: req.body.italian[5].answer,
                mValue: req.body.italian[5].mValue
            },
            {
                question: req.body.italian[6].question,
                answer: req.body.italian[6].answer,
                mValue: req.body.italian[6].mValue
            },
            {
                question: req.body.italian[7].question,
                answer: req.body.italian[7].answer,
                mValue: req.body.italian[7].mValue
            },
            {
                question: req.body.italian[8].question,
                answer: req.body.italian[8].answer,
                mValue: req.body.italian[8].mValue
            },
            {
                question: req.body.italian[9].question,
                answer: req.body.italian[9].answer,
                mValue: req.body.italian[9].mValue
            },
            {
                question: req.body.italian[10].question,
                answer: req.body.italian[10].answer,
                mValue: req.body.italian[10].mValue
            },
            {
                question: req.body.italian[11].question,
                answer: req.body.italian[11].answer,
                mValue: req.body.italian[11].mValue
            },
            {
                question: req.body.italian[12].question,
                answer: req.body.italian[12].answer,
                mValue: req.body.italian[12].mValue
            },
            {
                question: req.body.italian[13].question,
                answer: req.body.italian[13].answer,
                mValue: req.body.italian[13].mValue
            },
            {
                question: req.body.italian[14].question,
                answer: req.body.italian[14].answer,
                mValue: req.body.italian[14].mValue
            },
            {
                question: req.body.italian[15].question,
                answer: req.body.italian[15].answer,
                mValue: req.body.italian[15].mValue
            },
            {
                question: req.body.italian[16].question,
                answer: req.body.italian[16].answer,
                mValue: req.body.italian[16].mValue
            },
            {
                question: req.body.italian[17].question,
                answer: req.body.italian[17].answer,
                mValue: req.body.italian[17].mValue
            },
            {
                question: req.body.italian[18].question,
                answer: req.body.italian[18].answer,
                mValue: req.body.italian[18].mValue
            },
            {
                question: req.body.italian[19].question,
                answer: req.body.italian[19].answer,
                mValue: req.body.italian[19].mValue
            }
            ],
portuguese: [{
                question: req.body.portuguese[0].question,
                answer: req.body.portuguese[0].answer,
                mValue: req.body.portuguese[0].mValue
            },
            {
                question: req.body.portuguese[1].question,
                answer: req.body.portuguese[1].answer,
                mValue: req.body.portuguese[1].mValue
            },
            {
                question: req.body.portuguese[2].question,
                answer: req.body.portuguese[2].answer,
                mValue: req.body.portuguese[2].mValue
            },
            {
                question: req.body.portuguese[3].question,
                answer: req.body.portuguese[3].answer,
                mValue: req.body.portuguese[3].mValue
            },
            {
                question: req.body.portuguese[4].question,
                answer: req.body.portuguese[4].answer,
                mValue: req.body.portuguese[4].mValue
            },
            {
                question: req.body.portuguese[5].question,
                answer: req.body.portuguese[5].answer,
                mValue: req.body.portuguese[5].mValue
            },
            {
                question: req.body.portuguese[6].question,
                answer: req.body.portuguese[6].answer,
                mValue: req.body.portuguese[6].mValue
            },
            {
                question: req.body.portuguese[7].question,
                answer: req.body.portuguese[7].answer,
                mValue: req.body.portuguese[7].mValue
            },
            {
                question: req.body.portuguese[8].question,
                answer: req.body.portuguese[8].answer,
                mValue: req.body.portuguese[8].mValue
            },
            {
                question: req.body.portuguese[9].question,
                answer: req.body.portuguese[9].answer,
                mValue: req.body.portuguese[9].mValue
            },
            {
                question: req.body.portuguese[10].question,
                answer: req.body.portuguese[10].answer,
                mValue: req.body.portuguese[10].mValue
            },
            {
                question: req.body.portuguese[11].question,
                answer: req.body.portuguese[11].answer,
                mValue: req.body.portuguese[11].mValue
            },
            {
                question: req.body.portuguese[12].question,
                answer: req.body.portuguese[12].answer,
                mValue: req.body.portuguese[12].mValue
            },
            {
                question: req.body.portuguese[13].question,
                answer: req.body.portuguese[13].answer,
                mValue: req.body.portuguese[13].mValue
            },
            {
                question: req.body.portuguese[14].question,
                answer: req.body.portuguese[14].answer,
                mValue: req.body.portuguese[14].mValue
            },
            {
                question: req.body.portuguese[15].question,
                answer: req.body.portuguese[15].answer,
                mValue: req.body.portuguese[15].mValue
            },
            {
                question: req.body.portuguese[16].question,
                answer: req.body.portuguese[16].answer,
                mValue: req.body.portuguese[16].mValue
            },
            {
                question: req.body.portuguese[17].question,
                answer: req.body.portuguese[17].answer,
                mValue: req.body.portuguese[17].mValue
            },
            {
                question: req.body.portuguese[18].question,
                answer: req.body.portuguese[18].answer,
                mValue: req.body.portuguese[18].mValue
            },
            {
                question: req.body.portuguese[19].question,
                answer: req.body.portuguese[19].answer,
                mValue: req.body.portuguese[19].mValue
            }
            ],
polish: [{
                question: req.body.polish[0].question,
                answer: req.body.polish[0].answer,
                mValue: req.body.polish[0].mValue
            },
            {
                question: req.body.polish[1].question,
                answer: req.body.polish[1].answer,
                mValue: req.body.polish[1].mValue
            },
            {
                question: req.body.polish[2].question,
                answer: req.body.polish[2].answer,
                mValue: req.body.polish[2].mValue
            },
            {
                question: req.body.polish[3].question,
                answer: req.body.polish[3].answer,
                mValue: req.body.polish[3].mValue
            },
            {
                question: req.body.polish[4].question,
                answer: req.body.polish[4].answer,
                mValue: req.body.polish[4].mValue
            },
            {
                question: req.body.polish[5].question,
                answer: req.body.polish[5].answer,
                mValue: req.body.polish[5].mValue
            },
            {
                question: req.body.polish[6].question,
                answer: req.body.polish[6].answer,
                mValue: req.body.polish[6].mValue
            },
            {
                question: req.body.polish[7].question,
                answer: req.body.polish[7].answer,
                mValue: req.body.polish[7].mValue
            },
            {
                question: req.body.polish[8].question,
                answer: req.body.polish[8].answer,
                mValue: req.body.polish[8].mValue
            },
            {
                question: req.body.polish[9].question,
                answer: req.body.polish[9].answer,
                mValue: req.body.polish[9].mValue
            },
            {
                question: req.body.polish[10].question,
                answer: req.body.polish[10].answer,
                mValue: req.body.polish[10].mValue
            },
            {
                question: req.body.polish[11].question,
                answer: req.body.polish[11].answer,
                mValue: req.body.polish[11].mValue
            },
            {
                question: req.body.polish[12].question,
                answer: req.body.polish[12].answer,
                mValue: req.body.polish[12].mValue
            },
            {
                question: req.body.polish[13].question,
                answer: req.body.polish[13].answer,
                mValue: req.body.polish[13].mValue
            },
            {
                question: req.body.polish[14].question,
                answer: req.body.polish[14].answer,
                mValue: req.body.polish[14].mValue
            },
            {
                question: req.body.polish[15].question,
                answer: req.body.polish[15].answer,
                mValue: req.body.polish[15].mValue
            },
            {
                question: req.body.polish[16].question,
                answer: req.body.polish[16].answer,
                mValue: req.body.polish[16].mValue
            },
            {
                question: req.body.polish[17].question,
                answer: req.body.polish[17].answer,
                mValue: req.body.polish[17].mValue
            },
            {
                question: req.body.polish[18].question,
                answer: req.body.polish[18].answer,
                mValue: req.body.polish[18].mValue
            },
            {
                question: req.body.polish[19].question,
                answer: req.body.polish[19].answer,
                mValue: req.body.polish[19].mValue
            }
            ],
swedish: [{
                question: req.body.swedish[0].question,
                answer: req.body.swedish[0].answer,
                mValue: req.body.swedish[0].mValue
            },
            {
                question: req.body.swedish[1].question,
                answer: req.body.swedish[1].answer,
                mValue: req.body.swedish[1].mValue
            },
            {
                question: req.body.swedish[2].question,
                answer: req.body.swedish[2].answer,
                mValue: req.body.swedish[2].mValue
            },
            {
                question: req.body.swedish[3].question,
                answer: req.body.swedish[3].answer,
                mValue: req.body.swedish[3].mValue
            },
            {
                question: req.body.swedish[4].question,
                answer: req.body.swedish[4].answer,
                mValue: req.body.swedish[4].mValue
            },
            {
                question: req.body.swedish[5].question,
                answer: req.body.swedish[5].answer,
                mValue: req.body.swedish[5].mValue
            },
            {
                question: req.body.swedish[6].question,
                answer: req.body.swedish[6].answer,
                mValue: req.body.swedish[6].mValue
            },
            {
                question: req.body.swedish[7].question,
                answer: req.body.swedish[7].answer,
                mValue: req.body.swedish[7].mValue
            },
            {
                question: req.body.swedish[8].question,
                answer: req.body.swedish[8].answer,
                mValue: req.body.swedish[8].mValue
            },
            {
                question: req.body.swedish[9].question,
                answer: req.body.swedish[9].answer,
                mValue: req.body.swedish[9].mValue
            },
            {
                question: req.body.swedish[10].question,
                answer: req.body.swedish[10].answer,
                mValue: req.body.swedish[10].mValue
            },
            {
                question: req.body.swedish[11].question,
                answer: req.body.swedish[11].answer,
                mValue: req.body.swedish[11].mValue
            },
            {
                question: req.body.swedish[12].question,
                answer: req.body.swedish[12].answer,
                mValue: req.body.swedish[12].mValue
            },
            {
                question: req.body.swedish[13].question,
                answer: req.body.swedish[13].answer,
                mValue: req.body.swedish[13].mValue
            },
            {
                question: req.body.swedish[14].question,
                answer: req.body.swedish[14].answer,
                mValue: req.body.swedish[14].mValue
            },
            {
                question: req.body.swedish[15].question,
                answer: req.body.swedish[15].answer,
                mValue: req.body.swedish[15].mValue
            },
            {
                question: req.body.swedish[16].question,
                answer: req.body.swedish[16].answer,
                mValue: req.body.swedish[16].mValue
            },
            {
                question: req.body.swedish[17].question,
                answer: req.body.swedish[17].answer,
                mValue: req.body.swedish[17].mValue
            },
            {
                question: req.body.swedish[18].question,
                answer: req.body.swedish[18].answer,
                mValue: req.body.swedish[18].mValue
            },
            {
                question: req.body.swedish[19].question,
                answer: req.body.swedish[19].answer,
                mValue: req.body.swedish[19].mValue
            }
            ],
german: [{
                question: req.body.german[0].question,
                answer: req.body.german[0].answer,
                mValue: req.body.german[0].mValue
            },
            {
                question: req.body.german[1].question,
                answer: req.body.german[1].answer,
                mValue: req.body.german[1].mValue
            },
            {
                question: req.body.german[2].question,
                answer: req.body.german[2].answer,
                mValue: req.body.german[2].mValue
            },
            {
                question: req.body.german[3].question,
                answer: req.body.german[3].answer,
                mValue: req.body.german[3].mValue
            },
            {
                question: req.body.german[4].question,
                answer: req.body.german[4].answer,
                mValue: req.body.german[4].mValue
            },
            {
                question: req.body.german[5].question,
                answer: req.body.german[5].answer,
                mValue: req.body.german[5].mValue
            },
            {
                question: req.body.german[6].question,
                answer: req.body.german[6].answer,
                mValue: req.body.german[6].mValue
            },
            {
                question: req.body.german[7].question,
                answer: req.body.german[7].answer,
                mValue: req.body.german[7].mValue
            },
            {
                question: req.body.german[8].question,
                answer: req.body.german[8].answer,
                mValue: req.body.german[8].mValue
            },
            {
                question: req.body.german[9].question,
                answer: req.body.german[9].answer,
                mValue: req.body.german[9].mValue
            },
            {
                question: req.body.german[10].question,
                answer: req.body.german[10].answer,
                mValue: req.body.german[10].mValue
            },
            {
                question: req.body.german[11].question,
                answer: req.body.german[11].answer,
                mValue: req.body.german[11].mValue
            },
            {
                question: req.body.german[12].question,
                answer: req.body.german[12].answer,
                mValue: req.body.german[12].mValue
            },
            {
                question: req.body.german[13].question,
                answer: req.body.german[13].answer,
                mValue: req.body.german[13].mValue
            },
            {
                question: req.body.german[14].question,
                answer: req.body.german[14].answer,
                mValue: req.body.german[14].mValue
            },
            {
                question: req.body.german[15].question,
                answer: req.body.german[15].answer,
                mValue: req.body.german[15].mValue
            },
            {
                question: req.body.german[16].question,
                answer: req.body.german[16].answer,
                mValue: req.body.german[16].mValue
            },
            {
                question: req.body.german[17].question,
                answer: req.body.german[17].answer,
                mValue: req.body.german[17].mValue
            },
            {
                question: req.body.german[18].question,
                answer: req.body.german[18].answer,
                mValue: req.body.german[18].mValue
            },
            {
                question: req.body.german[19].question,
                answer: req.body.german[19].answer,
                mValue: req.body.german[19].mValue
            }
            ]
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