import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import ParkingSlots from "./components/ParkingSlots";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import { useAuth } from "./AuthContext"; // Import the useAuth hook from your AuthContext file
import { useEffect } from "react";
import AdminPage from "./pages/AdminPage";

function App() {
  const auth = useAuth(); // Use the useAuth hook to access authentication state

  useEffect(() => {
    // Check for an existing access token in local storage
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !auth.isLoggedIn) {
      // If an access token exists and the user is not already logged in,
      // set the user as logged in
      auth.login(accessToken);
    }
  }, [auth]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Login page is accessible to everyone */}
        <Route path="/login" element={<Login />} />

        {/* Signup page is also accessible to everyone */}
        <Route path="/signup" element={<Signup />} />

        {/* Other protected routes */}
        {auth.isLoggedIn ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/parking-slots" element={<ParkingSlots />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </>
        ) : (
          // Redirect to the login page if not logged in
          <>
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
