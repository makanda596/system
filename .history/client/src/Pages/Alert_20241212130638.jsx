import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Alert() {
    const [alertMessage, setAlertMessage] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAlert = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/alerts');
                setAlertMessage(response.data.message || "no");
            } catch (err) {
                setError('Failed to fetch alert message');
            }
        };

        fetchAlert();
    }, []);

    return (
        <div className="tenant-container">
            <h1>Tenant Page</h1>
            {error ? <p style={{ color: 'red' }}>{error}</p> : <p>{alertMessage}</p>}
        </div>
    );
}

export default Alert;
