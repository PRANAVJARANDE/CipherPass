import { toast } from 'react-hot-toast';
const backendURL = import.meta.env.VITE_BACKEND_URL;
import forge from "node-forge";

export const getAllPasswords_Service = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${backendURL}/password/allpasswords`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.status === 200)return data.data;
      else return {};
    } 
    catch (error) 
    {
      toast.error('Failed to Load Passwords');
      return null;
    }
};

const importPublicKey = async (pem) => {
    try {
        const pemContents = pem
            .replace(/-----BEGIN PUBLIC KEY-----/g, '')
            .replace(/-----END PUBLIC KEY-----/g, '')
            .replace(/[^A-Za-z0-9+/=]/g, ''); 

        const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

        return await window.crypto.subtle.importKey(
            "spki",
            binaryDer.buffer,
            {
                name: "RSA-OAEP",
                hash: "SHA-256"
            },
            false,
            ["encrypt"]
        );
    } catch (err) {
        console.error("Import Public Key Error:", err);
        throw err;
    }
};


const encryptPassword = async (password,key) => {
    try {
        const publicKey = await importPublicKey(key);
        console.log("pv ",publicKey);
        const encrypted = await window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            publicKey,
            new TextEncoder().encode(password)
        );
        return btoa(String.fromCharCode(...new Uint8Array(encrypted))); 
    } catch (error) {
        return null;
    }
};


export const importPrivateKey = (privateKeyPem) => {
    try {
        if (!privateKeyPem.includes("-----BEGIN RSA PRIVATE KEY-----")) {
            throw new Error("Invalid Private Key Format");
        }
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
        return privateKey;
    } catch (error) {
        throw error;
    }
};

export const decryptPassword = (encryptedPassword, privateKeyPem) => {
    try {
        const privateKey = importPrivateKey(privateKeyPem);
        const encryptedBytes = forge.util.decode64(encryptedPassword);
        const encryptedBuffer = forge.util.createBuffer(encryptedBytes, "raw");
        const decryptedPassword = privateKey.decrypt(encryptedBuffer.getBytes(), "RSA-OAEP", {
            md: forge.md.sha256.create(), 
        });
        return decryptedPassword;
    } catch (error) {
        return null;
    }
};

export const addPassword_Service = async ({username,websiteName,websiteURL,email,password}) => {
    try {
        const token = localStorage.getItem('accessToken');
        const key=await fetchServerPublicKey();

        console.log("key - ",key);
        const encryptedpassword=await encryptPassword(password,key);  
        console.log("encrypted - ",encryptedpassword)
        const userData={encryptedpassword,username,websiteName,websiteURL,email};
        const response = await fetch(`${backendURL}/password/addpassword`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            body: JSON.stringify(userData),
            });
        
        if (response?.status === 201) 
        {
            toast.success("Password Added");
            return true;
        }
        else 
        {
            const data = await response.json();
            toast.error(data?.message || "Adding Password failed")
            return false;
        }

    } catch (error) {
        toast.error('Server Error');
        console.error(error);
        return false;
    }
};

export const sanitizeKey = (key) => {
    return key
        .replace(/-----BEGIN [A-Z ]+-----/g, '') 
        .replace(/-----END [A-Z ]+-----/g, '')  
        .replace(/\r?\n|\r/g, '')               
        .trim();                                
};

export const get_A_Password_Service = async (id, publicKey,privateKey) => {
    try {
        const token = localStorage.getItem('accessToken'); 
        const response = await fetch(`${backendURL}/password/getpassword/${id}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ text: publicKey }),
        });

        const data = await response.json();
        const {encryptedPassword,websiteName,websiteURL,username,email}=data.data;
        const password=decryptPassword(encryptedPassword,privateKey);
        if (response.status === 200) return {password,websiteName,websiteURL,username,email};
        else {
            toast.error("Error fetching Password");
            return null;
        }
    } catch (error) {
        toast.error('Server Error');
        return false;
    }
};

export const updatePassword_Service = async (userData) => {
    try {
  
        const token = localStorage.getItem('accessToken');
        const {password,username,websiteName,websiteURL,email,id}=userData;
        const toPass={};
        const key=await fetchServerPublicKey();
           
                if(password)toPass.password=await encryptPassword(password,key); 
                if(username)toPass.username=username;
                if(websiteName)toPass.websiteName=websiteName;
                if(websiteURL)toPass.websiteURL=websiteURL;
                if(email)toPass.email=email;
                const response = await fetch(`${backendURL}/password/updatePassword/${id}`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(toPass),
            });
            
            if (response?.status === 201 || response?.status === 200) 
            {
                const updatedData = await response.json();
                toast.success("Updated Successfully");
                return updatedData;
            }
            else 
            {
                const data = await response.json();
                toast.error(data?.message || "Updating Password failed")
                return false;
            }
        
    } catch (error) {
        toast.error('Server Error');
        console.error("Request failed:", error);
        return false;
    }
};

export const fetchServerPublicKey = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${backendURL}/password/getserverpublickey`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
    
     if(!response.ok){
         throw new Error(`Server responded with status ${response.status}`);
     }
    const data = await response.json();
    if (!data?.publicKey) {
      throw new Error("Public key not available");
    }
    return data.publicKey;
  } catch (error) {
    console.error("[KEY SERVICE ERROR]", error.message);
    throw error;
  }
};

export const delete_A_Password_Service = async (id) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${backendURL}/password/deletePassword/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.status === 200) {
            toast.success("Password deleted successfully");
            return data;
        } else {
            toast.error("Error deleting password");
            return null;
        }
    } catch (error) {
        toast.error("Server Error");
        return false;
    }
};

