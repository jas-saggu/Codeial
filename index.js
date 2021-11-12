const express = require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
// used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle:'extented',
    prefix:'/css'
}))
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

// use express layouts(declare it before routes)
app.use(expressLayouts);

// extract styles and scripts from subpages to layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set viewengine as ejs
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    secret:'blahsomething',
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