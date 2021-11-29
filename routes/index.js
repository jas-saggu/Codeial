const express = require('express');
const router = express.Router();
const homeController=require('../controllers/home_controller');


console.log(`router`);

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

//route index for all api

router.use('/api',require('./api'));

module.exports=router;