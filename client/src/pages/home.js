import React from "react";
import MainNav from "../components/MainNav";
import LowNav from "../components/LowNav";
import Carousel from "../components/Carousel";
import Options from "../home/Options";
import About from "../home/About";
import BKCSystem from "../home/BKCSystem";
import Specialty from "../home/Specialty";
import News from "../home/News";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar-wrapper w-100">
        <MainNav />
        <LowNav />
      </nav>

      {/* Mobile: Hamburger Menu */}
      <MobileNav />

      {/* Main */}
      <main id="main">
        <Carousel />
        <Options />
        <About />
        <BKCSystem />
        <Specialty />
        <News />
        <Footer />
      </main>
    </>
  );
}
