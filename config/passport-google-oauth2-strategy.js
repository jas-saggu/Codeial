const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');// to generate random pins
const User=require('../models/user');
const env=require('./environment');

// tell passport to use a strategy for google login
//asking google to establish the identity of the email id selected by user(which appears in profile)
passport.use(new googleStrategy({
    clientID:env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL:env.google_call_back_url // url on which the google will send back information
},
    function(accessToken,refreshToken,profile,done){
        // find a user
        // emails because user can have multiple emails
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy',err); return;}

            console.log(profile);

            if(user){
                // if found , set this user as req.user(sign in)
                return done(null,user);
            }else{
                // if not found,create the user and set it as req.user(sign in)
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')// generate random password using crypto
                },function(err,user){
                    if(err){console.log('error in creating user',err); return;}
                    return done(null,user);
                });
            }
        })
    }
));

module.exports