const   Jwt = require('jsonwebtoken')

module.exports =  function generateJWTToken(userId, role, schoolname){
  const accessToken = Jwt.sign({userId, role, schoolname}, 'simul@te.uz-0.0.1', {expiresIn: '30d'})
  return accessToken
}

