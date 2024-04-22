import React from "react";

import Carousel from "../../components/ForPages/Carousel";
import Options from "../../home/Options";
import About from "../../home/About";
import BKCSystem from "../../home/BKCSystem";
import Specialty from "../../home/Specialty";
import News from "../../home/News";
import Footer from "../../components/ForPages/Footer";

export default function TestHome() {
  return (
    <div>
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
    </div>
  );
}
