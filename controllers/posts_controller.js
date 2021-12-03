const Post=require('../models/post');
const Comment=require('../models/comment')
const Like=require('../models/like')


module.exports.create=async function(req,res){

    try{
      let post=  await Post.create({
            content:req.body .content,
            user: req.user._id
        });
        
        //data coming from ajax is in XMLreq form
        if(req.xhr){
            post = await post.populate('user');
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'Post created!'
            })
        }

        req.flash('success','Post Published');
        return res.redirect('back');

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}

module.exports.destroy=async function(req,res){

    try{
       let post=await Post.findById(req.params.id);
        // post.user is the id of the user who created that post(string)
        // req.user.id has the id of user who is trying to delete
        // .id & id is different as id returns a string
        if(post.user == req.user.id){

            // deleted the associated likes for post and all its comments like too
            await Like.deleteMany({likeable: post,onModel:'Post'});
            // _id will have id of all comments of this post , $in will return array of values of comments of this post
            await Like.deleteMany({_id:{$in: post.comments}});


            post.remove();
            await Comment.deleteMany({post: req.params.id})

             //data coming from ajax is in XMLreq form
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'post deleted'
                });
            }

            req.flash('success','Post and associated comments deleted');
            return res.redirect('back');
        }else{
            req.flash('error','You cannot delete this post');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }

};