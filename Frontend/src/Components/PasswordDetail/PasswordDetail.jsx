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
    <div className="password-detail">
      <Dashboard />
      {loading ? (
        <p>Loading password details...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : passwordData ? (
        <>
          <h2>Website: {passwordData.websiteName}</h2>
          <p>
            URL:{" "}
            <a href={passwordData.websiteURL} target="_blank" rel="noopener noreferrer">
              {passwordData.websiteURL}
            </a>
          </p>
          <p>
            <strong>Username:</strong> {passwordData.username}
          </p>
          <p>
            <strong>Email:</strong> {passwordData.email}
          </p>
          <p>
            <strong>Password:</strong> {passwordData.password}
          </p>
          <p>
            <strong>ID:</strong> {passwordData._id}
          </p>
        </>
      ) : (
        <p>Password details not found</p>
      )}
    </div>
  );
};

export default PasswordDetail;
