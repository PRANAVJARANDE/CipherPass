import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { useNavigate } from "react-router-dom";
import { getAllPasswords_Service } from "../../Service/Password.service";
import Loading from '../Loading/Loading.jsx'
import { PlusIcon } from "@heroicons/react/24/solid";

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
        <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA] flex flex-col">
            <Dashboard />
            {passwords.length>0 ? ( 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-20 justify-items-center">
                    {passwords.map((item, index) => (
                        <div
                        key={index}
                        className="bg-[#1B1F3B]  w-[500px] h-[200px] rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-[#4D869C] flex flex-col justify-center items-center"
                        onClick={() => {
                            console.log("navigate to id:", item._id);
                            navigate(`/passwords/${item._id}`);
                        }}
                        >
                        <h3 className="text-2xl font-bold text-gray-300 mb-3">
                            {index + 1}. {item.websiteName}
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
                    ))}
                    </div>

            ) : (
                <>
                    <Loading/>
                </>
            )}
            <button
                onClick={() => navigate("/add_password")}
                className="fixed bottom-8 right-8 bg-[#1B1F3B] hover:bg-[#1b3d53] shadow-lg shadow-[#082d3c]/50 text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
            >
                <PlusIcon className="w-10 h-10 stroke-2" />  
            </button>
        </div>
    );
}

export default AllPassword;
