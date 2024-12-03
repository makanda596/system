import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/avatar.png'
import AnnouncementIcon from '@mui/icons-material/Announcement';
function Navbar() {
    const handleLogout = () => {
        // Logic for logging out (e.g., clearing session data, tokens, etc.)
        window.location.href = '/login'; // Redirect to the login page after logout
    };
    const [alert, setAlert] = useState(3)

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
                    <div className="relative">
                        <span className="absolute top-0 right-0 inline-block   ring-2 ">
                            {alert > 0 ? <p className='bg-red-500 rounded-full w-4.5 h-4.5 px-1'>{alert} </p> : <p className='bg-green-500 ring-green'>0</p>}
                        </span>
                        <AnnouncementIcon />
                    </div>
                    {/* Payments Link */}
                    <Link to="/payments" className="hover:text-blue-300">Payments</Link>

                    {/* Community Link */}
                    <Link to="/community" className="hover:text-blue-300">Community</Link>

                    {/* Settings Link */}
                    <Link to="/settings" className="hover:text-blue-300">Settings</Link>




                    {/* Logout Button */}
                    <button onClick={handleLogout} className="hover:text-blue-300">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
