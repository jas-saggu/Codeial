module.exports.profile=function(req,res){
   return res.render('userpage',{
        title:'page'
   });
};

module.exports.messages=function(req,res){
    return res.end('<h1>Messages</h1>');
}