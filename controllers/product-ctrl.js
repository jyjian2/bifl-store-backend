const Product = require('../models/product')

createProduct = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a product',
        })
    }

    const product = new Product(body)

    if (!product) {
        return res.status(400).json({ success: false, error: err })
    }

    product
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                onSale: product.onSale,
                brand: product.brand,
                price: product.price,
                message: 'Product created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Product not created!',
            })
        })
}

updateProduct = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Product.findOne({ _id: req.params.id }, (err, product) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Product not found!',
            })
        }
        product.name = body.name
        product.description = body.description
        product.category = body.category
        product.onSale = body.onSale
        product.brand = body.brand
        product.price = body.price
        product
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: product._id,
                    name: product.name,
                    description: product.description,
                    category: product.category,
                    onSale: product.onSale,
                    brand: product.brand,
                    price: product.price,
                    message: 'Product updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Product not updated!',
                })
            })
    })
}

deleteProduct = async (req, res) => {
    await Product.findOneAndDelete({ _id: req.params.id }, (err, product) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!product) {
            return res
                .status(404)
                .json({ success: false, error: `product not found` })
        }

        return res.status(200).json({ success: true, data: product })
    }).catch(err => console.log(err))
}

getProductById = async (req, res) => {
    await Product.findOne({ _id: req.params.id }, (err, product) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!product) {
            return res
                .status(404)
                .json({ success: false, error: `Product not found` })
        }
        return res.status(200).json({ success: true, data: product })
    }).catch(err => console.log(err))
}

getProducts = async (req, res) => {
    await Product.find(req.query, (err, products) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!products.length) {
            return res
                .status(404)
                .json({ success: false, error: `Products not found` })
        }
        return res.status(200).json({ success: true, data: products })
    }).clone().catch(err => console.log(err))
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
}