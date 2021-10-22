module.exports.home=function(req,res){
    return res.end('<h1>Codeial</h1>');
};  

module.exports.profile=function(req,res){
    return res.end('<p> Profile page </p>');
};