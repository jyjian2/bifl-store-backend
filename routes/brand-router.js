const express = require('express')

const BrandCtrl = require('../controllers/brand-ctrl')

const router = express.Router()

router.post('/brand', BrandCtrl.createBrand)
router.put('/brand/:id', BrandCtrl.updateBrand)
router.delete('/brand/:id', BrandCtrl.deleteBrand)
router.get('/brand/:id', BrandCtrl.getBrandById)
router.get('/brands', BrandCtrl.getBrands)

module.exports = router