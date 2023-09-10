import logo from "./logo.svg";
import "./App.css";
// import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import ParkingSlots from "./components/ParkingSlots";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      {/* <h1>App</h1> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/parking-slots" element={<ParkingSlots />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* <Route path="/navbar" element={<Navbar />}></Route> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
