import React from "react";
import MainNav from "../components/MainNav";
import MidNav from "../components/MidNav";
import LowNav from "../components/LowNav";
import HI1 from "../assets/h6.jpg";
import HI2 from "../assets/h7.png";
import HI3 from "../assets/h8.png";
import TestApptForm from "../components/TestApptForm";

export default function ApptRequest() {
  return (
    <>
      {/* Navbar */}
      <header>
        <MainNav />
        <MidNav />
        <LowNav />
      </header>

      {/* Appointment Form */}
      <TestApptForm />
    </>
  );
}
