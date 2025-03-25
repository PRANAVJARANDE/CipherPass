import React, { useState, useEffect } from 'react';
import Dashboard from '../Dashboard';
import Loading from '../Loading/Loading.jsx';
import { getMyProfile } from '../../Service/Auth.service.js';

function Profile() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            const data = await getMyProfile();
            setUser(data);
        };
        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA] flex flex-col items-center">
            <Dashboard />
            
            {user ? (
                <div className="relative mt-12 bg-opacity-30 backdrop-blur-lg p-14 rounded-2xl shadow-xl border border-gray-300/40 w-[600px] text-center">
           
                    <div className="bg-white/10 p-6 rounded-lg shadow-lg space-y-4 text-left">
                        <div className="flex items-center border-b border-gray-300/40 pb-2">
                            <span className="text-lg font-medium text-gray-200">Email:</span>
                            <input 
                                type="text" 
                                name="email"
                                value={user.email} 
                                onChange={handleInputChange}
                                className="text-lg font-semibold bg-transparent focus:outline-none ml-4"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300/40 pb-2">
                            <span className="text-lg font-medium text-gray-200">Full name:</span>
                            <input 
                                type="text" 
                                name="email"
                                value={user.fullname} 
                                onChange={handleInputChange}
                                className="text-lg font-semibold bg-transparent focus:outline-none ml-4"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300/40 pb-2">
                            <span className="text-lg font-medium text-gray-200">Username:</span>
                            <input 
                                type="text" 
                                name="username"
                                value={user.username} 
                                onChange={handleInputChange}
                                className="text-lg font-semibold bg-transparent focus:outline-none ml-4"
                            />
                        </div>
                        <div className="flex items-center border-b border-gray-300/40 pb-2">
                            <span className="text-lg font-medium text-gray-200">Created At:</span>
                            <span className="text-lg font-semibold ml-4">{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default Profile;