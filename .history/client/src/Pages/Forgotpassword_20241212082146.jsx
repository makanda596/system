import React, { useState, useEffect } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);

    useEffect(() => {
        let timer;
        if (!canResend && resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setCanResend(true);
        }

        return () => clearInterval(timer);
    }, [canResend, resendTimer]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setError("");
            const response = await axios.post("http://localhost:5000/auth/forgot-password", { email });
            setMessage(response.data.message);
            setCanResend(false);
            setResendTimer(60);
        } catch (err) {
            setError(
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : "An error occurred. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendEmail = async () => {
        try {
            setCanResend(false);
            setResendTimer(60);
            const response = await axios.post("http://localhost:5000/auth/resend-email", { email });
            setMessage(response.data.message);
        } catch (err) {
            setError(
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : "Failed to resend email. Please try again."
            );
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
                <button
                    type="submit"
                    className={`w-full p-2 text-white rounded ${isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}`}
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Send Reset Email"}
                </button>
                {message && <p className="text-green-500 text-sm mt-4">{message}</p>}
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </form>
            <div className="mt-4 text-sm text-gray-600">
                <p>
                    Didn’t receive the email? {" "}
                    <button
                        onClick={handleResendEmail}
                        className={`text-blue-500 hover:underline ${!canResend && "cursor-not-allowed text-gray-400"}`}
                        disabled={!canResend}
                    >
                        Resend Email
                    </button>
                </p>
                {!canResend && <p className="text-gray-500 mt-2">You can resend in {resendTimer} seconds.</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
