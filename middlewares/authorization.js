const { User } = require('../models/')


function authorization(req, res, next) {
  console.log('masuk authorization=============')

  const email = req.data.email
  
  User.findOne({ where: { 'email': email }}) 
  .then(user => {
    if(!user || (user && user.role !== 'admin')) throw( { name: 'authorization', message: 'Not Authorized' })
    console.log('lewat authorization======')
    req.data.product_id = +req.params.id
    next()
  })
  .catch(err => {
    next(err)
  })
}

module.exports = authorization