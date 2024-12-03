import React, { useState } from 'react';
import Navbar from '../componets/Navbar'
import Footer from '../componets/Footer'

const Settings = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        roomNumber: '',
        currentPassword: '',
        newPassword: '',
    });

    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        console.log('Updated data:', formData);
        console.log('Profile Picture:', profilePicture);
        // Send updated data and profile picture to the backend
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6">Settings</h2>

                    {/* Profile Picture Section */}
                    <div className="mb-8 text-center">
                        <div className="relative w-32 h-32 mx-auto">
                            {/* Profile Picture Preview */}
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Profile Preview"
                                    className="w-32 h-32 rounded-full object-cover border border-gray-300"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}
                            <label
                                htmlFor="profilePicture"
                                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
                            >
                                📷
                            </label>
                            <input
                                type="file"
                                id="profilePicture"
                                className="hidden"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                            />
                        </div>
                    </div>

                    <form onSubmit={handleSaveChanges} className="space-y-6">
                        {/* Personal Information Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-600 mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="text"
                                    name="roomNumber"
                                    value={formData.roomNumber}
                                    onChange={handleInputChange}
                                    placeholder="Room Number"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </div>

                        {/* Password Change Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-600 mb-4">Change Password</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    placeholder="Current Password"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    placeholder="New Password"
                                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </div>

                        {/* Save Changes Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Settings;
