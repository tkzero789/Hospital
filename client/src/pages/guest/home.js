import React from "react";
import Carousel from "../../components/ForPages/Carousel";
import Options from "../../home/Options";
import About from "../../home/About";
import BKCSystem from "../../home/BKCSystem";
import Specialty from "../../home/Specialty";
import News from "../../home/News";
import Footer from "../../components/ForPages/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Home(userRole) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Bệnh viện BKCare</title>
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
          <Carousel />
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
