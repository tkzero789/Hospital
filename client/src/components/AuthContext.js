import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie"; // Import the 'useCookies' hook
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext({
  userToken: null, // Initial state
  setUserToken: () => {}, // Function to update userToken
  isLoggedIn: false, // Derived state
  setIsLoggedIn: () => {}, // Function to update isLoggedIn
});

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userToken"]);
  const [userToken, setUserToken] = useState(null); // Read initial token from cookies
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Derived state

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      console.log(storedToken);
      setUserToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []); // Update state on cookie changes

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
        setUserToken,
        isLoggedIn,
        setIsLoggedIn,
        getUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
