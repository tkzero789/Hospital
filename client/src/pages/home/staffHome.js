import React from "react";
import HeroSection from "../../components/Home/HeroSection";
import Options from "../../components/Home/Options";
import About from "../../components/Home/About";
import BKCSystem from "../../components/Home/BaySideSystem";
import Specialty from "../../components/Home/Specialty";
import Footer from "../../components/Home/Footer";
import MainNav from "../../components/Navbar/MainNav";
import SubNav from "../../components/Navbar/SubNav";
import MobileNav from "../../components/Navbar/MobileNav";
import SwipeNews from "../../components/Home/SwipeNews";
import Extra from "../../components/Home/Extra";
import Map from "../../components/Home/Map";

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
        <Extra />
        <Map />
        <Footer />
      </main>
    </>
  );
}
