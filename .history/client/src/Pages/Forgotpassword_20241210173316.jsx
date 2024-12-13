import React, { useState } from "react";
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [forgotPassword, message, error] = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await forgotPassword(email)
            navigate('/reset-password')
        } catch (error) {
            console.log(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-semibold text-center text-gray-700">Forgot Password</h2>
            <p className="text-center text-gray-600 mt-2">Enter your email address, and we’ll send you a link to reset your password.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Send Reset Link
                </button>
            </form>

            {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
    );
};

export default ForgotPassword;
