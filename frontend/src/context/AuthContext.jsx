import React, { createContext, useState, useContext } from "react";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

const SECRET_KEY = "atmviteReact-insecure-d@)jhe*^ob@=z)pi7=fc16^4yq$3g58zu(+@t8_tf2!p1g$yom";

export const AuthProvider = ({ children }) => {

  const encrypted = localStorage.getItem("atm_user");
  let existing = null;

  if (encrypted) {
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      existing = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      console.error("Decryption failed:", e);
      existing = null;
    }
  }

  const [user, setUser] = useState(existing);

  const login = (userData) => {
    setUser(userData);
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(userData),
      SECRET_KEY
    ).toString();
    localStorage.setItem("atm_user", encryptedData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("atm_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
