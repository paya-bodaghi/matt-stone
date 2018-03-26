'use strict'

const validator = require('validator');
const cache = require('./cache-manager');
const utils = require('./utils');
const constants = require('../resources/messages');

function validateTokenRequest(clientId, secretKey) {

    console.log('validateTokenRequest - entry');

    var err = {
        errorCode: 0,
        errorMsg: ''
    };

    var options = {
        min: 3,
        max: 30
    }

    if (clientId === undefined || secretKey === undefined) {
        err.errorCode = 400;
        err.errorMsg = constants.CLIENTID_MISSING;
    }

    else if (validator.isEmpty(clientId) || validator.isEmpty(secretKey)) {
        err.errorCode = 400;
        err.errorMsg = constants.CLIENTID_BLANK;
    }

    else if (!validator.isLength(clientId, options) || !validator.isLength(secretKey, options)) {
        err.errorCode = 411;
        err.errorMsg = constants.CLIENTID_LEN;
    }
     
    else if(utils.findUser(clientId,secretKey)===undefined) {
        err.errorCode = 400;
        err.errorMsg = constants.USER_CREDENTIALS_INVALID;
    }

    console.log('validateTokenRequest - exit');

    return err;

}

function validateAccessToken(accessToken) {

    console.log('validateAccessToken - entry');
    console.log('accessToken: '+accessToken);

    var err = {
        errorCode: 0,
        errorMsg: ''
    };

    if (accessToken === undefined) {
        err.errorCode = 400;
        err.errorMsg = constants.ACCESS_TOKEN_MISSING;
    }

    else if (validator.isEmpty(accessToken)) {
        err.errorCode = 400;
        err.errorMsg = constants.ACCESS_TOKEN_BLANK
    }

    else{
        // print the current keys
        cache.getKeys();
        cache.getStats();
    
        const cacheEntry = cache.getToken(accessToken);
        console.log(JSON.stringify(cacheEntry));     

        if (cacheEntry === undefined || validator.isEmpty(cacheEntry)) {
            err.errorCode = 400;
            err.errorMsg = constants.ACCESS_TOKEN_INVALID;
        }
    }  

    console.log('validateAccessToken - exit');
    return err;
}

module.exports.validateTokenRequest = validateTokenRequest;
module.exports.validateAccessToken = validateAccessToken;