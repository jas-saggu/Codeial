const User=require('../models/user');
const fs=require('fs');
const path=require('path');

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'Profile',
            profile_user: user
        });
    })
};

module.exports.update=async function(req,res){
    // req.user.id is the user who is logged in
    // req.params.id is the user who is trying to update

    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         req.flash('success','Profile Updated');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error','You cannot update this profile');
    //     return res.status(401).send('Unauthorised');
    // }

    if(req.user.id==req.params.id){
        try{
            let user = await User.findById(req.params.id);
            // static func we created, to fetch data from Multipart form
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*** Multer Error : ',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;

                // if uploading avatar
                if(req.file){
                    // edge case: if there is already avatar then remove older and add new
                    let oldAvatar=path.join(__dirname , '..' , user.avatar); // place where oldAvatar is present
                    // user.avatar to check if user already has an avatar and fs.existSync to check if there is a url in DB stored for avatar in user 
                    if(user.avatar && fs.existsSync(oldAvatar)){
                        //1.delete earlier
                        fs.unlinkSync(oldAvatar)
                    }
                    //2.update new
                    // this is saving the path of the uploaded file into the avatar field in user
                    //User.avatarPath= AVATARPATH which is in user.js made available to all + / +filename  
                    user.avatar= User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
        req.flash('error','You cannot update this profile');
        return res.status(401).send('Unauthorised');
    }
}

module.exports.signIn=function(req,res){

    //if user already in, prevent signin page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:'Sign in'
    });
}

module.exports.signUp=function(req,res){

     //if user already in, prevent signup page
     if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:'Sign Up'
    });
}

// get the sign up data
module.exports.create=function(req,res){

    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log(`error in signing up : ${err}`); return }

        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err){console.log(`error in creating user : ${err}`); return }
                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    });

}

// sign in and create a session for user
module.exports.createSession=function(req,res){
    // req.flash(on cond. , message)
    req.flash('success','Logged In Successfully')
    return res.redirect('/')
}

module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Signed Out Successfully')
    return res.redirect('/');
}