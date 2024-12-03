import React from 'react';
import Navbar from '../componets/Navbar'
function Dashboard() {
    return (
        <div>
            <Navbar />
            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-semibold">Your Dashboard</h1>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-medium">Apartment Information</h2>
                    <p><strong>Room Number:</strong> {userData.roomNumber}</p>
                    <p><strong>Move-in Date:</strong> {new Date(userData.moveInDate).toLocaleDateString()}</p>
                    <p><strong>Move-out Date:</strong> {new Date(userData.moveOutDate).toLocaleDateString()}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-medium">More Information</h2>
                    {/* You can add more user information here */}
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
