const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const validation = require('./validation');
const cache = require('./cache-manager');
const utils = require('./utils');

router.use((req,res,next) => {

  const accessToken = req.header('access-token');
  console.log(accessToken);  
  
  const validationResult = validation.validateAccessToken(accessToken);
  console.log('validation result: '+ JSON.stringify(validationResult));

  if(!validationResult.errorCode==0){
    //return next(createError(validationResult.errorCode, validationResult.errorMsg));
    res.status(validationResult.errorCode).json({'errorMsg':validationResult.errorMsg});
    return false;
  }

  req.accessToken = accessToken;
  next();

});

router.use((req,res,next) => {
  const accessToken = req.accessToken;
  const apiUserId = utils.getUserId(accessToken);
  req.apiUserId = apiUserId;
  next();
});


router.get('/', (req,res,next) => {
 
  const apiUserId = req.apiUserId;
  const result = utils.groupAnimals(apiUserId);
  
  // send the response
  res.status(200).json(result);
 
});

module.exports = router;
