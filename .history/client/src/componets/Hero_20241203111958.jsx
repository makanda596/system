import React, { useEffect, useState } from 'react';

const HeroSection = () => {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Check if the email exists in localStorage and set it
        const email = localStorage.getItem('email');
        if (email) {
            setUserEmail(email);
        }
    }, []);


    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1>Hello, {userEmail ? userEmail : 'Guest'}!</h1>
                <p>Welcome to your dashboard</p>
            </div>
        </section>
    );
};

export default HeroSection;
