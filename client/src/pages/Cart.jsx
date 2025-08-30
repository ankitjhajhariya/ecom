import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();

    // Fetch cart
    const fetchCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(res.data.cart || res.data);
        } catch (err) {
            console.error("Error fetching cart items:", err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        if (cart?.products?.length) {
            const total = cart.products.reduce((sum, item) => {
                const product = item.productId;
                return product && typeof product === "object"
                    ? sum + product.price * item.quantity
                    : sum;
            }, 0);
            setSubtotal(total);
        }
    }, [cart]);

    const updateQuantity = async (itemId, newQty) => {
        if (newQty < 1) return;
        setCart((prev) => ({
            ...prev,
            products: prev.products.map((item) =>
                item.productId._id === itemId
                    ? { ...item, quantity: newQty }
                    : item
            ),
        }));

        const token = localStorage.getItem("token");
        try {
            await axios.put(
                import.meta.env.VITE_API_URL + "/api/cart/update",
                { itemId, quantity: newQty },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCart();
        } catch (err) {
            console.error("Error updating quantity:", err);
            fetchCart();
        }
    };

    const removeItem = async (itemId) => {
        setCart((prev) => ({
            ...prev,
            products: prev.products.filter((item) => item.productId._id !== itemId),
        }));

        const token = localStorage.getItem("token");
        try {
            await axios.delete(import.meta.env.VITE_API_URL + `/api/cart/remove/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCart();
        } catch (err) {
            console.error("Error removing item:", err);
            fetchCart();
        }
    };

    if (!cart || !Array.isArray(cart.products) || cart.products.length === 0) {
        return (
            <div className="max-w-6xl mx-auto mt-20 p-6 h-96">
                <h1 className="text-3xl md:text-4xl text-center text-gray-700 font-bold mb-4">Cart</h1>
                <hr />
                <p className="text-lg text-center mt-5 text-gray-500">Your cart is empty.</p>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10 mt-10">
            <h1 className="text-2xl md:text-3xl text-center font-bold mb-6">Your Cart</h1>

            {/* Desktop Table */}
            <div className="hidden md:block">
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-100 text-gray-700 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left">Product</th>
                            <th className="px-6 py-3 text-left">Quantity</th>
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {cart.products.map((item, index) => {
                            const product = item.productId;
                            if (!product || typeof product !== "object") return null;

                            return (
                                <tr key={item._id || index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <Link to={`/detail/${product._id}`} className="flex items-center gap-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <h2 className="text-md font-semibold">{product.name}</h2>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                onClick={() => updateQuantity(product._id, item.quantity - 1)}
                                            >
                                                −
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                onClick={() => updateQuantity(product._id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                            <button
                                                className="ml-4 text-sm text-red-600 hover:underline"
                                                onClick={() => removeItem(product._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">₹{product.price}</td>
                                    <td className="px-6 py-4 font-semibold">₹{(product.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {cart.products.map((item, index) => {
                    const product = item.productId;
                    if (!product || typeof product !== "object") return null;

                    return (
                        <div key={item._id || index} className="bg-white shadow rounded-lg p-4 flex flex-col gap-3">
                            <div className="flex items-center gap-3 justify-between">
                                <div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold">{product.name}</h2>
                                        <p className="text-gray-600">₹{product.price}</p>
                                    </div>
                                </div>
                                <div className="text-right font-semibold text-gray-900">
                                    Total: ₹{(product.price * item.quantity).toFixed(2)}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 justify-between w-full">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => updateQuantity(product._id, item.quantity - 1)}
                                        >
                                            −
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => updateQuantity(product._id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="ml-4">
                                        <button
                                            className="text-sm text-red-600  hover:underline"
                                            onClick={() => removeItem(product._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                            </div>


                        </div>
                    );
                })}
            </div>

            {/* Cart Totals */}
            <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">Cart Totals</h2>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-gray-700">Subtotal:</span>
                    <span className="text-lg font-bold">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center mb-4">
                    <span className="text-lg text-gray-700">
                        Shipping: <span className="text-green-600 font-semibold">Free</span>
                    </span>
                </div>

                <div className="flex items-center mb-6 text-green-600 font-medium">
                    ✅ All items verified
                </div>

                <div className="flex justify-end">
                    <Link
                        to="/checkout"
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition duration-200"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </section>
    );
}
