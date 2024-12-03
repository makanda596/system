import React, { useEffect, useState } from 'react';

const HeroSection = () => {
    const [userEmail, setUserEmail] = useState('');
    const [roomNumber, setRoomNumber] = useState('');


    useEffect(() => {
        // Check if the email exists in localStorage and set it
        const email = localStorage.getItem('email');
        if (email) {
            setUserEmail(email);
        }
    }, []);
    useEffect(() => {
        // Check if the email exists in localStorage and set it
        const roomNumber = localStorage.getItem('roomNumber');
        if (roomNumber) {
            setRoomNumber(roomNumber);
        }
    }, []);


    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>Hello, {userEmail ? userEmail : 'Guest'}!</h1>
                <h1>Hello, {roomNumber ? roomNumber : 'Guest'}!</h1>
                <p>Welcome to your dashboard</p>
            </div>
        </section>
    );
};

export default HeroSection;
