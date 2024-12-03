import React, { useState } from 'react';
const Settings = () => {
    // Form data state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        roomNumber: '',
        currentPassword: '',
        newPassword: '',
    });

    // Profile picture state
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState('');

    // Handle input changes for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle profile picture change and preview
    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
        }
        console.log("Selected File:", file); // Debugging
    };

    // Handle form submission
    const handleSaveChanges = (e) => {
        e.preventDefault(); // Prevent page reload
        console.log("Form Submitted");
        console.log("Form Data:", formData);
        console.log("Profile Picture:", profilePicture);
        // Here, you would send the data to your backend, for example:
        // fetch('/api/updateProfile', {
        //   method: 'POST',
        //   body: JSON.stringify({ formData, profilePicture }),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });
    };

    return (
        <div>
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

                    {/* Form for updating details */}
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
        </div>
    );
};

export default Settings;
