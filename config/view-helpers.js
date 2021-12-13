const env=require('./environment');
const fs=require('fs');
const path=require('path');

module.exports=(app)=>{
    app.locals.assetPath=function(filePath){
        if(env.name=='development'){
            return filePath;
        }
        ///public/assets/rev-manifest.json-> has key value pairs of actual css and js href to new ones
        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
    }
};