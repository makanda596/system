import React, { useState } from 'react';
import Navbar from '../componets/Navbar'
function Alert() {
    // State to store notifications
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Payment successful! Thank you.", type: "success" },
        { id: 2, message: "Your subscription will expire in 3 days.", type: "warning" },
        { id: 3, message: "Error processing your last payment.", type: "error" },
    ]);

    // Function to clear a single notification
    const clearNotification = (id) => {
        setNotifications(notifications.filter((notification) => notification.id !== id));
    };

    // Function to clear all notifications
    const clearAllNotifications = () => {
        setNotifications([]);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="p-6 space-y-6">
                <h1 className="text-3xl font-semibold text-indigo-600">Alert Notifications</h1>

                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                    <h2 className="text-xl font-medium text-indigo-500">Your Notifications</h2>

                    {notifications.length > 0 ? (
                        <div className="space-y-4 mt-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 rounded-lg flex justify-between items-center ${notification.type === "success"
                                        ? "bg-green-100 text-green-700"
                                        : notification.type === "warning"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    <p>{notification.message}</p>
                                    <button
                                        onClick={() => clearNotification(notification.id)}
                                        className="text-sm text-indigo-500 hover:text-indigo-700 transition"
                                    >
                                        Clear
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={clearAllNotifications}
                                className="w-full px-6 py-2 mt-4 bg-indigo-600 text-white rounded-lg transform hover:scale-105 hover:bg-indigo-700 transition duration-300"
                            >
                                Clear All
                            </button>
                        </div>
                    ) : (
                        <p className="text-lg text-gray-700 mt-4">No notifications to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Alert;
