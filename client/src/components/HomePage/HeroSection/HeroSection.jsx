import React from "react";
import { Link } from "react-router-dom";
import "components/HomePage/HeroSection/herosection.css";

export default function HeroSection() {
  return (
    <>
      <div className="hero-section">
        <div className="hero-img">
          <div className="hero-info">
            <div className="content-container">
              <div className="hero-info-wrapper">
                <div className="hero-info-text">
                  <h1>Your path to better health</h1>
                  <p>
                    At BaySide, we understand that seeking medical attention can
                    be stressful. Our website provides easy access to
                    information about our expert doctors, advanced technology,
                    and a wide range of services.
                  </p>
                </div>
                <div className="hero-info-btn">
                  <Link to="/appt-request">Book an appointment</Link>
                  <Link>Learn more</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
