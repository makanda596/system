import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore'


function Alert() {
    const { messages, error } = useAuthStore((state) => ({
        messages: state.messages,
        error: state.error,
        messages: state.message,
    }));

    useEffect(() => {
        messages();
    }, []);

    return (
        <div className="tenant-container">
            <h1>Tenant Page</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {messages.length > 0 ? (
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            ) : (
                <p>No alerts available</p>
            )}
        </div>
    );
}

export default Alert;
