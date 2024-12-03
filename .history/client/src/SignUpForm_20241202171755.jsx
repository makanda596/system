import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        roomNumber: '',
        password: ''
    });

    const [message, setMessage] = useState(''); // For success or error messages
    const [isError, setIsError] = useState(false); // To track error state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', formData);
            setIsError(false);
            setMessage(response.data.message); // Display success message
            setFormData({ name: '', email: '', phone: '', roomNumber: '', password: '' }); // Clear form
        } catch (error) {
            setIsError(true);
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="firstName"
                    required
                />
                <input
                    type="text"
                    name="lasttName"
                    value={formData.lasttName}
                    onChange={handleChange}
                    placeholder="lastName"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                />
                <input
                    type="number"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    placeholder="room"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            {message && (
                <p style={{ color: isError ? 'red' : 'green' }}>{message}</p> // Display success or error message
            )}
        </div>
    );
}

export default SignUpForm;
