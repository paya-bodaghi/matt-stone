'use strict';

/**
 * @author Priyadarshan
 * @description a simple node-cache API
 */

const NodeCache = require( "node-cache" );

const tokenCache = new NodeCache();

// Set ttl as 60 seconds or 1 min
const ttl = 60;

function setToken(key,value){
    return tokenCache.set(key,value,ttl);
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