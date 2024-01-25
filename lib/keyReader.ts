import * as fs from 'node:fs'

export const keyReader =  () => {
  const tokenObject = {}
  const keyArrays = fs.readdirSync('./keys/');
  keyArrays.forEach(function(eachKey){
    tokenObject[eachKey]=fs.readFileSync('./keys/' + eachKey, {encoding: 'utf8'})
  })
  return tokenObject
}
