import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.png'
import AnnouncementIcon from '@mui/icons-material/Announcement';
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

                {/* Navbar links */}
                <div className="flex space-x-6 items-center text-white">
                    {/* Profile Picture and Profile Link */}
                    <div className="relative">
                        <img
                            src={avatar} // Replace with actual profile picture URL
                            alt=""
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                    </div>

                    {/* Dashboard Link */}
                    <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>

                    {/* Payments Link */}
                    <Link to="/payments" className="hover:text-blue-300">Payments</Link>

                    {/* Community Link */}
                    <Link to="/community" className="hover:text-blue-300">Community</Link>

                    {/* Settings Link */}
                    <Link to="/settings" className="hover:text-blue-300">Settings</Link>

                    {/* Alert Icon (Bell) */}
                    <div className="relative">
                        <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                        <i className="fas fa-bell text-white text-xl"><AnnouncementIcon /></i>
                    </div>

                    {/* Logout Button */}
                    <button onClick={handleLogout} className="hover:text-blue-300">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
