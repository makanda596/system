import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState(''); // For success or error messages
    const [isError, setIsError] = useState(false); // To track error state

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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && (
                <p style={{ color: isError ? 'red' : 'green' }}>{message}</p> // Display success or error message
            )}
        </div>
    );
}

export default LoginForm;
