import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { useNavigate } from "react-router-dom";
import { delete_A_Password_Service, getAllPasswords_Service ,sanitizeKey} from "../../Service/Password.service";
import Loading from '../Loading/Loading.jsx';
import { PlusIcon } from "@heroicons/react/24/solid";
import { FaTrash } from "react-icons/fa"; 
import Footer from "../Footer.jsx";
import PasswordSimilarityChecker from "./PasswordSimilarity.jsx";
import { useSelector } from "react-redux";



function AllPassword() {
    const [passwords, setPasswords] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const navigate = useNavigate();
      const publicKey = useSelector((state) => sanitizeKey(state.publicKey));
  const privateKey = useSelector((state) => state.privateKey);

    const [showpromt,setprompt] = useState(false);
    const [id,setid]=useState(null);

const fetchPasswords = async () => {
  try {
    setIsLoading(true);
    const data = await getAllPasswords_Service();
    // ✅ Ensure it's always an array
    setPasswords(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error fetching passwords:", error);
    setPasswords([]); // fallback safe value
  } finally {
    setIsLoading(false);
  }
};


    useEffect(() => {
        fetchPasswords();
    }, []);

    const handleDelete = async (id) => {
            setprompt(1)
            setid(id);
    };
    console.log(passwords);

    return (
        <div className="min-h-[110vh] flex flex-col bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA]">
            <Dashboard />
            {showpromt && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div className="bg-[#1B1F3B] p-6 rounded-lg shadow-lg border border-white/30 z-10 flex flex-col items-center w-80">
                <p className="text-white text-center mb-4">Are you sure you want to delete password</p>
                <div className="flex gap-4">
                    <button
                        onClick={async()=>{
                            await delete_A_Password_Service(id);
                            await fetchPasswords();
                            setprompt(false);
                        }}
                        className="px-4 py-2 bg-white text-[#1B1F3B] rounded hover:scale-105 transition-all"
                    >
                        Yes
                    </button>
                    <button
                        onClick={()=>{
                            setprompt(false);
                        }}
                        className="px-4 py-2 border border-white/50 rounded hover:scale-105 transition-all text-white"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
            )}

<PasswordSimilarityChecker
  allPasswordEntries={passwords}
  publicKey={publicKey}
  privateKey={privateKey}
/>

<div className="flex-grow p-6 sm:p-10">
                {isLoading ? (
                    <Loading />
                ) : passwords.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {passwords.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#1B1F3B] rounded-lg shadow-lg border border-[#4D869C] 
                                flex flex-col items-start justify-start p-6 cursor-pointer 
                                hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative"
                                onClick={() => navigate(`/passwords/${item._id}`)}
                            >
                                <h3 className="text-xl font-bold text-gray-300 mb-4 break-words whitespace-normal">
                                    {index + 1}. {item.websiteName}
                                </h3>

                                <p className="text-gray-400 mb-2 break-words whitespace-normal">
                                    <span className="font-semibold">Email:</span> {item.email}
                                </p>

                                <p className="text-gray-400 mb-2 break-words whitespace-normal">
                                    <span className="font-semibold">Username:</span> {item.username}
                                </p>

                                <p className="text-gray-400 mb-2 break-words whitespace-normal">
                                    <span className="font-semibold">Website URL:</span>{" "}
                                    <a
                                        href={item.websiteURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#81c3d7] hover:underline break-words whitespace-normal"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {item.websiteURL}
                                    </a>
                                </p>

                                <p className="mt-2 text-sm text-gray-400">Click to view details</p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(item._id);
                                    }}
                                    className="absolute top-4 right-4 border border-white/50 bg-transparent p-2 rounded-full transition-all z-10 hover:bg-white/10 hover:scale-110"
                                >
                                    <FaTrash className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="fixed inset-0 flex items-center justify-center ">
  <div className="bg-[#1B1F3B] rounded-lg shadow-lg border border-[#4D869C] 
                  flex flex-col items-center justify-center p-16 cursor-default 
                  hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center">
    <p className="text-2xl font-bold text-gray-300 mb-4">No passwords added yet 🔒</p>
    <p className="text-gray-400 mb-6">Click “Add Password” below to get started and keep your credentials safe.</p>
    <button
      onClick={() => navigate("/add_password")}
      className="bg-[#1B1F3B] border border-[#4D869C] hover:bg-[#23304a] text-[#81c3d7] font-semibold py-2 px-4 rounded transition-all duration-300"
    >
      Add Password
    </button>
  </div>
</div>


                )}
            </div>
            
            


            {/* Floating + Button */}
            <div className="fixed bottom-20 right-8 flex flex-col items-center">
                <span className="text-white text-lg sm:text-xl font-bold mb-3 drop-shadow-lg">
                    Add Password
                </span>
                <button
                    onClick={() => navigate("/add_password")}
                    className="bg-[#1B1F3B] hover:bg-[#1b3d53] shadow-lg shadow-[#082d3c]/50 text-white text-4xl sm:text-5xl font-bold w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                >
                    <PlusIcon className="w-12 h-12 stroke-2" />
                </button>
            </div>

            <Footer />
        </div>
    );
}

export default AllPassword;
