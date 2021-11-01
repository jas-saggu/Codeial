const express = require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assets'));

// use express layouts(declare it before routes)
app.use(expressLayouts);

// extract styles and scripts from subpages to layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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