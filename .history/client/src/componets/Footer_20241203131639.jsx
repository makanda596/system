import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and Tagline */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold text-white">Apartment Manager</h2>
                        <p className="text-sm mt-2">Making your apartment life seamless and easy.</p>
                    </div>

                    {/* Links Section */}
                    <div className="flex space-x-8">
                        <a href="/about" className="hover:text-white transition duration-200">About Us</a>
                        <a href="/contact" className="hover:text-white transition duration-200">Contact</a>
                        <a href="/terms" className="hover:text-white transition duration-200">Terms & Privacy</a>
                        <a href="/help" className="hover:text-white transition duration-200">Help</a>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6">
                    {/* Social Media Links */}
                    <div className="flex justify-center space-x-6 mb-6">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-500 transition duration-200"
                        >
                            <i className="fab fa-facebook fa-lg"></i>
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition duration-200"
                        >
                            <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-500 transition duration-200"
                        >
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-700 transition duration-200"
                        >
                            <i className="fab fa-linkedin fa-lg"></i>
                        </a>
                    </div>

                    {/* Copyright Section */}
                    <p className="text-center text-sm">
                        © {new Date().getFullYear()} Apartment Manager. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
