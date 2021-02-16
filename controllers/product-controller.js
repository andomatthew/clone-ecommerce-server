const { Product } = require('../models/')

class ProductController {

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

    const { name, image_url, price, stocks } = req.body
    let newProduct ={
      name,
      image_url,
      price,
      stocks
    }

    Product.update(newProduct, { where: { "id": req.data.product_id }})
    .then(product => {
      res.status(200).json(product)
    })
    .catch(err => {
      next(err)
    })
  }

  static patch(req, res, next) {
    const { stocks } = req.body

    Product.update({ stocks }, { where: {'id': req.data.product_id }, fields: ['stocks'] })
    .then(product => {
      res.status(200).json(product)
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = ProductController