const { Product } = require('../models/')

class ProductController {

  static getAllProducts(req, res, next) {

    Product.findAll({
      order: ['id']
    })
    .then(products => {
      res.status(200).json(products)
    })
    .catch(err => {
      next(err)
    })
  }

  static create(req, res, next) {
    const { name, image_url, price, stocks } = req.body
    let newProduct = { name, image_url, price, stocks }
    console.log(newProduct)

    Product.create(newProduct)
    .then(product => {
      let objProduct = {
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        stocks: product.stocks
      }
      res.status(201).json(objProduct)
    })
    .catch(err => {
      next(err)
    })
  }

  static put(req, res, next) {

    const productId = req.params.id

    const { name, image_url, price, stocks } = req.body

    let newProduct ={
      name,
      image_url,
      price,
      stocks
    }

    Product.update(newProduct, { where: { "id": productId }, returning: true })
    .then(product => {
      res.status(200).json(product)
    })
    .catch(err => {
      next(err)
    })
  }

  static patch(req, res, next) {
    const { stocks } = req.body
    const productId = req.params.id

    Product.update({ stocks }, { where: {'id': productId }, fields: ['stocks'], returning: true })
    .then(product => {
      res.status(200).json(product)
    })
    .catch(err => {
      next(err)
    })
  }

  static delete(req, res, next) {
    
    Product.destroy({ where: { 'id': req.data.product_id } })
    .then(() => {
      res.status(200).json({ message: `sucessfully delete product with id ${req.data.product_id}`})
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = ProductController