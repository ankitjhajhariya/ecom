import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const signup = async (e) => {
        e.preventDefault();
        const API_URL = import.meta.env.VITE_API_URL;
        if (password !== confirm) {
            alert('Passwords do not match.');
            return;
        }

        try {
            await axios.post(`${API_URL}/api/signup`, {
                name,
                email,
                password,
            });
            window.location.href = '/login';
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <form onSubmit={signup} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Please enter your name')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Please enter your email.')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Please create a password.')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm" className="block mb-1 font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Please confirm your password.')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}
