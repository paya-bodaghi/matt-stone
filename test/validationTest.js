const assert = require('chai').assert;
const validation = require('../app/routes/validation');
const constants = require('../app/resources/messages');

/**
 * @author Priyadarshan
 * @description test class for validation
 */

describe('validation.js unit test class', ()=>{

    
    // validateTokenRequest()
    describe('test cases for validateTokenRequest() ',()=>{
        
        let validateTokenRequestResult1 = validation.validateTokenRequest();
        it('should return error object with code 400 and msg clientId or secretKey is missing',()=>{
            assert.equal(validateTokenRequestResult1.errorCode, 400);
            assert.equal(validateTokenRequestResult1.errorMsg, constants.CLIENTID_MISSING);
        });

        let validateTokenRequestResult2 = validation.validateTokenRequest('test1','');
        it('should return error object with code 400 and msg clientId or secretKey is empty',()=>{
            assert.equal(validateTokenRequestResult2.errorCode, 400);
            assert.equal(validateTokenRequestResult2.errorMsg, constants.CLIENTID_BLANK);
        });

        let validateTokenRequestResult3 = validation.validateTokenRequest('te','se');
        it('should return error object with code 400 and msg clientId or secretKey must be minimum 3 characters and maximum 30 characters',()=>{
            assert.equal(validateTokenRequestResult3.errorCode, 411);
            assert.equal(validateTokenRequestResult3.errorMsg, constants.CLIENTID_LEN);
        });

        let validateTokenRequestResult4 = validation.validateTokenRequest('test1','secret1');
        it('should return error object with code 400 and msg user does not exist',()=>{
            assert.equal(validateTokenRequestResult4.errorCode, 400);
            assert.equal(validateTokenRequestResult4.errorMsg, constants.USER_CREDENTIALS_INVALID);
        });
    });
});