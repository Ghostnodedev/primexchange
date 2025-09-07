// app/utils/crypo.js
import CryptoJS from "crypto-js";

const SECRET_KEY = "my-secret-key"; // keep it same everywhere

export const encryptData = (data) => {
  try {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  } catch (err) {
    console.error("Encryption failed:", err);
    return null;
  }
};

export const decryptData = (encryptedData) => {
  try {
    if (!encryptedData || encryptedData.trim() === "") {
      return null; // nothing stored
    }
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      return null; // failed decryption
    }
    return JSON.parse(decrypted);
  } catch (err) {
    console.error("Decryption failed:", err);
    return null;
  }
};
