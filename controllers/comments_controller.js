const Comment = require('../models/comment');
const Post=require('../models/post');
const commentMailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const commentEmailerWorker = require('../workers/comment_email_worker');


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
                comment = await comment.populate('user','name email')
                
                // // call maller func to send mail
                //  commentMailer.newComment(comment);
                
                // // call worker
                let job=queue.create('emails',comment).save(function(err){
                    if(err){console.log('error in creating queue');}
                    console.log('job Enqueued ',job.id);
                });

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment:comment
                        },
                        message:'comment created!'
                    })
                }
               
                

                req.flash('success','Comment added');
                res.redirect('/');
            }
    }catch(err){
        req.flash('error',err);
        return;
    }
}

module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id)
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();

            let post=await Post.findByIdAndUpdate(postId,{ $pull:{comments : req.params.id} });

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success','Comment Deleted');
            return res.redirect('back');
        }else{
            req.flash('error','Comment cannot be added');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return
    }
}