import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const navigate = useNavigate;

  useEffect(() => {
    const _userToken = localStorage.getItem("userToken");
    if (_userToken) {
      const decodedToken = jwtDecode(_userToken);
      if (decodedToken && Date.now() >= decodedToken.exp * 1000) {
        logout();
        navigate("/signin");
        return;
      }
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

  const getUserId = () => {
    if (!userToken) return null;
    try {
      const decodedToken = jwtDecode(userToken);
      if (decodedToken && decodedToken.userId) {
        return decodedToken.userId;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    return null;
  };

  const getUserRole = () => {
    if (!userToken) return null;
    try {
      const decodedToken = jwtDecode(userToken);
      if (decodedToken && decodedToken.role) {
        return decodedToken.role;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    return null;
  };

  const getUserInfos = () => {
    if (!userToken) return null;
    try {
      const decodedToken = jwtDecode(userToken);
      if (decodedToken && decodedToken.userInfos) {
        return decodedToken.userInfos;
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
        getUserId,
        getUserInfos,
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
