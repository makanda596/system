import React, { useState } from 'react';
import axios from 'axios';

function AdminSignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        // Validate inputs
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/adminSignup', {
                name,
                email,
                role: 'admin',
                password
            });

            setSuccess('Admin registered successfully!');
            setError('');

            // Reset form
            setFormData({
                name: '',
                email: '',
                role: 'admin',
                password: '',
                confirmPassword: ''
            });
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