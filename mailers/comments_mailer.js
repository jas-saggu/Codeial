const nodemailer=require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')

    nodemailer.transporter.sendMail({
        from:'saggu.jaskiratsingh@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published',
        html:htmlString
    },(err,info)=>{
        if(err){console.log('error in sending mail ',err); return;}
        console.log('mail delivered ',info);
        return;
    });
}