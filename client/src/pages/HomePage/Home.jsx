import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HeroSection from "components/HomePage/HeroSection/HeroSection";
import Options from "components/HomePage/ConvenienceCenter/ConvenienceCenter";
import About from "components/HomePage/About/About";
import BaySideSystem from "components/HomePage/BaySideSystem/BaySideSystem";
import Specialty from "components/HomePage/Specialty/Specialty";
import Footer from "components/HomePage/Footer/Footer";
import SwipeNews from "components/HomePage/SwipeNews/SwipeNews";
import SupportUs from "components/HomePage/SupportUs/SupportUs";
import Map from "components/HomePage/Map/Map";

export default function Home(userRole) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>BaySide Hospital</title>
        </Helmet>
      </HelmetProvider>

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
        <BaySideSystem />
        <About />
        <SwipeNews />
        <Specialty />
        <SupportUs />
        <Map />
        <Footer />
      </main>
    </>
  );
}
