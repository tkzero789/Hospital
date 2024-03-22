import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const _userToken = localStorage.getItem("userToken");
    if (_userToken) {
      setUserToken(_userToken);
      setLoggedIn(true);
    }
  }, []);

  const login = (newToken) => {
    setLoggedIn(true);
    localStorage.setItem("userToken", newToken);
    setUserToken(newToken);
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("userToken");
    setUserToken(null);
  };

  const getUserRole = () => {
    if (!userToken) return null;
    try {
      const decodedToken = jwtDecode(userToken);
      if (decodedToken && decodedToken.role) {
        console.log(decodedToken);
        return decodedToken.role;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        loggedIn,
        login,
        logout,
        getUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
