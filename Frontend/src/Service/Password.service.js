import { toast } from 'react-hot-toast';

const backendURL = import.meta.env.VITE_BACKEND_URL;

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

const PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHSGCsDvqhLCCL+t9gOcc+5KyRhN
r4IX1laBamQro+YxtGfJX/NSxSjb6W8MspGC0cGYm/w3rI7R5riKqjTGt2YOoDYC
RUnlIZKBNp3wdnNv6qm3e5h/7NIu9dCcIRjfLJ/28osskgKwccnq010AHFsWljiO
lekKkK5TFHFrpsR1AgMBAAE=
-----END PUBLIC KEY-----`;

const importPublicKey = async (pem) => {
    const binaryDerString = atob(pem.replace(/(-----(BEGIN|END) PUBLIC KEY-----|\n)/g, ''));
    const binaryDer = new Uint8Array(binaryDerString.length)
        .map((_, i) => binaryDerString.charCodeAt(i));

    return await window.crypto.subtle.importKey(
        "spki",
        binaryDer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256"
        },
        false,
        ["encrypt"]
    );
};

const encryptPassword = async (password) => {
    try {
        const publicKey = await importPublicKey(PUBLIC_KEY_PEM);
        const encrypted = await window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            publicKey,
            new TextEncoder().encode(password)
        );
        return btoa(String.fromCharCode(...new Uint8Array(encrypted))); 
    } catch (error) {
        console.error("Encryption Error:", error);
        return null;
    }
};

export const addPassword_Service = async ({username,websiteName,websiteURL,email,password}) => {
    try {
        const token = localStorage.getItem('accessToken');
        const encryptedpassword=await encryptPassword(password);  
        console.log(encryptedpassword);
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

export const get_A_Password_Service = async (id, publicKey) => {
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
        //console.log(data.data);
        if (response.status === 200) return data.data;
        else {
            toast.error("Error fetching Password");
            return null;
        }
    } catch (error) {
        toast.error('Server Error');
        console.error(error);
        return false;
    }
};




