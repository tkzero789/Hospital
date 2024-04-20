import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import MainNav from "../components/Navbar/MainNav";
import LowNav from "../components/Navbar/LowNav";

import Footer from "../components/ForPages/Footer";
import FeatureApptForm from "../components/Forms/FeatureApptForm";
import TestApptForm from "../components/Forms/TestApptForm";
import MobileNav from "../components/Navbar/MobileNav";

export default function ApptRequest() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Đăng ký khám bệnh</title>
        </Helmet>
      </HelmetProvider>

      <div className="blue-bg-2">
        {/* Navbar */}
        <header>
          <MainNav />
          <LowNav />
          <MobileNav />
        </header>

        {/* Appointment Form */}
        <FeatureApptForm />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
