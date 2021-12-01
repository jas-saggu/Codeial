const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

// tell passport to use a strategy for google login
//asking google to establish the identity of the email id selected by user(which appears in profile)
passport.use(new googleStrategy({
    clientID:'1017213744976-6526tr06vt1pb15u2ocblncj3o4e9rh9.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback'// url on which the google will send back information
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