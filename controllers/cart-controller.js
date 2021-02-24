const { Cart, Product } = require('../models/')

class CartController {
  
  static addToCart(req, res, next) {
    let { quantity, productId } = req.body
    const newCart =  {
      productId,
      userId: req.params.id,
      quantity
    }
    Cart.findOne({
      where: { 'userId': req.params.id, 'productId': productId },
      include: Product
    })
    .then(cart => {
      if(!cart) {
        Cart.create(newCart)
        .then(cart => {
          console.log('masuk add')
          res.status(201).json(cart)
          .catch(err => {
            next(err)
          })
        })
      }
      else {
        const newQuantity = cart.quantity + 1
        if(newQuantity > cart.Product.stocks ) throw { name: 'Over Quantity', message: 'Out of stock' }
        Cart.update({
          quantity: newQuantity 
        }, {
          where: { 'userId': req.params.id, 'productId': productId }
        })
        .then(cart => {
          res.status(200).json(cart)
        })
        .catch(err => {
          next(err)
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static showCart(req, res, next) {
    Cart.findAll({ 
      where: { 'userId': req.params.id },
      include: Product
    })
    .then(carts => {
      res.status(200).json(carts)
    })
    .catch(err => {
      next(err)
    })
  }

  static removeCart(req, res, next) {
    
    const { productId, userId } = req.body
    
    Cart.findOne({
      where: { productId, userId }
    })
    .then(cart => {
      if(!cart) throw({ name: 'not found', message: 'error not found' })
      return Cart.destroy({
        where: { productId, userId }
      })
    })
    .then(_ => {
      res.status(200).json({ message: 'item successfuly deleted' })
    })
    .catch(err => {
      next(err)
    })
  }

  static updateCart(req, res, next) {
  
    const { quantity, productId } = req.body
    Cart.findOne({
      where: { 'userId': req.params.id, 'productId': productId },
      include: Product
    })
    .then(cart => {
      if( quantity > cart.Product.stocks ) throw { name: 'Over Quantity', message: 'Out of stock' }
      Cart.update({
        quantity 
      }, {
        where: { 'userId': req.params.id, 'productId': productId },
        returning: true
      })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(err => {
        next(err)
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CartController