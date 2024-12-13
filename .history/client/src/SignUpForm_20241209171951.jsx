import React, { useState } from 'react';
import { useAuthStore } from './store/authStore'
import { useNavigate } from "react-router-dom";
function SignUpForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [roomNumber, setroomNumber] = useState('')
    const [moveIn, setMoveIn] = useState('')
    const [password, setPassword] = useState('')

    const { signup, message, error } = useAuthStore();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(name, email, phone, roomNumber, moveIn, password);
            navigate('/email-verification')
        } catch (error) {
            // alert(error.response?.data?.message)
            console.log(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Room Number</label>
                        <input
                            type="text"
                            name="roomNumber"
                            value={roomNumber}
                            onChange={(e) => { setroomNumber(e.target.value) }}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your room number"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Move In Date</label>
                        <input
                            type="date"
                            name="moveIn"
                            value={moveIn}
                            onChange={(e) => { setMoveIn(e.target.value) }}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="moving date"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                {message && (
                    <p
                        className={`mt-4 text-center text-sm ${error ? 'text-red-500' : 'text-green-500'
                            }`}
                    >
                        {message}
                    </p>
                )}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
