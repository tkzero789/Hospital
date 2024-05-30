import React from "react";
import HeroSection from "../../components/Home/HeroSection";
import Options from "../../components/Home/Options";
import About from "../../components/Home/About";
import BKCSystem from "../../components/Home/BaySideSystem";
import Specialty from "../../components/Home/Specialty";
import News from "../../components/Home/News";
import Footer from "../../components/Home/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Home(userRole) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>BaySide Hospital</title>
        </Helmet>
      </HelmetProvider>
      <div>
        {/* Main */}
        <main
          className={`${
            userRole === "admin" ||
            userRole === "head-doctor" ||
            userRole === "doctor"
              ? "main-padding-0"
              : "main-padding-1"
          }`}
        >
          <HeroSection />
          <Options />
          <About />
          <BKCSystem />
          <Specialty />
          <News />
          <Footer />
        </main>
      </div>
    </>
  );
}
