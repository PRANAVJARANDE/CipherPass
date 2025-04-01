import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { useNavigate } from "react-router-dom";
import { getAllPasswords_Service } from "../../Service/Password.service";
import Loading from '../Loading/Loading.jsx'
import { PlusIcon } from "@heroicons/react/24/solid";
import Footer from "../Footer.jsx";

function AllPassword() {
    const [passwords, setPasswords] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllPasswords_Service();
            setPasswords(data);
        };
        fetchData();
    }, []);

    return (
<div className="min-h-[110vh] flex flex-col bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA]">
    <Dashboard />
    
    <div className="flex-grow">
        {passwords.length > 0 ? (
            <div className="flex flex-col items-center space-y-4 p-10 w-full">
                {passwords.map((item, index) => (
                    <div
                        key={index}
                        className="group bg-[#1B1F3B] w-full max-w-4xl h-[100px] rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#4D869C] 
                        flex items-center px-6 cursor-pointer transform hover:scale-105"
                        onClick={() => navigate(`/passwords/${item._id}`)}
                    >
                        <div className="flex items-center space-x-4">
                            <h3 className="text-xl font-bold text-gray-300">
                                {index + 1}. {item.websiteName} :
                            </h3>
                            <a
                                href={item.websiteURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#81c3d7] text-lg hover:underline"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {item.websiteURL}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <Loading />
        )}
    </div>

    {/* Floating + Button (unchanged) */}
    <button
        onClick={() => navigate("/add_password")}
        className="fixed bottom-8 right-8 bg-[#1B1F3B] hover:bg-[#1b3d53] shadow-lg shadow-[#082d3c]/50 text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
    >
        <PlusIcon className="w-10 h-10 stroke-2" />  
    </button>

    <Footer />
</div>

    );
}

export default AllPassword;
