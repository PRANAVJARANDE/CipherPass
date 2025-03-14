import React from 'react'
import { FaShieldAlt } from "react-icons/fa"; 

function Hero() {
    return (
        <div className="flex flex-col items-center justify-center flex-grow px-6 text-center">
            <h1 className="text-6xl font-extrabold leading-tight text-white animate-fadeIn">
            Secure & Manage Your <span className="text-[#81c3d7]">Passwords</span>
            </h1>
            <p className="text-lg mt-4 max-w-xl text-gray-200 animate-fadeIn">
            Keep all your credentials safe with <span className="font-bold">CipherPass</span>'s encrypted storage.
            </p>
            <FaShieldAlt className="mt-20 text-[#81c3d7] text-8xl animate-bounce transition-all duration-300 transform hover:scale-110" />
      </div>
    )
}

export default Hero
