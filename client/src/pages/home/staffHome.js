import React from "react";
import Carousel from "../../components/Home/HeroSection";
import Options from "../../components/Home/Options";
import About from "../../components/Home/About";
import BKCSystem from "../../components/Home/BaySideSystem";
import Specialty from "../../components/Home/Specialty";
import News from "../../components/Home/News";
import Footer from "../../components/Home/Footer";
import MainNav from "../../components/Navbar/MainNav";
import LowNav from "../../components/Navbar/LowNav";
import MobileNav from "../../components/Navbar/MobileNav";

export default function staffHome() {
  return (
    <div>
      <header>
        <MainNav />
        <LowNav />
        <MobileNav />
      </header>
      {/* Main */}
      <main>
        <Carousel />
        <Options />
        <About />
        <BKCSystem />
        <Specialty />
        <News />
        <Footer />
      </main>
    </div>
  );
}
