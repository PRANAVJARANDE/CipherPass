import { useState , useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, EyeSlashIcon, PencilIcon } from "@heroicons/react/24/outline"; 
import Dashboard from "../Dashboard.jsx";
import toast from "react-hot-toast";
import { sanitizeKey } from "../../Service/Password.service.js";

const PrivateKey = () => {
  const storedKey = useSelector((state) => sanitizeKey(state.privateKey)); // Get private key from Redux
  const [privateKey, setKey] = useState(storedKey || ""); // Initialize with stored key
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const dispatch = useDispatch();
  const [showKey, setShowKey] = useState(false);
  const inputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.select(); // Auto-select text
    }, 100);
  };


  const handleSave = (e) => {
    e.preventDefault();
    if (!privateKey.trim()) {
      toast.error("Private key cannot be empty!");
      return;
    }
    //dispatch(setPrivateKey(privateKey));
    toast.success("Private Key Saved Successfully!");
    setIsEditing(false); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA] flex flex-col">
      <Dashboard />

      <div className="flex justify-center items-center min-h-screen mt-[-80px] ">

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-[60rem] max-w-full mx-auto h-auto min-h-[18rem] border border-[#4D869C]">
          <h2 className="text-2xl font-semibold text-center mb-4">Your Private Key</h2>
          <p className="text-gray-400 text-lg text-center mb-4">
            Please enter your private key to access your passwords.
          </p>
          <form onSubmit={handleSave} className="relative">
            <div className="flex items-center border rounded-lg bg-gray-700 p-3 mb-2">
              <input
                ref={inputRef}
                type={showKey ? "text" : "password"}
                placeholder="Enter your private key"
                value={privateKey}
                readOnly={!isEditing}
                onChange={(e) => setKey(e.target.value)}
                className="w-full bg-transparent text-white outline-none"
              />
              {/* Toggle Visibility Button */}
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-gray-400 hover:text-white ml-2"
              >
                {showKey ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
              {/* Edit Button */}
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="text-gray-400 hover:text-white ml-2"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
              )}
            </div>
            {isEditing && (
              <button
                type="submit"
                className="w-full mt-3 px-6 py-3 bg-[#3A7CA5] text-white rounded-lg shadow-lg shadow-[#3A7CA5]/50 hover:bg-[#81c3d7] transition-all transform hover:scale-105 placeholder-gray-400 placeholder-opacity-50"
              >
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrivateKey;