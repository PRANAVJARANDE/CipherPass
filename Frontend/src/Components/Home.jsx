import React, { useEffect, useState } from 'react';
import { checkisloggedIn, logoutUser } from '../Service/Auth.service.js';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(checkisloggedIn());
  },[]);

  const handleLogout = async() => {
    setIsLoggedIn(false);
    await logoutUser();
    navigate('/'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg w-96 h-96 flex flex-col justify-evenly">
        
        {isLoggedIn ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-10">Welcome Pranav Jarande!</h2>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        ) : (

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-10">Welcome to Our Site</h2>
            <button onClick={() => navigate('/login')} 
              className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg mr-4 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
            >
              Login
            </button>
            <button onClick={() => navigate('/register')} 
              className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition duration-300 ease-in-out"
            >
              Register
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;
