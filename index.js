const express = require('express');
const env=require('./config/environment');
const logger=require('morgan');
const cookieParser=require('cookie-parser');
const app=express();
// viw-helper
require('./config/view-helpers')(app);
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
// used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoggle=require('./config/passport-google-oauth2-strategy')
const MongoStore = require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

// set up chat server to be used with socket.io
const chatServer=require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening on port 5000');

const path=require('path');

if(env.name=='development')
{
    app.use(sassMiddleware({
        src:path.join(__dirname,env.asset_path,'scss'),//(./assests/scss)
        dest:path.join(__dirname,env.asset_path,'css'),
        debug: true,
        outputStyle:'extented',
        prefix:'/css'
    }));
}

app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(express.static(env.asset_path));

// make the uploads path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));
// use express layouts(declare it before routes)
app.use(expressLayouts);

app.use(logger(env.morgan.mode,env.morgan.options));

// extract styles and scripts from subpages to layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set viewengine as ejs
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
// if a uses is logged in, he should be logged in even after server is restarted
app.use(session({
    name:'codeial',
    secret:env.session_cookie_key,
    // if user is not logged in, do i want to store extra data
    saveUninitialized:false,
    // if some sort of session data is stored, do i want to rewrite it?
    resave:false,
    cookie:{
        maxAge:(1000 * 60 *100) //milliseconds
    },
    store: MongoStore.create(
        {
          mongoUrl: 'mongodb://localhost/codeial_development',
          autoRemove: "disabled",
        }
    ) 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// set it up after session is used(as this uses session cookies)
app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error on running port : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});