import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Dashboard from "../Dashboard.jsx";
import toast from "react-hot-toast";
import { regeneratePrivateKey } from "../../Features/todoslice.js";

const PrivateKey = () => {
  const privateKey = useSelector((state) => state.privateKey);
  const publicKey = useSelector((state) => state.publicKey);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showPublicKey, setShowPublicKey] = useState(false);
  const dispatch = useDispatch();

  const changeKeys = () => {
    dispatch(regeneratePrivateKey());
    toast.success("Keys Changed Successfully!");
  };
  const getMaskedKey = (key, show) => (show ? key : "**************************************************************************************\n".repeat(27));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA] flex flex-col">
      <Dashboard />
      <div className="flex flex-col justify-center items-center min-h-screen px-6 py-10">
        <div className="flex flex-wrap gap-6 w-full max-w-8xl">
          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg min-h-[24rem] border border-[#4D869C]">
            <h2 className="text-2xl font-semibold text-center mb-4">Your Private Key</h2>
            <div className="relative">
              <textarea type={showPrivateKey ? "text" : "password"} value={getMaskedKey(privateKey, showPrivateKey)} readOnly rows={28}
                className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none resize-none"/>
              <button type="button" onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white">
                {showPrivateKey ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg min-h-[24rem] border border-[#4D869C]">
            <h2 className="text-2xl font-semibold text-center mb-4">Your Public Key</h2>
            <div className="relative">
              <textarea type={showPublicKey ? "text" : "password"} value={getMaskedKey(publicKey, showPublicKey)} readOnly rows={28}
                className="w-full bg-gray-700 text-white p-3 rounded-lg outline-none resize-none"/>
              <button type="button" onClick={() => setShowPublicKey(!showPublicKey)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white">
                {showPublicKey ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={changeKeys}
        className=" mt-1 mx-20 mb-10 bg-[#082d3c] text-white px-6 py-3 rounded-lg shadow-lg shadow-[#082d3c]/50 hover:bg-[#3B6F87] transition-all  max-w-full text-lg font-semibold"
      >
        Regenerate Keys
      </button>
    </div>
    
  );
};

export default PrivateKey;
