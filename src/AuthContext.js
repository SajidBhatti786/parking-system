import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check for an existing access token in local storage during component initialization
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // If an access token exists, set the user as logged in
      setIsLoggedIn(true);
      setToken(accessToken);

      // Retrieve additional user information from local storage
      const storedEmail = localStorage.getItem("email");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      const storedUsername = localStorage.getItem("username");

      if (storedEmail) {
        setEmail(storedEmail);
      }
      if (storedRefreshToken) {
        setRefreshToken(storedRefreshToken);
      }
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const login = (authToken, userEmail, userRefreshToken, userUsername) => {
    setIsLoggedIn(true);
    setToken(authToken);
    setEmail(userEmail);
    setRefreshToken(userRefreshToken);
    setUsername(userUsername);

    // Store the token and user information in localStorage when the user logs in
    localStorage.setItem("accessToken", authToken);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("refreshToken", userRefreshToken);
    localStorage.setItem("username", userUsername);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setEmail("");
    setRefreshToken("");
    setUsername("");

    // Clear the token and user information from localStorage when the user logs out
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        token,
        email,
        refreshToken,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};