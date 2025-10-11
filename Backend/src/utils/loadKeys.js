import { Key } from "../models/keys.models.js";

export const getPublicKey = async () => {
  try {
    const keyDoc = await Key.findOne({});
    if (!keyDoc || !keyDoc.publicKey) {
      console.error("[KEY LOAD ERROR] Public key not found in database");
      return null;
    }
    return keyDoc.publicKey;
  } catch (err) {
    console.error("[KEY LOAD ERROR] Failed to fetch public key from DB:", err.message);
    return null;
  }
};

export const getPrivateKey = async () => {
  try {
    const keyDoc = await Key.findOne({});
    if (!keyDoc || !keyDoc.privateKey) {
      console.error("[KEY LOAD ERROR] Private key not found in database");
      return null;
    }
    return keyDoc.privateKey;
  } catch (err) {
    console.error("[KEY LOAD ERROR] Failed to fetch private key from DB:", err.message);
    return null;
  }
};
