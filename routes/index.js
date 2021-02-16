const router = require('express').Router()
const ProductController = require('../controllers/product-controller')
const UserController = require('../controllers/user-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/users/login', UserController.login)

router.use(authentication)
router.get('/products', ProductController.getAllProducts)

router.use('/products/:id', authorization)
router.post('/products', ProductController.create)
router.put('/products/:id', ProductController.put)
router.patch('/products/:id', ProductController.patch )
router.delete('/products/:id', ProductController.delete)

module.exports = router