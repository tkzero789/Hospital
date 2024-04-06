import React from "react";
import { Helmet } from "react-helmet";
import MainNav from "../components/Navbar/MainNav";
import LowNav from "../components/Navbar/LowNav";
import ApptForm from "../components/Forms/ApptForm";
import Footer from "../components/ForPages/Footer";
import FeatureApptForm from "../components/Forms/FeatureApptForm";
import TestApptForm from "../components/Forms/TestApptForm";

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
