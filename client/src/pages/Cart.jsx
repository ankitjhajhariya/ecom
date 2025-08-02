import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

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
                setCart(res.data.cart || res.data); // support both { cart } and direct object
                console.log("Cart items fetched successfully:", res.data);
            })
            .catch((err) => {
                console.error("Error fetching cart items:", err);
            });
    }, [navigate]);

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

                            // 🔒 Skip if product is not populated
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
                                    <td className="px-6 py-4 font-medium">x{item.quantity}</td>
                                    <td className="px-6 py-4 text-gray-700">₹{product.price}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        ₹{product?.price && item?.quantity ? (product.price * item.quantity).toFixed(2) : "0.00"}
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </section>

    );
}
