const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./environment');
// config through which and how ill be sending emails
let transporter= nodemailer.createTransport(env.smtp);

//define that we will use templates and ejs
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