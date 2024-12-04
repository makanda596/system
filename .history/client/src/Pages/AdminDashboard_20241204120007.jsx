import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [username, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [userphone, setUserPhone] = useState('');
    const [UserRoomNumber, setUserRoomNumber] = useState('');
    const [UserMoveIn, setUserMoveIn] = useState('');
    const [userProfilePicture, setUserProfilePicture] = useState('');
    const [rentStatus, setRentStatus] = useState('Paid'); // Example rent status


    useEffect(() => {
        // Fetch tenants from the backend
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
    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) setUserEmail(email);
        const name = localStorage.getItem('name')
        if (name) setUserName(name);

        const roomNumber = localStorage.getItem('roomNumber');
        if (roomNumber) setUserRoomNumber(roomNumber);

        const profilePic = localStorage.getItem('profilePic');
        if (profilePic) setUserProfilePicture(profilePic);

        const moveDate = localStorage.getItem('moveIn');
        if (moveDate) setUserMoveIn(moveDate);

        const phone = localStorage.getItem('phone');
        if (phone) setUserPhone(phone)
    }, []);

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
                                <th className="px-4 py-2">change</th>
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

                                    <td className="border px-4 py-2 text-center">{user.roomNumber} </td>
                                    <td className="border px-4 py-2 ">{rentStatus === "paid" ? <p className="text-green-800">{rentStatus}</p> : <p className="text-red-800">Not paid</p>}</td>
                                    <td className="border px-4 py-2 text-center">{user.moveIn}</td>
                                    <td className="border px-4 py-2 text-center"><button>UPDATE</button></td>
                                    <td className="border px-4 py-2 text-center"><button>DELETE</button></td>

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
