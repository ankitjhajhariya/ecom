import React from "react";
import { Navigate } from "react-router-dom";

function Profile() {
    const token = localStorage.getItem("token");

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="max-w-6xl mx-auto mt-20 p-6">
            {/* Heading */}
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="flex flex-col w-full md:w-1/4 space-y-4">
                    <button className="text-left px-4 py-2 bg-yellow-400 rounded">
                        Personal Information
                    </button>
                    <button className="text-left px-4 py-2 hover:bg-gray-100 rounded">
                        My Orders
                    </button>
                    <button className="text-left px-4 py-2 hover:bg-gray-100 rounded">
                        Manage Address
                    </button>
                    <button className="text-left px-4 py-2 hover:bg-gray-100 rounded">
                        Payment Method
                    </button>
                    <button className="text-left px-4 py-2 hover:bg-gray-100 rounded">
                        Password Manager
                    </button>
                    <button className="text-left px-4 py-2 hover:bg-gray-100 rounded text-red-500"
                        onClick={() => logout()}
                    >
                        Logout
                    </button>
                </div>

                {/* Main Form */}
                <div className="flex-1">
                    <div className="flex items-center mb-6">
                        <img
                            src="https://via.placeholder.com/80"
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <button className="ml-4 px-3 py-1 bg-green-600 text-white rounded text-sm">
                            Edit
                        </button>
                    </div>

                    <form className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Leslie"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Cooper"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email *
                            </label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Phone *
                            </label>
                            <input
                                type="text"
                                placeholder="+0123-456-789"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Gender *
                            </label>
                            <select className="w-full border border-gray-300 rounded px-3 py-2">
                                <option>Female</option>
                                <option>Male</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded"
                        >
                            Update Changes
                        </button>
                    </form>
                </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 mt-12 rounded">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <img
                        src="https://img.icons8.com/ios/50/000000/shipped.png"
                        alt=""
                        className="w-8 h-8"
                    />
                    <div>
                        <div className="font-semibold">Free Shipping</div>
                        <div className="text-sm text-gray-500">
                            Free shipping for orders above $50
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <img
                        src="https://img.icons8.com/ios/50/000000/money.png"
                        alt=""
                        className="w-8 h-8"
                    />
                    <div>
                        <div className="font-semibold">Flexible Payment</div>
                        <div className="text-sm text-gray-500">
                            Multiple secure payment options
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <img
                        src="https://img.icons8.com/ios/50/000000/customer-support.png"
                        alt=""
                        className="w-8 h-8"
                    />
                    <div>
                        <div className="font-semibold">24×7 Support</div>
                        <div className="text-sm text-gray-500">
                            We support online all days.
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter */}
            <div className="text-center py-12">
                <h2 className="text-xl font-bold mb-2">Our Newsletter</h2>
                <p className="mb-4">
                    Subscribe to Our Newsletter to Get{" "}
                    <span className="text-green-600">
                        Updates on Our Latest Offers
                    </span>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                    Get 25% off on your first order just by subscribing to our
                    newsletter
                </p>
                <div className="flex justify-center">
                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        className="border border-gray-300 px-4 py-2 rounded-l w-64"
                    />
                    <button className="bg-yellow-400 px-6 py-2 rounded-r font-semibold">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
