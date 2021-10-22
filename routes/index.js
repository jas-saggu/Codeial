const express = require('express');
const router = express.Router();
const homeController=require('../controllers/home_controller');


console.log(`router`);

router.get('/',homeController.home);
router.get('/welcome',homeController.welcome);

router.use('/user',require('./users'));
router.use('/about',require('./about'));

module.exports=router;