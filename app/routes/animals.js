'use strict';

/**
 * @author Priyadarshan
 * @description API to get group of animals for authenticated user
 */

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const validation = require('./validation');
const cache = require('./cache-manager');
const utils = require('./utils');

router.use((req,res,next) => {

  // Get the access token from request header 'access-token'
  const accessToken = req.header('access-token');
  console.log('accessToken: '+accessToken);  
  
  // validate the access token
  const validationResult = validation.validateAccessToken(accessToken);
  console.log('validation result: '+ JSON.stringify(validationResult));

  // if validation returns invalid then return error code and error msg to user
  if(!validationResult.errorCode==0){
    //return next(createError(validationResult.errorCode, validationResult.errorMsg));
    res.status(validationResult.errorCode).json({'errorMsg':validationResult.errorMsg});
    return false;
  }

  // set the access token in request
  req.accessToken = accessToken;
  next();

});

router.use((req,res,next) => {
  const accessToken = req.accessToken;
  const apiUserId = utils.getUserId(accessToken);
  req.apiUserId = apiUserId;
  next();
});

/* Get group of animals */
router.get('/', (req,res,next) => {
 
  const apiUserId = req.apiUserId;
  const result = utils.groupAnimals(apiUserId);
  
  // send the response
  res.status(200).json(result);
 
});

module.exports = router;
