import fs from "fs";
import path from "path";

const keysDir = path.join(process.cwd(), "src", "Keys");

const readPemFile = (filePath) => {
  try {
    const absolutePath = path.resolve(filePath);
    const pemContent = fs.readFileSync(absolutePath, "utf-8").trim();
    return `\`${pemContent}\``;
  } catch (err) {
    console.error(`[KEY LOAD ERROR] Failed to read ${filePath}:`, err.message);
    return null;
  }
};

export const getPublicKey = () => {
  return readPemFile(path.join(keysDir, "publickey.pem"));
};

export const getPrivateKey = () => {
  return readPemFile(path.join(keysDir, "privatekey.pem"));
};
