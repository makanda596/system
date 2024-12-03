import React, { useState, useEffect } from 'react';
import Navbar from '../componets/Navbar';

function Dashboard() {
    const [userEmail, setUserEmail] = useState('');
    const [username, setUserName] = useState('');
    const [UserRoomNumber, setUserRoomNumber] = useState('');
    const [UserMoveIn, setUserMoveIn] = useState('');
    const [userProfilePicture, setUserProfilePicture] = useState('');
    const [rentStatus, setRentStatus] = useState('Paid'); // Example rent status
    const [moveOutDate, setMoveOutDate] = useState('');
    const [notifications, setNotifications] = useState([
        'Your rent is due in 5 days.',
        'Maintenance scheduled for next week.',
    ]);

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) setUserEmail(email);

        const name = localStorage.getItem('name');
        if (name) setUserName(name);

        const roomNumber = localStorage.getItem('roomNumber');
        if (roomNumber) setUserRoomNumber(roomNumber);

        const moveDate = localStorage.getItem('moveIn');
        if (moveDate) setUserMoveIn(moveDate);

        const profilePic = localStorage.getItem('profilePic');
        if (profilePic) setUserProfilePicture(profilePic);

        const moveOut = localStorage.getItem('moveOut');
        if (moveOut) setMoveOutDate(moveOut);
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-semibold">Your Dashboard</h1>

                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                    <img
                        src={userProfilePicture || 'default-avatar.png'} // fallback image if no profile pic
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-medium">Apartment Information</h2>
                    <p><strong>Room Number: {UserRoomNumber}</strong></p>
                    <p><strong>Move-in Date: {UserMoveIn}</strong></p>
                    <p><strong>Move-out Date: {moveOutDate || 'Not Set'}</strong></p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-medium">More Information</h2>
                    <p><strong>Email: {userEmail}</strong></p>
                    <p><strong>Phone: {username}</strong></p>
                    <p><strong>Rent Status: {rentStatus}</strong></p>
                </div>

                {/* Notifications Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-medium">Notifications</h2>
                    <ul>
                        {notifications.map((notification, index) => (
                            <li key={index} className="text-gray-700 mb-2">
                                {notification}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Settings Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-medium">Settings</h2>
                    <a
                        href="/settings"
                        className="text-blue-500 hover:underline"
                    >
                        Update Profile & Settings
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
