import React, { useEffect } from 'react';
import { useAuthStore } from './path/to/your/store';

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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {alertMessages.length > 0 ? (
                <ul>
                    {alertMessages.map((message, index) => (
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
