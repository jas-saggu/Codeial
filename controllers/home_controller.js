const Post=require('../models/post');
const User=require('../models/user');
const Like=require('../models/like');

module.exports.home=async function(req,res){
  
    try{
        let posts=await Post.find({})
        .sort('-createdAt') // sort the posts (new -> old)
        .populate('user')//find user of each post
        // find comments on each post
        .populate({
            path:'comments',
            // find user of each comment
            populate:{
                path:'user'
            },
            // find likes on each comment
            populate:{
                path:'likes'
            }
        }).populate('likes');// find likes on each post
    
        let users=await User.find({});
        let friends_user=await User.find();

        return res.render('home',{
            title:"home" ,
            posts: posts,
            all_users : users
        });
        
    }catch(err){
        console.log('Error in loading home :',err);
        return;
    }
            
};  
