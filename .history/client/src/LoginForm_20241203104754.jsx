import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                roomNumber: email, // Assuming roomNumber is used as the identifier
                password,
            });

            // Store the JWT token and email in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email); // Store email

            // Redirect to dashboard or any other page
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Login failed');
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Room Number"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;
