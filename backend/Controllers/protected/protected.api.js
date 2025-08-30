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
    const { productId } = req.params; // DELETE /api/cart/remove/:productId
    const userId = req.user.id;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Before removal count
        const initialLength = cart.products.length;

        // Remove product safely (ObjectId or string)
        cart.products = cart.products.filter(
            (p) => p.productId.toString() !== productId.toString()
        );

        if (cart.products.length === initialLength) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            cart,
        });
    } catch (err) {
        console.error("Error removing from cart:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to remove product from cart",
            error: err.message,
        });
    }
};

const quantity = async (req, res) => {
    const { itemId, quantity } = req.body;
    const userId = req.user.id;

    const parsedQty = parseInt(quantity, 10);
    if (!itemId || !parsedQty || parsedQty < 1) {
        return res.status(400).json({ message: 'Valid item ID and quantity are required' });
    }

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.products.findIndex(
            (p) => p.productId.toString() === itemId
        );
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cart.products[itemIndex].quantity = parsedQty;
        await cart.save();

        // optionally populate product details before sending
        await cart.populate("products.productId");

        return res.status(200).json({
            message: 'Quantity updated successfully',
            cart,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Failed to update quantity',
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
    removeFromCart,
    quantity,
};