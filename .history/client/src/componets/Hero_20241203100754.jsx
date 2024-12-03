import React from 'react';

function HeroSection({ email }) {

    return (
        <section className="relative bg-blue-600 h-screen">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
                <h2>HELLO </h2>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                    Welcome to Lempard Apartments
                </h1>
                <p className="text-xl md:text-2xl mb-6">
                    Discover comfortable living with exceptional services. Your perfect home awaits!
                </p>
                <a
                    href="#"
                    className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-all duration-300"
                >
                    Explore Now
                </a>
            </div>
        </section>
    );
}

export default HeroSection;
