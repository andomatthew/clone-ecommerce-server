const { User, Product } = require('../models/')
const jwt = require('jsonwebtoken')

function authenticationCustomer(req, res, next) {
  console.log('masuk authentication customer')
  console.log(req.headers.access_token)
  try{
    // const productId = req.body.productId
    const access_token = req.headers.access_token
    const decoded = jwt.verify(access_token, process.env.SECRET_KEY)
    User.findOne({ where: { "email": decoded.email } })
    .then(user => {
      if(!user) throw({ name: 'authentication', message: 'user not found' })
      if(user.role !== 'customer') throw({ name:'authentication', messgae: 'Not Authenticate' })
      // return Product.findOne({ where: { 'id': productId }  })
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

module.exports = authenticationCustomer