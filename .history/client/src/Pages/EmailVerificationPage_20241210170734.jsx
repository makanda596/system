import React, { useState } from "react";
import { useAuthStore } from '../store/authStore'
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
    const [code, setCode] = useState("");
    const { verifyEmail, error, message } = useAuthStore()
    const navigate = useNavigate()
    // Handle verification by code
    const verifyEmails = async (e) => {
        e.preventDefault();

        try {
            await verifyEmail(code)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    };

    // // Handle resend verification email
    // const resendVerificationEmail = async () => {

    //     try {
    //         const response = await axios.post("/api/auth/resend-verification-email");
    //         if (response.data.success) {
    //             alert("Verification email sent! Check your inbox.");
    //         } else {
    //             setErrorMessage(response.data.message || "Something went wrong.");
    //         }
    //     } catch (error) {
    //         setErrorMessage("Failed to resend verification email. Please try again.");
    //     } finally {
    //         setIsLoading(false);
    //     }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center mb-4">
                    Email Verification
                </h1>
                {/* {isVerified ? (
                <div className="text-center">
                    <p className="text-green-500 mb-4">Your email has been verified!</p>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => (window.location.href = "/login")}
                    >
                        Go to Login
                    </button>
                </div> */}
                {/* ) : ( */}
                <div>
                    <p className="text-gray-600 mb-4">
                        Enter the verification code sent to your email to verify your account.
                    </p>
                    {error && (
                        <p className="text-red-500 text-center mb-4">{error}</p>
                    )}
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-4"
                    />
                    <button
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600    }`}
                        onClick={verifyEmails}

                    >
                    </button>
                    <p className="text-gray-600 text-center mt-4">Didn’t receive the email?</p>

                </div>

            </div>
        </div>
    );
};

export default EmailVerification;