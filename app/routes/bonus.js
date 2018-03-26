'use strict'

const express = require('express');
const router = express.Router();
const utils = require('./utils');

router.get('/',(req,res)=>{
   const result = utils.printNumbers();
   res.status(200).json(result);
});


module.exports = router;