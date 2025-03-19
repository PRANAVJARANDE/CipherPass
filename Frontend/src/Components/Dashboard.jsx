import React, { useEffect, useState } from "react";
import { checkisloggedIn, logoutUser } from "../Service/Auth.service.js";
import { useNavigate, NavLink } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(checkisloggedIn());
    }, []);

    const navItems = [
        ...(isLoggedIn ? [
            { name: "Home", path: "/" },
            { name: "Passwords", path: "/passwords" },
            { name: "Keys", path: "/keys" },
            { name: "Profile", path: "/profile" },
        ] : []), 
    ];

    const handleLogout = async () => {
        setIsLoggedIn(false);
        await logoutUser();
        navigate("/");
      };

    return (
        <nav className="w-full flex justify-between items-center px-5 py-3 bg-[#1B1F3B]/80 backdrop-blur-md border-b border-[#4D869C] shadow-md">
         <div className="flex items-center space-x-2">
            <FaShieldAlt className="text-[#81c3d7] text-3xl cursor-pointer hover:scale-110 transition-transform" />
            <h1 className="text-2xl font-extrabold tracking-wide text-white">
            Cipher<span className="text-[#81c3d7]">Pass</span>
            </h1>
         </div>

        <div className="flex space-x-16 text-xl font-medium">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `transition-all duration-300 transform hover:scale-105 hover:text-[#81c3d7] ${
                  isActive
                    ? "text-[#81c3d7] font-semibold border-b-4 border-[#81c3d7] pb-1"
                    : "text-white font-normal"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-[#3A7CA5] text-white rounded-full shadow-lg shadow-[#3A7CA5]/50 hover:bg-[#81c3d7] transition-all transform hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-[#3A7CA5] text-white rounded-full shadow-lg shadow-[#3A7CA5]/50 hover:bg-[#81c3d7] transition-all transform hover:scale-105"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    )
}

export default Dashboard
