import React, { useState } from 'react';
import { useAuthStore } from './store/authStore'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [roomNumber, setRoomNumber] = useState('')
    const [password, setPassword] = useState('');
    const { login, error } = useAuthStore();
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(roomNumber, password)
            navigate('/home')
        } catch (error) {
            console.log(error.response ? error.response.data.message : 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">Room Number</label>
                        <input
                            type="text"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            placeholder="Enter your room number"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-500 text-sm">
                        Forgot your password?
                        <a href="/forgotpassword" className="text-blue-600 hover:text-blue-700">
                            Fogort password
                        </a>
                    </p>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-gray-500 text-sm">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-blue-600 hover:text-blue-700">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
