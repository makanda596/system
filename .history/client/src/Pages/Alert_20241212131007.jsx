import { useAuthStore } from '../store/authStore'
import React, { useEffect } from 'react';

function Alert() {
    const { alertMessages, error, fetchAlerts } = useAuthStore((state) => ({
        alertMessages: state.alertMessages,
        error: state.error,
        fetchAlerts: state.fetchAlerts,
    }));

    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    return (
        <div className="tenant-container">
            <h1>Tenant Page</h1>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <ul>
                    {alertMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Alert;
