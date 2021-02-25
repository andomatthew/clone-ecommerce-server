const router = require('express').Router()
const ProductController = require('../controllers/product-controller')
const UserController = require('../controllers/user-controller')
const CartController = require('../controllers/cart-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const authenticationCustomer = require('../middlewares/authenticationCustomer')

router.post('/users/login', UserController.login)
router.post('/users/register', UserController.register)
router.get('/customers', ProductController.getAllProducts)

router.use(authentication)
router.get('/products', ProductController.getAllProducts)

router.get('/carts',authenticationCustomer, CartController.showCart)
router.post('/carts', authenticationCustomer, CartController.addToCart)
router.patch('/carts', authenticationCustomer, CartController.updateCart)
router.delete('/carts', authenticationCustomer, CartController.removeCart)

router.use('/products/:id', authorization)
router.post('/products', ProductController.create)
router.put('/products/:id', ProductController.put)
router.patch('/products/:id', ProductController.patch )
router.delete('/products/:id', ProductController.delete)

module.exports = router