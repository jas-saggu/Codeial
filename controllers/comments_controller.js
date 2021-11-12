const Comment = require('../models/comment');
const Post=require('../models/post');

module.exports.create=async function(req,res){
    try{
        // req.body.post has the post id as given by us in home.ejs
        let post = await Post.findById(req.body.post)

            if(post){
                // if post is found with the req.body.post (which is post id)
                // create a comment
                let comment=await Comment.create({
                    content:req.body.content,
                    post: req.body.post,
                    user: req.user._id
                });
                // also add this comment into the schema of that post for easy access to all comments of a post
                post.comments.push(comment);
                // save this data
                post.save();
                res.redirect('/');
            }
    }catch(err){
        console.log("error : ",err);
        return
    }
}

module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id)
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();

            let post=await Post.findByIdAndUpdate(postId,{ $pull:{comments : req.params.id} })
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("error : ",err);
        return
    }
}