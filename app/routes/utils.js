'use strict';

/**
 * @author Priyadarshan
 * @description utils helper class
 */

const cryptoRandomString = require('crypto-random-string');
const apiUsers = require('../resources/apiUsers.json');
const animalsJson = require('../resources/animals.json');

function generateRandomToken(clientId, secretKey) {

    console.log('generateRandomToken - entry');
    let accessToken = '';

    const result = findUser(clientId, secretKey);

    console.log('result: ' + JSON.stringify(result));

    if (result !== undefined) {
        accessToken = cryptoRandomString(12) + ':' + result.id;
    }

    console.log('generateRandomToken - exit');
    return accessToken;
}

function findUser(clientId, secretKey) {
    return apiUsers.find(user => (user.apiClientId === clientId && user.apiSecretKey === secretKey));
}

function getUserId(accessToken) {
    console.log('getUserId - entry');
    let str = accessToken.split(':');
    console.log('getUserId - exit');
    return str[1];
}

function groupAnimals(apiUserId) {

    console.log('groupAnimals - entry');

    const result = animalsJson.filter(user => user.apiUserId === apiUserId);
    console.log(JSON.stringify(result));
    const animals = [];

    result.forEach(user => {
        if (!animals.includes(user.type)) {
            animals.push(user.type);
        }
    });

    let owners = [];
    /*for (let animal of animals) {
        let owner = {
            'type': '',
            'names': []
        };
        result.forEach(user => {
            if (user.type === animal) {
                owner.type = animal;
                owner.names.push(user.name);
            }
        });
        owners.push(owner);
    }*/

    for (let animal of animals) {
        let owner = {
            'type': '',
            'names': []
        };
        owner.type = animal;
        result.reduce((groups, user) => {
            if(user.type===animal){
                owner.names.push(user.name);
            }    
        },{});
        owners.push(owner);
    }

    const groupOwnersByAnimals = {
        'apiUserId': apiUserId,
        'animals': owners
    }

    console.log('groupAnimals - exit');
    return groupOwnersByAnimals;

}

function printNumbers(){
    console.log('printNumbers() - entry');
    let numList = [...Array(100).keys()].map(key => ++key);
    const NUM_3 = 'Hey';
    const NUM_5 = 'Yo';
    const NUM_3_5 = 'HeyYo';

    let result = numList.map(num => {
        const index = numList.indexOf(num);
        num = (num%3===0 && num%5===0) ? NUM_3_5 : (num%5==0) ? NUM_5 : (num%3===0) ? NUM_3 : num;
        numList[index] = num;
        return num ;
    });

    /*for(let n of result){
        console.log(n);
    }*/
    console.log('printNumbers() - exit');
    return result;
}

module.exports.generateRandomToken = generateRandomToken;
module.exports.getUserId = getUserId;
module.exports.groupAnimals = groupAnimals;
module.exports.findUser = findUser;
module.exports.printNumbers = printNumbers;