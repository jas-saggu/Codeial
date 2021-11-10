const Post=require('../models/post');

module.exports.home=function(req,res){

    // Post.find({},function(err,posts){

    //     if(err){console.log("error in showing posts "); return;}
    //     return res.render('home',{
    //         title:"home" ,
    //         posts: posts
    //     });
    // });

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        if(err){console.log("error in showing posts "); return;}
        return res.render('home',{
            title:"home" ,
            posts: posts
        });
    });
};  
