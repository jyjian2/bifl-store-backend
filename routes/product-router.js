const express = require('express')

const ProductCtrl = require('../controllers/product-ctrl')

const router = express.Router()

router.post('/products', ProductCtrl.createProduct)
router.put('/products/:id', ProductCtrl.updateProduct)
router.delete('/products/:id', ProductCtrl.deleteProduct)
router.get('/products/:id', ProductCtrl.getProductById)
router.get('/products', ProductCtrl.getProducts)
router.get('/products/:category', getProductByCategory)

module.exports = router