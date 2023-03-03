const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
    {
        name: { type: String, required: true },
        description: {type: String, required: true},
        category: {type: String, required: true},
        brand: {type: String, required: true},
        price: {type: Number, require: true},
        onSale: {type: Boolean, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('products', Product)