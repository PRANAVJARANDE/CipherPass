import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { getAllPasswords_Service } from "../../Service/Password.service";

function AllPassword() {
    const [passwords, setPasswords] = useState([]);

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
            <div className="flex flex-wrap justify-center gap-8 p-8">
                {passwords.length > 0 ? (
                    passwords.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#1B1F3B] p-8 w-96 h-36 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-600 flex flex-col justify-center items-center"
                        >
                            <h3 className="text-2xl font-bold text-white mb-3">
                                {index + 1}. {item.websiteName}
                            </h3>
                            <a
                                href={item.websiteURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 text-lg hover:underline"
                            >
                                {item.websiteURL}
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-xl text-center w-full">No passwords found.</p>
                )}
            </div>
        </div>
    );
}

export default AllPassword;
