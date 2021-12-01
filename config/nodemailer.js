const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

// config through which and how ill be sending emails
let transporter= nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,// used for TLS
    secure:'false',
    auth:{ // to establish identity
        user:'saggu.jaskiratsingh@gmail.com',
        pass:'9971544810'
    }
});

//define that we will use templates and ejs8
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),// relativePath from where this funciton is being called
        data,//context which is to be passed
        function(err,template){
            if(err){console.log('error in rendering template ',err); return;}
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}