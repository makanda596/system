import React, { useState, useEffect } from 'react';
import Navbar from '../componets/Navbar';
import { useAuthStore } from '../store/authStore'
import avatar from '../assets/avatar.png'
function Dashboard() {
    const CURRENT_DATE = new Date("2025-01-01T00:00:00");
    const { user } = useAuthStore();
    const [rentStatus, setRentStatus] = useState('Paid'); // Example rent status
    const [moveOutDate, setMoveOutDate] = useState('');

    const [time, setTime] = useState(getTimeLeft);

    function getTimeLeft() {
        const currentTime = new Date();
        const timeleft = CURRENT_DATE - currentTime;

        // Ensure timeleft is a valid number before proceeding
        if (isNaN(timeleft)) {
            return { days: 0, hours: 0, minutes: 0 };
        }

        const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeleft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeleft / (1000 * 60)) % 60);
        return { days, hours, minutes };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeLeft());
        }, 1000);

        return () => clearInterval(interval); // Clear the interval on component unmount
    }, []);



    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-semibold text-indigo-600">Your Dashboard</h1>

                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                    <img
                        src={avatar}// fallback image if no profile pic
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600 transform hover:scale-110 transition duration-300"
                    />
                </div>

                {/* Apartment Information */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                    <h2 className="text-xl font-medium text-indigo-500">Apartment Information</h2>
                    <p><strong className="text-indigo-700">Room Number: {user.roomNumber}</strong></p>
                    <p><strong className="text-indigo-700">Move-in Date: {user.moveIn}</strong></p>
                    <p><strong className="text-indigo-700">Move-out Date: {moveOutDate || 'Not Set'}</strong></p>
                </div>

                {/* More Information */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                    <h2 className="text-xl font-medium text-indigo-500">More Information</h2>
                    <p><strong className="text-indigo-700">Email: {user.email}</strong></p>
                    <p><strong className="text-indigo-700">Name: {user.name}</strong></p>
                    <p><strong className="text-indigo-700">Phone: {user.phone}</strong></p>
                    <p><strong className="text-indigo-700">Rent Status: {rentStatus}</strong></p>
                </div>

                {/* Notifications Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                    <h2 className="text-xl font-medium text-indigo-500">Notifications</h2>
                    <ul>
                        <li>Your rent is due in {time.days} days, {time.hours} hours, and {time.minutes} minutes.</li>
                    </ul>
                </div>

                {/* Settings Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                    <h2 className="text-xl font-medium text-indigo-500">Settings</h2>
                    <a
                        href="/settings"
                        className="text-indigo-500 hover:text-indigo-700 font-semibold transition duration-300"
                    >
                        Update Profile & Settings
                    </a>
                </div>

                {/* Action Button */}
                <div className="text-center mt-6">
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg transform hover:scale-105 hover:bg-indigo-700 transition duration-300">
                        Pay Rent
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
