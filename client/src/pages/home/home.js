import React from "react";
import HeroSection from "../../components/Home/HeroSection";
import Options from "../../components/Home/Options";
import About from "../../components/Home/About";
import BKCSystem from "../../components/Home/BaySideSystem";
import Specialty from "../../components/Home/Specialty";
import Footer from "../../components/Home/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SwipeNews from "../../components/Home/SwipeNews";
import Extra from "../../components/Home/Extra";
import Map from "../../components/Home/Map";

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
        <BKCSystem />
        <About />
        <SwipeNews />
        <Specialty />
        <Extra />
        <Map />
        <Footer />
      </main>
    </>
  );
}
