import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore'

function AdminAlertPage() {
    const [message, setMessage] = useState('')
    const { sendAlert, error } = useAuthStore()
    const handleSendAlert = async (e) => {
        e.preventDefault();

        try {
            await sendAlert(message)
        } catch (error) {
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Send Alert Message</h1>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {error && <p className="text-red-500">{error}</p>}
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
