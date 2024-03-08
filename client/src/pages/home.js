import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import SubNavbar from "../components/SubNavbar";
import Navbar from "../components/MainNav";

export default function Home() {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <SubNavbar></SubNavbar>
      </div>

      <div className="row">
        <div className="col">
          <div className="hero-section">
            <div className="hero-overlay"></div>
          </div>
        </div>
      </div>
    </>
  );
}
