import React from "react";
import MainNav from "../components/MainNav";
import LowNav from "../components/LowNav";
import TestApptForm from "../components/TestApptForm";
import Footer from "../components/Footer";

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
