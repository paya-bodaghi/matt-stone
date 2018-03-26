'use strict';
const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const app = express();

const validation = require('./validation');
const cryptoRandomString = require('crypto-random-string');
const cache = require('./cache-manager');
const utils = require('./utils');

router.use((req, res, next) => {

  const clientId = req.body.clientId;
  const secretKey = req.body.secretKey;
  //console.log('clientId: '+clientId+'  '+'secretKey: '+secretKey);

  const validationResult = validation.validateTokenRequest(clientId, secretKey);
  console.log('validation result: ' + JSON.stringify(validationResult));

  if (!validationResult.errorCode == 0) {
    //return next(createError(validationResult.errorCode, validationResult.errorMsg));
    res.status(validationResult.errorCode).json({ 'errorMsg': validationResult.errorMsg });
    return false;
  }

  req.clientId = clientId;
  req.secretKey = secretKey;
  next();

});

/* Authenticate user */
router.post('/', (req, res, next) => {


  const clientId = req.clientId;
  const secretKey = req.secretKey;

  // generate a token
  const accessToken = utils.generateRandomToken(clientId, secretKey);

  // save the token in cache
  cache.setToken(accessToken, clientId);

  // print the current keys
  cache.getKeys();

  // send the response
  res.status(200).json({ 'accessToken': accessToken });

});

module.exports = router;
