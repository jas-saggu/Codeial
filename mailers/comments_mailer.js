const nodemailer=require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment=(comment)=>{
    console.log('inside newCOmment mailer',comment);
    nodemailer.transporter.sendMail({
        from:'saggu.jaskiratsingh@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published',
        html:'<h1> Yup, your comment is not published </h1>'
    },(err,info)=>{
        if(err){console.log('error in sending mail ',err); return;}
        console.log('mail delivered ',info);
        return;
    });
}