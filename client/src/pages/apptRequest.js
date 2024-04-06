import React from "react";
import { Helmet } from "react-helmet";
import MainNav from "../components/MainNav";
import LowNav from "../components/LowNav";
import ApptForm from "../components/ApptForm";
import Footer from "../components/Footer";
import FeatureApptForm from "../components/FeatureApptForm";
import TestApptForm from "../components/TestApptForm";

export default function ApptRequest() {
  return (
    <>
      <Helmet>
        <title>Đăng ký khám bệnh</title>
      </Helmet>
      {/* Navbar */}
      <header>
        <MainNav />
        <LowNav />
      </header>

      {/* Appointment Form */}
      <TestApptForm />
      {/* Footer */}
      <Footer />
    </>
  );
}
