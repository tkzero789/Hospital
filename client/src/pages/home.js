import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import HI1 from "../assets/h6.jpg";
import HI2 from "../assets/h7.png";
import HI3 from "../assets/h8.png";
import Options from "../home/Options";
import About from "../home/About";
import BKCSystem from "../home/BKCSystem";
import News from "../home/News";
import MainNav from "../components/MainNav";
import LowNav from "../components/LowNav";
import Specialty from "../home/Specialty";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar-wrapper w-100">
        <MainNav />
        <LowNav />
      </nav>

      {/* Mobile: Hamburger Menu */}
      <nav className="navbar navbar-expand-lg nav-bg d-md-block d-lg-none">
        <div className="container-fluid">
          <NavLink className="navbar-brand" href="#">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item px-2">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink className="nav-link" href="#">
                  Link
                </NavLink>
              </li>
              <li className="nav-item dropdown px-2">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Action
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Another action
                    </NavLink>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Something else here
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main id="main">
        {/* CAROUSEL */}
        <div
          id="carouselExampleInterval"
          class="carousel slide d-none d-lg-block d-xl-block"
          data-bs-ride="carousel"
        >
          <div className="hero-section">
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="5000">
                <img
                  className="car-img d-block w-100"
                  src={HI1}
                  alt="Background 1"
                />
              </div>
              <div class="carousel-item" data-bs-interval="5000">
                <img
                  className="car-img d-block w-100"
                  src={HI2}
                  alt="Background 2"
                />
              </div>
              <div class="carousel-item" data-bs-interval="5000">
                <img
                  className="car-img d-block w-100"
                  src={HI3}
                  alt="Background 3"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <Options />
        <About />
        <BKCSystem />
        <Specialty />
        <News />
        <Footer />
      </main>
    </>
  );
}
