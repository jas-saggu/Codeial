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

module.exports.destroy=function(req,res){
        Comment.findById(req.params.id,function(err,comment){
            if(comment.user==req.user.id){
                let postId=comment.post;
                comment.remove();

                Post.findByIdAndUpdate(postId,{ $pull:{comments : req.params.id} },function(err,post){
                    return res.redirect('back');
                })
            }
            else
            {return res.redirect('back');}
        });
}