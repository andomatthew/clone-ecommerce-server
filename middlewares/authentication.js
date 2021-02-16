const { User } = require('../models/')
const jwt = require('jsonwebtoken')

function authentication(req, res, next) {

  try{
    const access_token = req.headers.access_token
    const decoded = jwt.verify(access_token, process.env.SECRET_KEY)

    User.findOne({ where: { "email": decoded.email } })
    .then(user => {
      if(!user) throw({ name: 'authentication', message: 'user not found' })
      req.data = decoded
      next()
    })
    .catch(err => {
      next(err)
    })
  }
  catch(err) {
    next(err)
  }

}

module.exports = authentication