import React, { useState } from "react";
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const { forgotPassword, error, message } = useAuthStore()
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            await forgotPassword(email)
            navigate('/resetPassword')
        } catch (err) {
            console.log(error.response ? error.response.data.message : 'Login failed');
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ width: "400px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
                <h2>Forgot Password</h2>
                <p>Enter your email address to reset your password.</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                    >
                        Submit
                    </button>
                </form>

                {message && <p style={{ color: "green", marginTop: "15px" }}>{message}</p>}
                {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;