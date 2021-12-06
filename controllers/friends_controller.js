const Friendship=require('../models/friendship');
const User=require('../models/user');


module.exports.toggleFriendship=async function(req,res){

    try{
        
        console.log('#####');
        let deleted=false;

        let f_user= await User.findById(req.query.from_id).populate('friendships');
        let t_user=await User.findById(req.query.to_id).populate('friendships');

        let checkFriends= await Friendship.findOne({
            from_user:req.query.from_id,
            to_user:req.query.to_id
        });

        if(checkFriends){
           
            f_user.friendships.pull(checkFriends._id);
            t_user.friendships.pull(checkFriends._id);

            f_user.listOfFriends.pull(t_user.name);
            t_user.listOfFriends.pull(f_user.name);

            f_user.save();
            t_user.save();

            checkFriends.remove();
            deleted=true;

            req.flash('success',`${t_user.name } removed from friends`)

        }else{
            let newFriend=await Friendship.create({
                from_user:req.query.from_id,
                to_user:req.query.to_id
            });

            f_user.friendships.push(newFriend._id);
            t_user.friendships.push(newFriend._id);
            f_user.listOfFriends.push(t_user.name);
            t_user.listOfFriends.push(f_user.name);
            f_user.save();
            t_user.save();

            req.flash('success',`${t_user.name } added to friends`)

        }
        return res.redirect('back');



    }catch(err){
        console.log(err);
        return res.redirect('back');
    }

};
