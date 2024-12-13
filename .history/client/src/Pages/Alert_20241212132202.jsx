import { useAuthStore } from '../store/authStore'
import React, { useEffect } from 'react';

function Alert() {
    const { message } = useAuthStore();


    return (
        <div className="tenant-container">
            <h1>Tenant Page</h1>

            <ul>

                {message}
            </ul>

        </div>
    );
}

export default Alert;
