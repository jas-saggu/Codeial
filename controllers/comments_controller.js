const Comment = require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    // req.body.post has the post id as given by us in home.ejs
    Post.findById(req.body.post,function(err,post){

        if(post){
            // if post is found with the req.body.post (which is post id)
            // create a comment
            Comment.create({
                content:req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                if(err){console.log('error in adding comment'); return;}

            // also add this comment into the schema of that post for easy access to all comments of a post
                post.comments.push(comment);
            // save this data
                post.save();

                 res.redirect('/');
            })
        }

    });
}