module.exports.home=function(req,res){
    return res.render('home',{
       title:"home" 
    });
};  

module.exports.welcome=function(req,res){
    return res.end('<h1>Welcome Page</h1>');
}