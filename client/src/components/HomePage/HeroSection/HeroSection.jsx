import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "components/HomePage/HeroSection/HeroSection.scss";

export default function HeroSection() {
  return (
    <>
      <div className="hero__section">
        <div className="hero__section-img">
          <div className="hero__info">
            <div className="content-container">
              <div className="hero__info-wrapper">
                <div className="hero__info-text">
                  <h1>Your path to better health</h1>
                  <p>
                    Don't let healthcare stress you out. BaySide offers a
                    complete range of services, expert doctors, and advanced
                    technology. Learn more on our website.
                  </p>
                </div>
                <div className="hero__info-btn">
                  <Link to="/appt-request">Request appointment</Link>
                  <Link>Find a doctor</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
