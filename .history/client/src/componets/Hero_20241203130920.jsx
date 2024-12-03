import React, { useEffect, useState } from 'react';

const HeroSection = () => {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Check if the email exists in localStorage and set it
        const email = localStorage.getItem('email');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    return (
        <section
            className="hero-section bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center h-screen"
        >
            <div className="hero-content text-center px-8">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Hello, {userEmail || "Guest"}!
                </h1>
                <p className="text-lg md:text-xl">
                    Welcome to your personalized dashboard. Manage everything at a glance.
                </p>
                <button
                    className="mt-6 bg-white text-blue-500 hover:bg-blue-100 px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300"
                >
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
