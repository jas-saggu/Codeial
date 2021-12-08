
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
    jwt_secret:'codeial'
}

const production={
    name:'production'
}

module.exports=development;