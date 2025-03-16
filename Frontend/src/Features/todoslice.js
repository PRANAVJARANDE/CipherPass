import { createSlice } from "@reduxjs/toolkit";
import forge from "node-forge";


const generateKeyPair = () => 
{
    const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
    return {
        privateKey: forge.pki.privateKeyToPem(privateKey),
        publicKey: forge.pki.publicKeyToPem(publicKey),
    };
};

const generatePublicKey = (privateKeyPem) => 
{
    try {
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
        const publicKey = forge.pki.rsa.setPublicKey(privateKey.n, privateKey.e);
        return forge.pki.publicKeyToPem(publicKey);
    } catch (error) {
        console.error("Invalid private key:", error);
        return null;
    }
};

const { privateKey, publicKey } = generateKeyPair();

const initialState = {
    privateKey,
    publicKey,
};

export const keySlice = createSlice({
    name: "keys",
    initialState,
    reducers: {
        setPrivateKey: (state, action) => {
            state.privateKey = action.payload;
            state.publicKey = generatePublicKey(action.payload);
        },
    },
});

// Exporting reducers
export const { setPrivateKey } = keySlice.actions;

// Connecting store with reducers
export default keySlice.reducer;
