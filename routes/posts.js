const express=require('express');
const router= express.Router();
const passport=require('passport');

const postController=require('../controllers/posts_controller');

// user can only make a post if user is signed in
router.post('/create',passport.checkAuthentication,postController.create);

module.exports=router;