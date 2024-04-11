import React from "react";
import { Helmet } from "react-helmet";
import MainNav from "../components/Navbar/MainNav";
import LowNav from "../components/Navbar/LowNav";
import Carousel from "../components/ForPages/Carousel";
import Options from "../home/Options";
import About from "../home/About";
import BKCSystem from "../home/BKCSystem";
import Specialty from "../home/Specialty";
import News from "../home/News";
import Footer from "../components/ForPages/Footer";
import MobileNav from "../components/Navbar/MobileNav";
import MobileHero from "../components/ForPages/MobileHero";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Bệnh viện BKCare</title>
      </Helmet>
      {/* Navbar */}
      <nav className="navbar-wrapper w-100">
        <MainNav />
        <LowNav />
      </nav>

      {/* Mobile: Hamburger Menu */}
      <MobileNav />
      <MobileHero />

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
