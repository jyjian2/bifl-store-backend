const Brand = require('../models/brand')

createBrand = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a brand',
        })
    }

    const brand = new Brand(body)

    if (!brand) {
        return res.status(400).json({ success: false, error: err })
    }

    brand
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: brand._id,
                name: brand.name,
                description: brand.description,
                message: 'Brand created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Brand not created!',
            })
        })
}

updateBrand = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Brand.findOne({ _id: req.params.id }, (err, brand) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Brand not found!',
            })
        }
        brand.name = body.name
        brand.description = body.description
        brand
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: brand._id,
                    description: brand.description,
                    message: 'Brand updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Brand not updated!',
                })
            })
    })
}

deleteBrand = async (req, res) => {
    await Brand.findOneAndDelete({ _id: req.params.id }, (err, brand) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!brand) {
            return res
                .status(404)
                .json({ success: false, error: `Brand not found` })
        }

        return res.status(200).json({ success: true, data: brand })
    }).catch(err => console.log(err))
}

getBrandById = async (req, res) => {
    await Brand.findOne({ _id: req.params.id }, (err, brand) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!brand) {
            return res
                .status(404)
                .json({ success: false, error: `Brand not found` })
        }
        return res.status(200).json({ success: true, data: brand })
    }).catch(err => console.log(err))
}

getBrands = async (req, res) => {
    await Brand.find({}, (err, brands) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!brands.length) {
            return res
                .status(404)
                .json({ success: false, error: `Brands not found` })
        }
        return res.status(200).json({ success: true, data: brands })
    }).clone().catch(err => console.log(err))
}

module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrands,
    getBrandById,
}