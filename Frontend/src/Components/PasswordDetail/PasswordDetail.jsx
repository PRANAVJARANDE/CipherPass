import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../Dashboard";
import { get_A_Password_Service, sanitizeKey } from "../../Service/Password.service";
import { useSelector } from "react-redux";


const PasswordDetail = () => {
  const { id } = useParams();
  const [passwordData, setPasswordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const publicKey = useSelector((state) => sanitizeKey(state.publicKey));
  const privateKey = useSelector((state) => state.privateKey);

  useEffect(() => {
    const fetchPassword = async () => {
      if (!publicKey) {
        setError("Public key is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await get_A_Password_Service(id, publicKey,privateKey);
        if (response) {
          setPasswordData(response);
        } else {
          setError("Password details not found");
        }
      } catch (error) {
        console.error("Error fetching password:", error);
        setError("Failed to fetch password details");
      } finally {
        setLoading(false);
      }
    };
    fetchPassword();
  }, [id, publicKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] to-[#4D869C] text-[#F5F7FA] flex flex-col items-center">
      <Dashboard />
       
        {loading ? (
          <p className="text-center">Loading password details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : passwordData ? (
          <div className="relative mt-12 bg-opacity-30 backdrop-blur-lg p-14 rounded-2xl shadow-xl border border-gray-300/40 w-[600px] text-center">
           
          <div className="bg-white/10 p-6 rounded-lg shadow-lg space-y-4 text-left">
              <div className="flex items-center border-b border-gray-300/40 pb-2">
              <p><strong>Website name:</strong> {passwordData.websiteName}</p>

              </div>
              <div className="flex items-center border-b border-gray-300/40 pb-2">
              <p>
                <strong>Website URL:</strong>
                <a
                  href={passwordData.websiteURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline ml-1"
                >
                  {passwordData.websiteURL}
                </a>
              </p>

              </div>
              <div className="flex items-center border-b border-gray-300/40 pb-2">
              <p><strong>Username:</strong> {passwordData.username}</p>
              </div>
              <div className="flex items-center border-b border-gray-300/40 pb-2">
              <p><strong>Email:</strong> {passwordData.email}</p>

              </div>
              <div className="flex items-center border-b border-gray-300/40 pb-2">
              <p><strong>Password:</strong> {passwordData.password}</p>
              </div>
             
              
          </div>
      </div>
        ) : (
          <p className="text-center">Password details not found</p>
        )}
      
    </div>
  );
};

export default PasswordDetail;
