import React from 'react'

function Profile() {
    return (
        <>
            
        </>
    )
}

export default Profile


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setPrivateKey } from '../../Features/storeslice.js';
// import { Eye, EyeOff } from 'lucide-react'; 
// import Dashboard from '../Dashboard';
// import { getMyProfile } from '../../Service/Auth.service';
// import Loading from '../Loading/Loading.jsx';

// function Profile() {
//     const [user, setUser] = useState(null);
//     const [showPrivateKey, setShowPrivateKey] = useState(false);
//     const privateKey = useSelector((state) => state.privatekey);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const data = await getMyProfile();
//             setUser(data);
//         };
//         fetchUserProfile();
//         console.log(privateKey);
//     }, []);

//     const handlePrivateKeyChange = (e) => {
//         dispatch(setPrivateKey(e.target.value));    
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA] flex flex-col items-center">
//             <Dashboard />
            
//             {user ? (
//                 <>
//                     <div className="relative mt-12 bg-opacity-30 backdrop-blur-lg p-14 rounded-2xl shadow-xl border border-gray-300/40 w-96 text-center">
//                         <h2 className="text-4xl font-bold text-[#F5F7FA] mb-6">Welcome, {user.fullname}! 👋</h2>
//                         <div className="bg-white/10 p-6 rounded-lg shadow-lg space-y-4 text-left">
//                             <div className="flex justify-between items-center border-b border-gray-300/40 pb-2">
//                                 <span className="text-lg font-medium text-gray-200">Email:</span>
//                                 <span className="text-lg font-semibold">{user.email}</span>
//                             </div>
//                             <div className="flex justify-between items-center border-b border-gray-300/40 pb-2">
//                                 <span className="text-lg font-medium text-gray-200">Username:</span>
//                                 <span className="text-lg font-semibold">@{user.username}</span>
//                             </div>
//                             <div className="flex justify-between items-center">
//                                 <span className="text-lg font-medium text-gray-200">Created At:</span>
//                                 <span className="text-lg font-semibold">{new Date(user.createdAt).toLocaleDateString()}</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Private Key Input Form with Eye Icon */}
//                     <div className="mt-8 bg-opacity-30 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-300/40 w-96">
//                         <h3 className="text-2xl font-semibold text-[#F5F7FA] mb-4 text-center">Enter Private Key</h3>
//                         <div className="relative">
//                             <input
//                                 type={showPrivateKey ? "text" : "password"}
//                                 value={privateKey}
//                                 onChange={handlePrivateKeyChange}
//                                 placeholder="Enter your private key"
//                                 className="w-full px-4 py-3 rounded-lg text-lg text-gray-900 bg-white/20 backdrop-blur-lg border border-gray-300/40 focus:outline-none focus:ring-2 focus:ring-[#4D869C] pr-12"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPrivateKey(!showPrivateKey)}
//                                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
//                             >
//                                 {showPrivateKey ? <EyeOff size={24} /> : <Eye size={24} />}
//                             </button>
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <Loading />
//             )}
//         </div>
//     );
// }

// export default Profile;
