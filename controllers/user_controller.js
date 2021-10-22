module.exports.profile=function(req,res){
    return res.end('<p> Profile </p>');
};

module.exports.messages=function(req,res){
    return res.end('<h1>Messages</h1>');
}