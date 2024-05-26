import React from "react";
import Carousel from "../../components/ForPages/Carousel";
import Options from "../../home/Options";
import About from "../../home/About";
import BKCSystem from "../../home/BKCSystem";
import Specialty from "../../home/Specialty";
import News from "../../home/News";
import Footer from "../../components/ForPages/Footer";
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
