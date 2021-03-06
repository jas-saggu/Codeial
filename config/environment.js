const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
// first find logDirectory if not found then create
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',//duration for which to maintain logs
    path:logDirectory
});

const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,// used for TLS
        secure:'false',
        auth:{ // to establish identity
            user:'saggu.jaskiratsingh@gmail.com',
            pass:'9971544810'
        }
    },
    google_client_id:'1017213744976-6526tr06vt1pb15u2ocblncj3o4e9rh9.apps.googleusercontent.com',
    google_client_secret:'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',
    google_call_back_url:'http://localhost:8000/users/auth/google/callback',// url on which the google will send back information
    jwt_secret:'codeial',
    morgan:{
        mode:'dev',
        options:{stream: accessLogStream}
    }
}

const production={
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,// used for TLS
        secure:'false',
        auth:{ // to establish identity
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass:process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,// url on which the google will send back information
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream: accessLogStream}
    }
}

// eval ->evaluates the variable
module.exports=eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development: eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports=development; 