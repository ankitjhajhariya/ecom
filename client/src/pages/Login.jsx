import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();
        const API_URL = import.meta.env.VITE_API_URL;
        try {
            const res = await axios.post(`${API_URL}/api/login`, {
                email,
                password,
            });
            localStorage.setItem("token", res.data.token);
            window.location.href = "/";
        } catch {
            alert("Invalid credentials.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="flex w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Left: Login */}
                <div className="w-full md:w-5/8 p-8">
                    {/* Logo */}
                    <h2 className="text-2xl font-bold mb-4 text-teal-600">Sign In</h2>

                    {/* Social icons */}
                    <div className="flex space-x-4 mb-4 justify-center">
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

                    <p className="text-gray-500 text-sm text-center mb-6">
                        or use your email account:
                    </p>

                    <form onSubmit={login} className="space-y-4">
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

                        <div className="text-right text-sm text-teal-600 hover:underline">
                            <Link to="/forgot-password">Forgot your password?</Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-500 text-white py-2 rounded-full hover:bg-teal-600 transition"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Right: Side panel */}
                <div className="hidden md:flex flex-col text-center items-center justify-center w-3/8 bg-teal-500 text-white p-8">
                    <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
                    <p className="mb-6 text-center">
                        Enter your details and start your journey with us.
                    </p>
                    <Link
                        to="/signup"
                        className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-teal-500 transition"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
