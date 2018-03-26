'use strict';

const NodeCache = require( "node-cache" );

const tokenCache = new NodeCache();

const ttl = 60;

function setToken(key,value){

    return tokenCache.set(key,value,60);

}

function getToken(key){
    return tokenCache.get(key);
}

function getStats(){
    console.log(tokenCache.getStats());
}

function getKeys(){
    console.log(tokenCache.keys());
}

module.exports.setToken = setToken;
module.exports.getToken = getToken;
module.exports.getKeys = getKeys;
module.exports.getStats = getStats;