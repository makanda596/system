import React, { useState } from 'react';
import axios from 'axios';

function AdminAlertPage() {
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendAlert = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/auth/alert', { message });
            setSuccessMessage(response.data.message);
            setMessage(''); // Clear the input field
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error sending alert');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Send Alert Message</h1>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSendAlert}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your alert message here..."
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Send Alert
                </button>
            </form>
        </div>
    );
}

export default AdminAlertPage;
