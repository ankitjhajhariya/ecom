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
        <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Left: Login */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold mb-6 text-teal-600 text-center md:text-left">
                        Sign In
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
                    <div className="mt-6 text-center md:hidden">
                        <p className="text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-teal-600 font-medium hover:underline hover:text-teal-700 transition"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>

                </div>

                {/* Right: Side panel */}
                <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 bg-teal-500 text-white p-8">
                    <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
                    <p className="mb-6 text-center px-4">
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
