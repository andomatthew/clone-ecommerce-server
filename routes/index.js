const router = require('express').Router()
const ProductController = require('../controllers/product-controller')
const UserController = require('../controllers/user-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/users/login', UserController.login)

router.use(authentication)
router.post('/products', ProductController.create)
router.get('/products', )

router.use('/:id', authorization)
router.put('/products/:id', ProductController.put)
router.patch('/products/:id', )
router.delete('/products/:id')

module.exports = router