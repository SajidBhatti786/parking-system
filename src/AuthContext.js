import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Check for an existing access token in local storage during component initialization
    const loadData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        // If an access token exists, set the user as logged in
        setIsLoggedIn(true);
        setToken(accessToken);
        const storedEmail = localStorage.getItem("email");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        const storedUsername = localStorage.getItem("username");
        const storedUserId = localStorage.getItem("userId");
        console.log(
          storedEmail,
          storedRefreshToken,
          storedUsername,
          storedUserId
        );

        // Retrieve additional user information from local storage

        console.log(
          storedEmail,
          storedRefreshToken,
          storedUsername,
          storedUserId
        );
        // Check if each item is not undefined or null before setting the state
        if (storedEmail !== undefined && storedEmail !== null) {
          setEmail(storedEmail);
        }
        if (storedRefreshToken !== undefined && storedRefreshToken !== null) {
          setRefreshToken(storedRefreshToken);
        }
        if (storedUsername !== undefined && storedUsername !== null) {
          setUsername(storedUsername);
        }
        if (storedUserId !== undefined && storedUserId !== null) {
          setUserId(storedUserId);
        }
      }
    };
    loadData();
  }, []);

  const login = (
    authToken,
    userEmail,
    userRefreshToken,
    userUsername,
    userId
  ) => {
    console.log(authToken, userEmail, userRefreshToken, userUsername, userId);
    setIsLoggedIn(true);
    setToken(authToken);
    setEmail(userEmail);
    setRefreshToken(userRefreshToken);
    setUsername(userUsername);
    setUserId(userId);
    console.log(authToken, userId, username);

    // Store the token and user information in localStorage when the user logs in
    if (typeof localStorage !== "undefined") {
      // localStorage is available, you can use it here
      console.log("local storage is available");
    } else {
      // localStorage is not available, handle this situation
      console.log("local storage is not available");
    }
    try {
      localStorage.setItem("accessToken", authToken);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("refreshToken", userRefreshToken);
      localStorage.setItem("username", userUsername);
      localStorage.setItem("userId", userId);
      console.log(localStorage.getItem("accessToken"));
      console.log(localStorage.getItem("refreshToken"));
      console.log(localStorage.getItem("username"));
      console.log(localStorage.getItem("userId"));
    } catch (err) {
      console.log("error string local storage", err);
    }

    // Set the userId state after storing it in localStorage
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setEmail("");
    setRefreshToken("");
    setUsername("");
    setUserId("");

    // Clear the token and user information from localStorage when the user logs out
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
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
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
