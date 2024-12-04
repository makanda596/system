import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to the WebSocket server

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Load existing messages
        socket.on("loadMessages", (loadedMessages) => {
            setMessages(loadedMessages);
        });

        // Receive new messages
        socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup on component unmount
        return () => {
            socket.off("loadMessages");
            socket.off("receiveMessage");
        };
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = { username, text: newMessage, timestamp: new Date() };
            socket.emit("sendMessage", message); // Send to server
            setNewMessage("");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="space-y-4">
                <h1 className="text-3xl font-semibold text-indigo-600">Community Chat</h1>

                {/* Username Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Chat Messages */}
                <div className="bg-white p-4 rounded-lg shadow-lg h-96 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <strong>{msg.username}:</strong> <span>{msg.text}</span>
                            <div className="text-sm text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
