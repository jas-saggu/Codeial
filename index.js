const express = require('express');
const app=express();
const port=8000;

// use express router
app.use('/',require('./routes'));

//set viewengine as ejs
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err)
    {
        console.log(`Error on running port : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});