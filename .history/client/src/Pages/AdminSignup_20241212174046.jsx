import React, { useState } from 'react';
import { useAuthStore } from './store/authStore'
import { useNavigate } from "react-router-dom";


function AdminSignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { admin, message } = useAuthStore()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await admin(name, email, role, password)
            navigate('/adminlogin')
            setSuccess('Admin registered successfully!');
            setError('');

        } catch (err) {
            setError('An error occurred while registering the admin.');
            setSuccess('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">Admin Sign Up</h1>

                {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
                {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <input
                            type="email"
                            name="role"
                            value={role}
                            onChange={(e) => { setRole(e.target.value) }}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => { setconfirmPassword(e.target.value) }}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminSignUp;
