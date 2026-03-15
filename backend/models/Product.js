const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    category: { type: String, required: true },
    image: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    isNewProduct: { type: Boolean, default: false },
    discount: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
