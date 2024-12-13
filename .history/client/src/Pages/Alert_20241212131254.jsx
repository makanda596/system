import { useAuthStore } from '../store/authStore'
import React, { useEffect } from 'react';

function Alert() {
    const { messages, error, fetchAlerts } = useAuthStore((state) => ({
        messages: state.messages,
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

                    {messages}
                </ul>
            )}
        </div>
    );
}

export default Alert;
