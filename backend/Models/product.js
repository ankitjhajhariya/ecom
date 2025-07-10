// backend/models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    des: { type: String, unique: true, required: true, trim: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);
