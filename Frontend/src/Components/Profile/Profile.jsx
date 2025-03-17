import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPrivateKey } from '../../Features/todoslice.js';

import { Eye, EyeOff } from 'lucide-react'; 
import Dashboard from '../Dashboard';
import Loading from '../Loading/Loading.jsx';
import { getMyProfile } from '../../Service/Auth.service.js';

function Profile() {
    const [user, setUser] = useState(null);
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const privateKey = useSelector((state) => state.privatekey);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const data = await getMyProfile();
            setUser(data);
        };
        fetchUserProfile();
        console.log(privateKey);
    }, []);

    const handlePrivateKeyChange = (e) => {
        dispatch(setPrivateKey(e.target.value));    
    };


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
                        <div className="flex items-center border-b border-gray-300/40 pb-2">
                            <span className="text-lg font-medium text-gray-200">Private Key:</span>
                            <span className="text-lg font-semibold ml-4">
                            {privateKey ? privateKey : "Not available"}
                            </span>
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

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getMyProfile } from '../../Service/Auth.service';



// const Profile = () => {
//   const [userData, setUserData] = useState(null);
//   const { privateKey, publicKey } = useSelector((state) => state.profile);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await getMyProfile();

//         if (response.success) {
//           setUserData(response.data);
//         } else {
//           console.error("Error: ", response.message);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   if (!userData) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Profile Information</h2>
//       <p><strong>Username:</strong> {userData.username}</p>
//       <p><strong>Email:</strong> {userData.email}</p>
//       <p><strong>Full Name:</strong> {userData.fullname}</p>
//       <p><strong>Created At:</strong> {new Date(userData.createdAt).toLocaleString()}</p>
//       <p><strong>Updated At:</strong> {new Date(userData.updatedAt).toLocaleString()}</p>
//       <hr className="my-3"/>
//       <h3 className="text-lg font-semibold">Keys</h3>
//       <p><strong>Public Key:</strong> {publicKey}</p>
//       <p><strong>Private Key:</strong> {privateKey}</p>
//     </div>
//   );
// };

// export default Profile;
