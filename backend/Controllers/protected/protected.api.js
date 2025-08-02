const Product = require('../../Models/product');
const Cart = require('../../Models/cart')

const protected = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ products }); // ✅ CORRECT KEY: 'products'
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products', error: err.message });
    }
};

const detail = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ product });
    } catch (err) {
        return res.status(500).json({
            message: 'Failed to fetch product details',
            error: err.message,
        });
    }
};

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        // Validate product existence
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                products: [{ productId, quantity }]
            });
        } else {
            const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.products[itemIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart" });
    } catch (err) {
        res.status(500).json({ message: "Failed to add to cart", error: err.message });
    }
};

const removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.products = cart.products.filter(
            (p) => p.productId.toString() !== productId
        );
        await cart.save();
        return res.status(200).json({ message: 'Product removed from cart successfully' });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Failed to remove product from cart',
            error: err.message,
        });
    }

};

const cart = async (req, res) => {
    try {
        const userId = req.user.id;

        // ✅ Populate product details inside cart's product array
        const userCart = await Cart.findOne({ userId }).populate('products.productId');

        if (!userCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json({ cart: userCart }); // 👈 Return with key "cart"
    } catch (err) {
        return res.status(500).json({
            message: 'Failed to fetch cart items',
            error: err.message,
        });
    }
};



module.exports = {
    protected,
    detail,
    cart,
    removeFromCart,
    addToCart,
};