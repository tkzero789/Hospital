import React from "react";
import { Helmet } from "react-helmet";
import MainNav from "../components/Navbar/MainNav";
import LowNav from "../components/Navbar/LowNav";

import Footer from "../components/ForPages/Footer";
import FeatureApptForm from "../components/Forms/FeatureApptForm";
import TestApptForm from "../components/Forms/TestApptForm";
import MobileNav from "../components/Navbar/MobileNav";

export default function ApptRequest() {
  return (
    <>
      <Helmet>
        <title>Đăng ký khám bệnh</title>
      </Helmet>

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
