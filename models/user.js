const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    friendships:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Friendship'
        }
    ],
    listOfFriends:[
        {
            type:String
        }
    ]
    
},{
    timestamps:true
});

// locally store only the url of avatar in DB
let storage = multer.diskStorage({
    // req, file from the req, cb:callback fnc
    destination: function (req, file, cb) {
        // path where file needs to be stored
        //(__dirname: current path)
        cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
        // req, file from the req, cb:callback fnc
    filename: function (req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now());
    }
});

// static
userSchema.statics.uploadedAvatar= multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;


const User= mongoose.model('User',userSchema);

module.exports=User;