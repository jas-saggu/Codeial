const Post=require('../models/post');
const Comment=require('../models/comment')

module.exports.create=function(req,res){
    Post.create({
        content:req.body .content,
        user: req.user._id
    },function(err,post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}

module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){
        // post.user is the id of the user who created that post(string)
        // req.user.id has the id of user who is trying to delete
        // .id & id is different as id returns a string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
};