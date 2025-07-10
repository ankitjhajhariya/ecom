import React from "react";

export default function Footer() {
    return (
        <footer className="bg-white border-t py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-700">
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                My Account
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Cart
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* For Her */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">For Her</h4>
                    <ul className="space-y-2 text-gray-700">
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Women Jeans
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Tops and Shirts
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Women Jackets
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Heels and Flats
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Women Accessories
                            </a>
                        </li>
                    </ul>
                </div>

                {/* For Him */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">For Him</h4>
                    <ul className="space-y-2 text-gray-700">
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Men Jeans
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Men Shirts
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Men Shoes
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Men Accessories
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-black hover:underline">
                                Men Jackets
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Our App */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Our App</h4>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                        alt="Get it on Google Play"
                        className="w-32 sm:w-40"
                    />
                </div>
            </div>

            <div className="border-t mt-8 pt-4 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4 text-center md:text-left">
                <p className="mb-2 md:mb-0">Copyright © 2025 Ankit Jhajhariya</p>
                <p>Powered by Ankit Jhajhariya</p>
            </div>
        </footer>
    );
}
