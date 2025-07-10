import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from "lucide-react";

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur shadow-md' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl md:text-5xl font-extrabold text-gray-800 hover:text-blue-600 transition-colors"
                >
                    ECOM
                </Link>

                {/* Desktop Nav for >1000px */}
                <div className="hidden [@media(min-width:1001px)]:flex items-center space-x-4 text-lg">
                    {["EVERYTHING", "MEN", "WOMEN", "ACCESSORIES", "ABOUT US", "CONTACT US"].map((item, i) => (
                        <Link
                            key={i}
                            to="/"
                            className="px-2 py-1 text-black font-semibold hover:text-blue-600"
                        >
                            {item}
                        </Link>
                    ))}
                    <Link to="/" className="px-2 py-1 hover:text-blue-600">
                        <ShoppingCart className="w-6 h-6 text-gray-800" />
                    </Link>
                    <Link to="/" className="px-2 py-1 hover:text-blue-600">
                        <User className="w-6 h-6 text-gray-800" />
                    </Link>
                </div>

                {/* Hamburger for <=1000px */}
                <button
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    className={`[@media(min-width:1001px)]:hidden text-gray-800 transition-transform duration-300 ${menuOpen ? 'rotate-90 scale-110' : ''
                        }`}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`[@media(min-width:1001px)]:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    } bg-white shadow-md w-full`}
            >
                <div className="flex flex-col px-4 pb-4">
                    {["HOME", "MEN", "WOMEN", "ACCESSORIES", "ABOUT US", "CONTACT US"].map((item, i) => (
                        <Link
                            key={i}
                            to="/"
                            className="py-2 border-b text-black font-semibold hover:text-blue-600 transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        to="/"
                        className="py-2 flex items-center space-x-2 border-b hover:text-blue-600 transition"
                        onClick={() => setMenuOpen(false)}
                    >
                        <ShoppingCart className="w-6 h-6 text-gray-800" />
                        <span>Cart</span>
                    </Link>
                    <Link
                        to="/"
                        className="py-2 flex items-center space-x-2 hover:text-blue-600 transition"
                        onClick={() => setMenuOpen(false)}
                    >
                        <User className="w-6 h-6 text-gray-800" />
                        <span>Profile</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
