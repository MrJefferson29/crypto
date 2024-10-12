import React, { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [activeUser, setActiveUser] = useState(undefined);  // Undefined during the loading phase
  const [loading, setLoading] = useState(true); // Track if authentication is being checked
  const [config, setConfig] = useState({
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  useEffect(() => {
    const controlAuth = async () => {
      try {
        const { data } = await axios.get("https://crypto-euug.onrender.com/auth/private", config);
        setActiveUser(data.user);  // Set the user if authenticated
      } catch (error) {
        localStorage.removeItem("authToken");
        setActiveUser(null);  // No active user if authentication fails
      } finally {
        setLoading(false);  // Stop loading after the check is complete
      }
    };
    controlAuth();
  }, [config]);

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, config, setConfig, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
