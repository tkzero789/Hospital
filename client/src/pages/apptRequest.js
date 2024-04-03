import React from "react";
import MainNav from "../components/MainNav";
import LowNav from "../components/LowNav";
import ApptForm from "../components/ApptForm";
import Footer from "../components/Footer";
import FeatureApptForm from "../components/FeatureApptForm";
import TestApptForm from "../components/TestApptForm";

export default function ApptRequest() {
  return (
    <>
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
