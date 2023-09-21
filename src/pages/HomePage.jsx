import React from "react";
import HeroSection from "../components/HeroSection";
import ReserveParking from "../components/ReserveParking";
import useEffect from "react";
function HomePage() {
  console.log("hompage");
  return (
    <div>
      <HeroSection />
      <ReserveParking />
    </div>
  );
}

export default HomePage; // Make sure you have this line
