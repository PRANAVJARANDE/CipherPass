import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../Dashboard";

const PasswordDetail = () => {
  const { id } = useParams(); // Get ID from URL params
  console.log("Password ID:", id); // Debugging
  const [passwordData, setPasswordData] = useState(null);
 

  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const response = await getSinglePassword(id);
        
        if (response.success) {
          setPasswordData(response.data);
        } else {
          console.error("Error: ", response.message);
        }
      } catch (error) {
        console.error("Error fetching password:", error);
      } 
    };
    fetchPassword();
  }, [id]);

 

  return (
    <div className="password-detail">
      <Dashboard />
      {passwordData ? (
        <>
          <h2>Website: {passwordData.websiteName}</h2>
          <p>
            URL:{" "}
            <a href={`https://${passwordData.websiteURL}`} target="_blank">
              {passwordData.websiteURL}
            </a>
          </p>
          <h3>Decrypted Password: {passwordData.decryptedPassword}</h3>
        </>
      ) : (
        <p>Password details not found</p>
      )}
    </div>
  );
};

export default PasswordDetail;
