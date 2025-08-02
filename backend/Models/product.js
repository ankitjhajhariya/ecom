// backend/models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Men", "Women", "Accessories"], // Optional: limit to known categories
    },
    oldPrice: {
        type: String, // You can store it as String if it includes $ and .00
        required: false,
    },
    price: {
        type: String, // Same here. Or change to Number if you store clean numeric prices.
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    onSale: {
        type: Boolean,
        default: false,
    },
    colors: {
        type: [String], // Array of strings
        default: [],
    },
}, {
    timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Product', productSchema);
