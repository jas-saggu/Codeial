const express = require('express');
const router = express.Router();
const friends_controller=require('../controllers/friends_controller');


router.get('/toggle',friends_controller.toggleFriendship);

module.exports=router;