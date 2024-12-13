import React, { useState } from "react";
import axios from "axios";

const EmailVerification = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Handle resend verification email
    const resendVerificationEmail = async () => {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const response = await axios.post("/api/auth/resend-verification-email");
            if (response.data.success) {
                alert("Verification email sent! Check your inbox.");
            } else {
                setErrorMessage(response.data.message || "Something went wrong.");
            }
        } catch (error) {
            setErrorMessage("Failed to resend verification email. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle verification
    const verifyEmail = async (token) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/auth/verify-email?token=${token}`);
            if (response.data.success) {
                setIsVerified(true);
            } else {
                setErrorMessage(response.data.message || "Invalid or expired token.");
            }
        } catch (error) {
            setErrorMessage("Verification failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center mb-4">
                    Email Verification
                </h1>
                {isVerified ? (
                    <div className="text-center">
                        <p className="text-green-500 mb-4">Your email has been verified!</p>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() => (window.location.href = "/login")}
                        >
                            Go to Login
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-600 mb-4">
                            Please verify your email by clicking the verification link sent to
                            your email address. If you didn’t receive the email, you can resend
                            it.
                        </p>
                        {errorMessage && (
                            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                        )}
                        <button
                            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isLoading && "opacity-50 cursor-not-allowed"
                                }`}
                            onClick={resendVerificationEmail}
                            disabled={isLoading}
                        >
                            {isLoading ? "Resending..." : "Resend Verification Email"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailVerification;
