const fs = require('fs')

var keyReader = function () {
  var tokenObject = {}
  keyArrays = fs.readdirSync('./keys/');
  keyArrays.forEach(function(eachKey){
    var theKey = fs.readFileSync('./keys/'+eachKey,{encoding: 'utf8'});
    tokenObject[eachKey]=theKey
  })
  return tokenObject
}

module.exports = keyReader;
