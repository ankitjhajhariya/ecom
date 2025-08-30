import React, { useEffect } from "react";
import { Globe, BadgePercent, Lock, Shirt } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Root() {
    const [products, setProducts] = React.useState([]);
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/api/product")
            .then((res) => {
                console.log("Products data fetched successfully:", res.data);
                setProducts(res.data.products);
            })
            .catch((err) => {
                console.error("Error fetching protected data:", err);
            }

            );
    }, []);

    const cards = [
        {
            title: "20% Off On Tank Tops",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
            button: "SHOP NOW",
            image: "https://m.media-amazon.com/images/I/911EAPM8voL._UY1100_.jpg",
        },
        {
            title: "Latest Eyewear For You",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
            button: "SHOP NOW",
            image: "https://royalson.in/wp-content/uploads/2023/09/CHI00164-C1-Amazon-1-300x300.jpg",
        },
        {
            title: "Let's Lorem Suit Up!",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
            button: "CHECK OUT",
            image: "https://gracefulworks.com/wp-content/uploads/2020/09/footwear-free-img.jpg",
        },
    ];

    const features = [
        { icon: <Globe size={48} />, title: "Worldwide Shipping", description: "Enjoy secure, fast, and reliable delivery to your doorstep, anywhere in the world." },
        { icon: <Shirt size={48} />, title: "Best Quality", description: "Shop premium products carefully selected for top quality and durability." },
        { icon: <BadgePercent size={48} />, title: "Best Offers", description: "Get exclusive deals, discounts, and special offers every season." },
        { icon: <Lock size={48} />, title: "Secure Payments", description: "Enjoy safe and encrypted payments with trusted payment gateways." },
    ];

    return (
        <div>
            {/* Hero Section */}
            <div className="min-h-screen bg-cover bg-center flex items-center" style={{ backgroundImage: "url('/hero.jpg')" }}>
                <div className="w-full max-w-7xl mx-auto px-4">
                    <div className="max-w-3xl text-center md:text-left">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Raining Offers For Hot Summer!</h2>
                        <p className="text-xl md:text-2xl text-white mb-8">25% Off On All Products</p>
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-center md:items-start">
                            <button className="bg-white text-black text-lg px-6 py-3 rounded hover:bg-black hover:text-white transition">SHOP NOW</button>
                            <button className="text-lg text-white border-2 border-white px-6 py-3 rounded hover:bg-white hover:text-black transition">FIND MORE</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cards Section */}
            <section className="max-w-7xl mx-auto mt-10 py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="relative h-[60vh] flex items-end p-6 bg-cover bg-center rounded-lg overflow-hidden"
                        style={{ backgroundImage: `url(${card.image})` }}
                    >
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="relative z-10 text-white">
                            <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                            <p className="mb-4">{card.description}</p>
                            <button className="bg-white text-black px-6 py-2 font-semibold hover:bg-gray-200 transition">{card.button}</button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Products Section */}
            <section className="max-w-7xl mx-auto py-12 px-4">
                <h2 className="text-4xl font-bold text-center mb-2">Featured Products</h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-10"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {products.map((product, index) => (
                        <Link to={`/detail/${product._id}`}>
                            <div key={index} className="group relative" >
                                <div className="overflow-hidden rounded-md shadow hover:shadow-lg transition">
                                    <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
                                    {product.onSale && (
                                        <span className="absolute top-4 left-4 bg-white text-xs px-2 py-1 rounded-full shadow">Sale!</span>
                                    )}
                                </div>
                                <h3 className="mt-4 font-semibold">{product.name}</h3>
                                <p className="text-gray-500 text-sm">{product.category}</p>
                                {product.oldPrice ? (
                                    <p className="mt-1">
                                        <span className="line-through text-gray-500 mr-2">{product.oldPrice}</span>
                                        <span className="text-black font-bold">{product.price}</span>
                                    </p>
                                ) : (
                                    <p className="mt-1 text-black font-bold">{product.price}</p>
                                )}
                                {product.colors.length > 0 && (
                                    <div className="flex space-x-2 mt-2">
                                        {product.colors.map((color, idx) => (
                                            <span key={idx} className="w-4 h-4 rounded-full border" style={{ backgroundColor: color }}></span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex space-x-1 mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="text-yellow-400">★</span>
                                    ))}
                                </div>
                            </div>
                        </Link>


                    ))}
                </div>
            </section>

            {/* Fixed Background Promo */}
            <section className="relative bg-fixed bg-center bg-cover text-white" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/young-beautiful-woman-walking-park_1303-22058.jpg?semt=ais_hybrid&w=740')" }}>
                <div className="bg-black/50">
                    <div className="max-w-7xl mx-auto px-4 py-32 text-center">
                        <p className="text-lg mb-2">Limited Time Offer</p>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Special Edition</h2>
                        <p className="text-lg max-w-2xl mx-auto mb-6">Discover our exclusive Special Edition collection — crafted with unique designs and premium quality.</p>
                        <p className="text-xl font-semibold mb-8">Buy This T-shirt At 20% Discount, Use Code OFF20</p>
                        <button className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200">SHOP NOW</button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <div className="mb-4 text-black">{feature.icon}</div>
                            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
