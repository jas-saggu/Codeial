const express = require('express');
const router = express.Router();

// all route index of diff version to be here
router.use('/v1',require('./v1'));

module.exports=router;