import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  userToken: null, // Initial state
  setUserToken: () => {}, // Function to update userToken
  isLoggedIn: false, // Derived state
  setIsLoggedIn: () => {}, // Function to update isLoggedIn
});

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null); // Read initial token from cookies
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Derived state

  useEffect(() => {
    const _userToken = localStorage.getItem("userToken");
    if (_userToken) {
      setUserToken(_userToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (newToken) => {
    setUserToken(newToken);
    localStorage.setItem("userToken", newToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem("userToken"); // Remove token from cookie
    setIsLoggedIn(false);
  };

  const getUserRole = () => {
    if (!userToken) return null;
    try {
      // Decode the JWT token (assuming it's a JWT)
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
        setUserToken: login,
        isLoggedIn,
        setIsLoggedIn: logout,
        getUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
