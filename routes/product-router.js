const express = require('express')

const ProductCtrl = require('../controllers/product-ctrl')

const router = express.Router()

router.put('/products/:id', ProductCtrl.updateProduct)
router.delete('/products/:id', ProductCtrl.deleteProduct)
router.get('/products/:id', ProductCtrl.getProductById)


router.post('/products', ProductCtrl.createProduct)
router.get('/products', ProductCtrl.getProducts)

module.exports = router