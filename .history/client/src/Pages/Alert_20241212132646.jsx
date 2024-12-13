import { useAuthStore } from '../store/authStore'
import React, { useEffect } from 'react';

function Alert() {
    const { messages, fetchAlerts } = useAuthStore();

    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);


    return (
        <div className="tenant-container">
            <h1>Tenant Page</h1>

            <ul>

                {messages.messages}
            </ul>

        </div>
    );
}

export default Alert;
