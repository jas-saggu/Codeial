// to pass flash messages to ejs/html
module.exports.setFlash=function(req,res,next){
    //res.locals / locals is used in views(we access locals in templates)
    res.locals.flash={
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    // so that it moves to next func which needs to be executed
    next();
}