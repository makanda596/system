import React, { useState, useEffect } from "react";
import { useAuthStore } from '../store/authStore'
import axios from "axios";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(true);

    // Fetch tenants on component mount
    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const response = await axios.get("http://localhost:5000/auth/signup");
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tenants:", error);
                setLoading(false);
            }
        };
        fetchTenants();
    }, []);

    // Delete a tenant
    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/tenants/${userId}`);
            setUsers(users.filter((user) => user._id !== userId)); // Update state after deletion
            alert("tenant deleted succesuffly")
        } catch (error) {
            console.error("Error deleting tenant:", error);
        }
    };

    // Update tenant details
    const handleUpdate = async (userId) => {
        const updatedName = prompt("Enter the new name:");
        const updatedHouse = prompt("Enter the new house:");
        const updatedPhone = prompt("Enter the new phone number:");
        if (!updatedName || !updatedPhone) return; // Cancel update if inputs are empty

        const updatedDetails = { name: updatedName, house: updatedHouse, phone: updatedPhone };

        try {
            const response = await axios.put(
                `http://localhost:5000/api/admin/tenants/${userId}`,
                updatedDetails
            );
            setUsers(users.map((user) => (user._id === userId ? response.data.updatedUser : user))); // Update state with new details
        } catch (error) {
            console.error("Error updating tenant:", error);
        }
    };

    if (loading) {
        return <div className="text-center p-6">Loading tenants...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="p-6">
                <h1 className="text-3xl font-semibold text-indigo-600">Admin Dashboard</h1>

                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h2 className="text-xl font-medium text-indigo-500">Tenants List</h2>

                    <table className="table-auto w-full mt-4">
                        <thead>
                            <tr className="bg-indigo-600 text-white">
                                <th className="px-4 py-2">No</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone Number</th>
                                <th className="px-4 py-2">Room Number</th>
                                <th className="px-4 py-2">Join Date</th>
                                <th className="px-4 py-2">Update</th>
                                <th className="px-4 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-gray-700`}
                                >
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.phone}</td>
                                    <td className="border px-4 py-2 text-center">{user.roomNumber}</td>
                                    <td className="border px-4 py-2 text-center">
                                        {new Date(user.moveIn).toLocaleDateString()}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleUpdate(user._id)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
