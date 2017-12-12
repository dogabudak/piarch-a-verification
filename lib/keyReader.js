const fs = require('fs'),
keyfile = require('../resources/config.js').keyLocation;


var keyReader = function () {
  var tokenObject = {}
  keyArrays = fs.readdirSync('./keys/');
  keyArrays.forEach(function(eachKey){
    var theKey = fs.readFileSync(keyfile+eachKey,{encoding: 'utf8'});
    tokenObject[eachKey]=theKey
  })
  return tokenObject
}

module.exports = keyReader;
