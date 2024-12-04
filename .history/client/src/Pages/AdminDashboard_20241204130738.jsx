import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const response = await axios.get("http://localhost:5000/signup");
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tenants:", error);
                setLoading(false);
            }
        };
        fetchTenants();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/signup/${userId}`);
            setUsers(users.filter(user => user.id !== userId)); // Update state after deletion
        } catch (error) {
            console.error("Error deleting tenant:", error);
        }
    };

    const handleUpdate = async (userId, updatedDetails) => {
        try {
            await axios.put(`http://localhost:5000/signup/${userId}`, updatedDetails);
            setUsers(users.map(user => (user.id === userId ? { ...user, ...updatedDetails } : user))); // Update state after update
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
                                <th className="px-4 py-2">Rent Status</th>
                                <th className="px-4 py-2">Join Date</th>
                                <th className="px-4 py-2">Update</th>
                                <th className="px-4 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-gray-700`}
                                >
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.phone}</td>
                                    <td className="border px-4 py-2 text-center">{user.roomNumber}</td>
                                    <td className="border px-4 py-2 text-center">
                                        {user.rentStatus === "Paid" ? (
                                            <span className="text-green-800">Paid</span>
                                        ) : (
                                            <span className="text-red-800">Not Paid</span>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 text-center">{new Date(user.moveIn).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleUpdate(user.id, { /* Updated details */ })}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleDelete(user.id)}
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
