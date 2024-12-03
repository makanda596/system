import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', credentials);
            setIsError(false);
            setMessage('Login successful!');

            // Redirect to the home page after successful login
            setTimeout(() => {
                window.location.href = '/home'; // Adjust this path if necessary
            }, 1000);
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Apartment Name */}
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">Lempard Apartments</h1>

                {/* Login Form */}
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                {message && (
                    <p
                        className={`mt-4 text-center text-sm ${isError ? 'text-red-500' : 'text-green-500'
                            }`}
                    >
                        {message}
                    </p>
                )}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
