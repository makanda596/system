import React, { useState } from 'react';
import useAuthStore from '../store/authStore'
const HeroSection = () => {
    const { user } = useAuthStore('');


    return (
        <section
            className="bg-gray-900 text-white flex items-center justify-center h-screen relative overflow-hidden"
        >
            {/* Background styling */}
            <div className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?apartment,luxury')" }}>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center max-w-4xl px-6">
                <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
                    Welcome, {user.email || "Resident"}!
                </h1>
                <p className="text-lg md:text-2xl text-gray-300 mb-8">
                    Your home, your haven. Check your updates, manage your apartment, and more.
                </p>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg transition duration-300"
                >
                    Explore Dashboard
                </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-xl opacity-30"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500 rounded-full blur-2xl opacity-20"></div>
        </section>
    );
};

export default HeroSection;
