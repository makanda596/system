import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const handleLogout = () => {
        // Logic for logging out (e.g., clearing session data, tokens, etc.)
        window.location.href = '/login'; // Redirect to the login page after logout
    };

    return (
        <nav className="bg-blue-600 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo or Apartment Name */}
                <h1 className="text-white text-2xl font-bold">Lempard Apartments</h1>

                {/* Navigation Links */}
                <div className="space-x-6 text-white">
                    <Link to="/home" className="hover:text-blue-300">Home</Link>
                    <Link to="/profile" className="hover:text-blue-300">Profile</Link>
                    <button onClick={handleLogout} className="hover:text-blue-300">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
