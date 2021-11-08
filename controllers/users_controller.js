const User=require('../models/user');

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'Sign in'
    });
}

module.exports.signUp=function(req,res){
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
    
}
