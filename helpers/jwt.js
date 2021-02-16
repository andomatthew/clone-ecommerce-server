const jwt = require('jsonwebtoken')

function getToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY)
  return token
}



module.exports = getToken