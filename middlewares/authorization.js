const { User } = require('../models/')


function authorization(req, res, next) {
  const productId = +req.params.id
  const email = req.data.email
  
  Product.findOne({ where: { 'id': productId }})
  .then((product) => {
    if(!product) throw ({ name: 'error product', message: 'product not found' })
    req.data.product = product
    req.data.product_id = productId
    return User.findOne({ where: { 'email': email }}) 
  })
  .then(user => {
    if(!user || (user && user.role !== 'admin')) throw( { name: 'authorization', message: 'Not Authorized' })
    if(user && user.role === 'admin') {
      console.log('lewat authorization')
      next()
    }
  })
  .catch(err => {
    next(err)
  })
}

module.exports = authorization