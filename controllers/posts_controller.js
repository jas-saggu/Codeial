const Post=require('../models/post');
const Comment=require('../models/comment')

module.exports.create=async function(req,res){

    try{
        await Post.create({
            content:req.body .content,
            user: req.user._id
        });
        
        return res.redirect('back');

    }catch(err){
        console.log('error ',err);
    }
}

module.exports.destroy=async function(req,res){

    try{
       let post=await Post.findById(req.params.id);
        // post.user is the id of the user who created that post(string)
        // req.user.id has the id of user who is trying to delete
        // .id & id is different as id returns a string
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id})
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }

    }catch(err){
        console.log('error ',err);

    }

};