import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [Subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();

    // Fetch cart on mount
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get(import.meta.env.VITE_API_URL + "/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setCart(res.data.cart || res.data);
                console.log("Cart items fetched successfully:", res.data);
            })
            .catch((err) => {
                console.error("Error fetching cart items:", err);
            });
    }, [navigate]);

    // Recalculate subtotal on cart change
    useEffect(() => {
        if (cart && Array.isArray(cart.products)) {
            const total = cart.products.reduce((sum, item) => {
                const product = item.productId;
                if (product && typeof product === "object") {
                    return sum + product.price * item.quantity;
                }
                return sum;
            }, 0);
            setSubtotal(total);
        }
    }, [cart]);

    // Update item quantity
    const updateQuantity = (itemId, newQty) => {
        if (newQty < 1) return;

        const token = localStorage.getItem("token");
        axios
            .put(
                import.meta.env.VITE_API_URL + `/api/cart/update`,
                { itemId, quantity: newQty },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                setCart(res.data.cart || res.data);
            })
            .catch((err) => {
                console.error("Error updating quantity:", err);
            });
    };

    // Remove item
    const removeItem = (itemId) => {
        const token = localStorage.getItem("token");
        console.log("Removing item with ID:", itemId);
        console.log("Using token:", token);

        axios
            .delete(import.meta.env.VITE_API_URL + `/api/cart/remove/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setCart(res.data.cart || res.data);
            })
            .catch((err) => {
                console.error("Error removing item:", err);
            });
    };

    if (!cart || !Array.isArray(cart.products) || cart.products.length === 0) {
        return (
            <div className="max-w-6xl mx-auto mt-20 p-6 h-96">
                <h1 className="text-4xl text-center text-gray-700 font-bold mb-4">Cart</h1>
                <hr />
                <p className="text-lg text-center mt-5 text-gray-500">Your cart is empty.</p>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10 mt-10">
            <h1 className="text-3xl text-center font-bold mb-6">Your Cart</h1>

            <div className="space-y-6 overflow-x-auto">
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
                                        <Link
                                            to={`/detail/${product._id}`}
                                            className="flex items-center gap-4"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <div>
                                                <h2 className="text-md font-semibold">{product.name}</h2>
                                            </div>
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            >
                                                −
                                            </button>
                                            <span className="min-w-[24px] text-center">{item.quantity}</span>
                                            <button
                                                className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                            <button
                                                className="ml-4 px-2 py-1 text-sm text-red-600 hover:underline"
                                                onClick={() => removeItem(item._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-gray-700">₹{product.price}</td>

                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        ₹{(product.price * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Cart Total */}
                <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Cart Totals</h2>

                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium text-gray-700">Subtotal:</span>
                        <span className="text-lg font-bold text-gray-900">
                            ₹{Subtotal.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex items-center mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z"
                            />
                        </svg>
                        <span className="text-lg text-gray-700 font-medium">
                            Shipping: <span className="text-green-600 font-semibold">Free</span>
                        </span>
                    </div>

                    <div className="flex items-center mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-600 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span className="text-green-600 font-medium">All items verified</span>
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
            </div>
        </section>
    );
}
