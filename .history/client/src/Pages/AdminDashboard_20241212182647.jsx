import React, { useState } from "react";

function AdminDashboard() {
    const [activeSection, setActiveSection] = useState("tenants");

    const renderSection = () => {
        switch (activeSection) {
            case "tenants":
                return <Tenants />;
            case "complaints":
                return <Complaints />;
            case "payments":
                return <Payments />;
            case "messages":
                return <Messages />;
            default:
                return <div>Select a section from the sidebar.</div>;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-indigo-600 text-white p-4">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                <ul>
                    <li
                        className={`p-3 mb-2 cursor-pointer ${activeSection === "tenants" ? "bg-indigo-800" : ""
                            }`}
                        onClick={() => setActiveSection("tenants")}
                    >
                        Tenants
                    </li>
                    <li
                        className={`p-3 mb-2 cursor-pointer ${activeSection === "complaints" ? "bg-indigo-800" : ""
                            }`}
                        onClick={() => setActiveSection("complaints")}
                    >
                        Complaints
                    </li>
                    <li
                        className={`p-3 mb-2 cursor-pointer ${activeSection === "payments" ? "bg-indigo-800" : ""
                            }`}
                        onClick={() => setActiveSection("payments")}
                    >
                        Payments
                    </li>
                    <li
                        className={`p-3 mb-2 cursor-pointer ${activeSection === "messages" ? "bg-indigo-800" : ""
                            }`}
                        onClick={() => setActiveSection("messages")}
                    >
                        Messages
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 bg-gray-100 p-6">{renderSection()}</div>
        </div>
    );
}

function Tenants() {
    return <div>Tenants Section: Display tenant information here.</div>;
}

function Complaints() {
    return <div>Complaints Section: Display complaints information here.</div>;
}

function Payments() {
    return <div>Payments Section: Display payments information here.</div>;
}

function Messages() {
    return <div>Messages Section: Display messages information here.</div>;
}

export default AdminDashboard;
