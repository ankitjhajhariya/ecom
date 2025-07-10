import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [err, setErr] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const API_URL = import.meta.env.VITE_API_URL;
        axios
            .get(`${API_URL}/api/protected`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch(() => setErr('Unauthorized or session expired.'));
    }, []);

    // const logout = () => {
    //     localStorage.removeItem('token');
    //     window.location.href = '/login';
    // };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
                <p className="text-green-600 text-lg">Welcome to your dashboard!</p>
                {err && <p className="text-red-600 text-lg">{err}</p>}
                {/* <button
                    className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                    onClick={logout}
                >
                    Logout
                </button> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between"
                    >
                        <div className="p-6 flex-1">
                            <h5 className="text-xl font-semibold text-blue-600 mb-2">{item.name}</h5>
                            <p className="text-gray-700">{item.des}</p>
                        </div>
                        <div className="px-6 py-4 border-t flex items-center justify-between">
                            <span className="font-bold text-green-600">₹ {item.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
