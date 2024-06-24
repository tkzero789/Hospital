import React from "react";
import HeroSection from "components/HomePage/HeroSection/HeroSection";
import Options from "components/HomePage/ConvenienceCenter/ConvenienceCenter";
import About from "components/HomePage/About/About";
import BKCSystem from "components/HomePage/BaySideSystem/BaySideSystem";
import Specialty from "components/HomePage/Specialty/Specialty";
import Footer from "components/HomePage/Footer/Footer";
import MainNav from "components/Navbar/MainNav/MainNav";
import SubNav from "components/Navbar/SubNav/SubNav";
import MobileNav from "components/Navbar/MobileNav/MobileNav";
import SwipeNews from "components/HomePage/SwipeNews/SwipeNews";
import SupportUs from "components/HomePage/SupportUs/SupportUs";
import Map from "components/HomePage/Map/Map";

export default function staffHome() {
  return (
    <>
      <header>
        <MainNav />
        <SubNav />
        <MobileNav />
      </header>
      {/* Main */}
      <main>
        <HeroSection />
        <Options />
        <BKCSystem />
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
