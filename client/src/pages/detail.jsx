import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDes from "../components/productdes";

export default function Detail() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + `/api/product/${id}`)
            .then((res) => {
                setProduct(res.data.product);
            })
            .catch((err) => {
                console.error("Error fetching product details:", err);
            });
    }, [id]);

    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to add items to the cart.");
            return;
        }

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/cart/add`,
                {
                    productId: product._id,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log("Added to cart:", res.data);
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    };

    if (!product) {
        return (
            <div className="max-w-6xl mx-auto mt-20 p-6">
                <p className="text-lg text-gray-500">Loading product details...</p>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-10 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                {/* Product Image */}
                <div className="w-full aspect-square overflow-hidden rounded-xl shadow-lg">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {product.name}
                    </h1>
                    <p className="text-base md:text-lg text-gray-500">{product.category}</p>
                    <p className="text-gray-700 leading-relaxed">{product.des}</p>

                    <div className="flex items-center gap-4">
                        <span className="text-2xl md:text-3xl font-bold text-blue-600">
                            ₹{product.price}
                        </span>
                        {product.oldPrice && (
                            <span className="line-through text-gray-400">₹{product.oldPrice}</span>
                        )}
                    </div>

                    <button
                        className="w-full sm:w-fit px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>

                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className="w-6 h-6 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.561-.954L10 0l2.952 5.956 6.561.954-4.757 4.635 1.122 6.545z" />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-12">
                <ProductDes />
            </div>
        </section>
    );
}
