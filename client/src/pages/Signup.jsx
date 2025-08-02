import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const signup = async (e) => {
        e.preventDefault();
        const API_URL = import.meta.env.VITE_API_URL;

        if (password !== confirm) {
            alert("Passwords do not match.");
            return;
        }

        try {
            await axios.post(`${API_URL}/api/signup`, {
                name,
                email,
                password,
            });
            window.location.href = "/login";
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Left side panel */}
                <div className="hidden md:flex flex-col items-center text-center justify-center w-1/2 bg-teal-500 text-white p-8">
                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                    <p className="mb-6 text-center">
                        To keep connected with us please login with your personal info.
                    </p>
                    <Link
                        to="/login"
                        className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-teal-500 transition"
                    >
                        Sign In
                    </Link>
                </div>

                {/* Right side form */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-teal-600 text-center md:text-left">
                        Create Account
                    </h2>

                    {/* Social icons */}
                    <div className="flex justify-center md:justify-start space-x-4 mb-6">
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100">
                            <FaFacebookF />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100">
                            <FaGoogle />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100">
                            <FaLinkedinIn />
                        </button>
                    </div>

                    <p className="text-gray-500 text-sm text-center md:text-left mb-6">
                        or use your email for registration:
                    </p>

                    <form onSubmit={signup} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-2 rounded-full hover:bg-teal-600 transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Mobile: Sign In link */}
                    <div className="mt-6 text-center md:hidden">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-teal-600 font-medium hover:underline hover:text-teal-700 transition"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
