import { useAuthStore } from '../store/authStore'
import React, { useEffect } from 'react';

function Alert() {
    const { user } = useAuthStore();


    (
        <div className="tenant-container">
            <h1>Tenant Page</h1>
            {user ? (
                <p style={{ color: 'red' }}>{user.name}</p>
            ) : (
                <ul>

                    {user.name}
                </ul>
            )}
        </div>
    );
}

export default Alert;
