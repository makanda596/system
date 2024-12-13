import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.png';
import AnnouncementIcon from '@mui/icons-material/Announcement';

function Navbar() {
    const handleLogout = () => {
        // Logic for logging out (e.g., clearing session data, tokens, etc.)
        window.localStorage.clear()
        window.location.href = '/'; // Redirect to the login page after logout
    };

    const [alert, setAlert] = useState(3);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the mobile menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close
    };

    return (
        <nav className="bg-blue-600 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo or Apartment Name */}
                <h1 className="text-white text-2xl font-bold"><Link to="/home" >Lempard Apartments</Link></h1>

                {/* Navbar Links */}
                <div className="hidden md:flex space-x-6 items-center text-white">
                    {/* Profile Picture and Profile Link */}
                    <div className="relative">
                        <img
                            src={avatar} // Replace with actual profile picture URL
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                    </div>

                    {/* Dashboard Link */}
                    <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>

                    {/* Alert Icon */}
                    <Link to="/alert" className="relative cursor-pointer">
                        <span className="absolute left-0 inline-block top-[-14px] ring-0">
                            {alert > 0 ? (
                                <p className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white">{alert}</p>
                            ) : (
                                <p className="bg-green-500 ring-green w-6 h-6 flex items-center justify-center text-white">0</p>
                            )}
                        </span>
                        <AnnouncementIcon />
                    </Link>

                    {/* Payments Link */}
                    <Link to="/payments" className="hover:text-blue-300">Payments</Link>

                    {/* Community Link */}
                    <Link to="/community" className="hover:text-blue-300">Community</Link>

                    {/* Settings Link */}
                    <Link to="/settings" className="hover:text-blue-300">Settings</Link>

                    {/* Logout Button */}
                    <button onClick={handleLogout} className="hover:text-blue-300">Logout</button>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Hidden on desktop, visible on mobile) */}
            <div className={`md:hidden flex flex-col bg-blue-600 text-white space-y-4 p-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
                <Link to="/alert" className="relative cursor-pointer">
                    <span className="absolute left-0 inline-block top-[-14px] ring-0">
                        {alert > 0 ? (
                            <p className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white">{alert}</p>
                        ) : (
                            <p className="bg-green-500 ring-green w-6 h-6 flex items-center justify-center text-white">0</p>
                        )}
                    </span>
                    <AnnouncementIcon />
                </Link>
                <Link to="/payments" className="hover:text-blue-300">Payments</Link>
                <Link to="/community" className="hover:text-blue-300">Community</Link>
                <Link to="/settings" className="hover:text-blue-300">Settings</Link>
                <Link to="/contact Us" className="hover:text-blue-300">Contact Us</Link>
                <button onClick={handleLogout} className="hover:text-blue-300">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
