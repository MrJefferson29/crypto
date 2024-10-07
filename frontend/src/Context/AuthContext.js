import React, { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [activeUser, setActiveUser] = useState(null);  // Initialize as `null`
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
        setActiveUser(data.user);
      } catch (error) {
        localStorage.removeItem("authToken");
        setActiveUser(null);  // Set to `null` when user is not authenticated
      }
    };
    controlAuth();
  }, [config]);

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, config, setConfig }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
