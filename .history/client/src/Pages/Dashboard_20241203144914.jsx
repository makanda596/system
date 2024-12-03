import React, { useState, useEffect } from 'react';
import Navbar from '../componets/Navbar'
function Dashboard() {
    const [userEmail, setUserEmail] = useState('')
    const [username, setUserName] = useState('')

    useEffect(() => {
        const email = localStorage.getItem('email');
        console.log('Email from localStorage:', email); // Debugging log
        if (email) {
            setUserEmail(email);
        }

        const name = localStorage.getItem('name');
        console.log('Name from localStorage:', name); // Debugging log
        if (name) {
            setUserName(name);
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-semibold">Your Dashboard</h1>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-medium">Apartment Information</h2>
                    <p><strong>Room Number:</strong></p>
                    <p><strong>Move-in Date:</strong> </p>
                    <p><strong>Move-out Date:</strong></p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-medium">More Information</h2>
                    {/* You can add more user information here */}
                    <p><strong>Email:{userEmail}</strong> </p>
                    <p><strong>Phone:{username}</strong> </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
