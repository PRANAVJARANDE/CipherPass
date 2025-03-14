import React, { useEffect, useState } from 'react';
import { checkisloggedIn, logoutUser } from '../Service/Auth.service.js';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";



 function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(checkisloggedIn());
  }, []);

  const handleLogout = async() => {
         setIsLoggedIn(false);
         await logoutUser();
         navigate('/'); 
       };

       return (
        <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA] flex flex-col">
          {/* Navbar */}
          <nav className="w-full flex justify-between items-center p-4 bg-[#1B1F3B]/80 backdrop-blur-md border-b border-[#4D869C]">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold">PassMan</h1>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-[#81c3d7] transition-colors">All Passwords</a>
              <a href="#" className="hover:text-[#81c3d7] transition-colors">Private Key</a>
              <a href="#" className="hover:text-[#81c3d7] transition-colors">Add Password</a>
              <a href="#" className="hover:text-[#81c3d7] transition-colors">Dashboard</a>
            </div>
            <div>
              {isLoggedIn ? (
            <button
            onClick={handleLogout}
            className=" px-6 py-3 bg-[#3A7CA5] text-white rounded-full shadow-lg shadow-[#3A7CA5]/50 hover:bg-[#81c3d7] transition-all"
          >
            Logout
          </button>
          ) : (
            <button
            onClick={() => navigate('/login')}
            className=" px-6 py-3 bg-[#3A7CA5] text-white rounded-full shadow-lg shadow-[#3A7CA5]/50 hover:bg-[#81c3d7] transition-all"
          >
            Login
          </button>

          )}
            </div>
          </nav>
    
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center flex-grow px-6 text-center">
            <h1 className="text-5xl font-extrabold leading-tight">
              Secure & Manage Your Passwords
            </h1>
            <p className="text-lg mt-4 max-w-xl">
              Keep all your credentials safe with PassMan’s encrypted storage.
            </p>
            <button className="mt-6 px-6 py-3 bg-[#3A7CA5] text-white rounded-full shadow-lg shadow-[#3A7CA5]/50 hover:bg-[#81c3d7] transition-all">
              Get Started
            </button>
          </div>
        </div>
      );
    }

    
export default Home;