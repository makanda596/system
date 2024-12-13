import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const { token } = useParams(); // Get token from URL params
    const navigate = useNavigate();

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

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setIsLoading(true);
            setError("");
            const response = await axios.post(
                `http://localhost:5000/auth/reset-password/${token}`,
                { password }
            );
            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after 3 seconds
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
            const response = await axios.post("http://localhost:5000/auth/resend-email", { token });
            setMessage(response.data.message);
        } catch (err) {
            setError(
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : "Failed to resend email. Please try again."
            );
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const isButtonDisabled = isLoading || password !== confirmPassword || password.length === 0;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <div className="relative w-full mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <div className="relative w-full mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full p-2 text-white rounded ${isButtonDisabled ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}`}
                    disabled={isButtonDisabled}
                >
                    {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
