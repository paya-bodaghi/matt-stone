const assert = require('chai').assert;
const utils = require('../app/routes/utils');

describe('utils.js unit test class',() => {

    let apiUserIdResult = utils.getUserId('access1:test1');
    let findUserResult = utils.findUser('wLKa4VzNaQPiPAMY', 'iceFLbLyttvTQAUr4FnDEnLG');//test1
    let generateRandomTokenResult = utils.generateRandomToken('QqTitbH6tzcLrrPx', 'ERbvmnFtPjZNtToHjux7VEdh');//test2
    let groupAnimalsResult = utils.groupAnimals('test1');
    let printNumbersResult = utils.printNumbers();
    // getUserId
    describe('test cases for getUserId()', () =>{
        it('should extract apiUserId from access token',() => {            
            assert.equal(apiUserIdResult,'test1');
        });

        it('return type of apiUserId should be string',() => {            
            assert.isString(apiUserIdResult);
        });
    });

    // findUser()
    describe('test cases for findUser()', () =>{
        it('should find apiUserId in apiUser.json file',() => {            
            assert.equal(findUserResult.id,'test1');
        });

        it('return type of findUserResult should be object',() => {            
            assert.isObject(findUserResult);
        });
    });

    // generateRandomToken
    describe('test cases for generateRandomToken()', () =>{
        it('should generate a random string',() => {            
            assert.isString(generateRandomTokenResult);
        });

        it('should have \':\' as delimiter',() => {            
            assert.include(generateRandomTokenResult,':');
        });

        it('random access token should be of length 12',() => { 
            let accessTokenArr = generateRandomTokenResult.split(':');     
            assert.equal(accessTokenArr[0].length,12);
        });
    });

    // groupAnimals
    describe('test cases for groupAnimals()', () =>{
        it('should group animals from animals.json file',() => {            
            assert.isObject(groupAnimalsResult);
        });

        it('should have properties apiUserId and animals',() => {            
            assert.property(groupAnimalsResult,'apiUserId');
            assert.property(groupAnimalsResult,'animals');
        });
    });

    // printNumbers
    describe('test cases for printNumbers()', () =>{
        it('return type of printNumbers should be array',() => {            
            assert.isArray(printNumbersResult);
        });

        it('printNumbers array size should be 100',() => {            
            assert.equal(printNumbersResult.length,100);
        });

        it('3rd element in array is Hey',() => {            
            assert.equal(printNumbersResult[2],'Hey');
        });

        it('5th element in array is Yo',() => {            
            assert.equal(printNumbersResult[4],'Yo');
        });

        it('15th element in array is HeyYo',() => {            
            assert.equal(printNumbersResult[14],'HeyYo');
        });
    });

});