import React from 'react';

const ProfilePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* Header Section */}
                <div className="flex flex-col items-center">
                    <div className="relative">
                        {/* Profile Cover Image */}
                        <div className="h-32 w-full bg-gray-200 rounded-t-lg"></div>
                        {/* Profile Picture */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                            <div className="h-24 w-24 bg-gray-300 rounded-full border-4 border-white"></div>
                        </div>
                    </div>
                    <div className="mt-16 text-center">
                        <h1 className="text-2xl font-bold text-gray-700">Brian Makanda</h1>
                        <p className="text-gray-500">Moi University</p>
                        <p className="text-sm text-gray-400">Nairobi, Nairobi County, Kenya</p>
                    </div>
                </div>

                {/* Profile Actions */}
                <div className="mt-6 flex justify-center space-x-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">Add Verification Badge</button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition">Enhance Profile</button>
                </div>

                {/* About Section */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-600">About</h2>
                    <p className="text-gray-500 mt-2">Welcome to my profile! Here you can find my professional details, achievements, and contact information.</p>
                </div>

                {/* Profile Details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Connections</h3>
                        <p className="text-lg font-bold text-gray-700">65 Connections</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Contact Info</h3>
                        <p className="text-gray-700">Email: brian.makanda@example.com</p>
                        <p className="text-gray-700">Phone: +254 712 345 678</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 border-t pt-6 text-sm text-gray-400 text-center">
                    <p>&copy; 2024 Brian Makanda. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
