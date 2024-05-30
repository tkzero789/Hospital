import React from "react";
import { NavLink } from "react-router-dom";
import AmbulanceSVG from "../../assets/home/ambulanceSVG.svg";
import ClipboardSVG from "../../assets/home/clipboardSVG.svg";
import HospitalSVG from "../../assets/home/hospitalSVG.svg";

export default function BaySideSystem() {
  return (
    <>
      {/* BKC SYSTEM SECTION */}
      <section className="system w-100">
        <div className="content-container">
          <div className="syst-wrapper">
            <div className="c-12">
              <div className="syst-section">
                <div className="syst-header">
                  BaySide System: For a Better Life
                </div>
                <div className="syst-body">
                  A system built to elevate patient care and foster a community
                  for sharing healthcare experiences and knowledge. We leverage
                  cutting-edge technology and a patient-centric approach to
                  ensure that each individual receives personalized and
                  effective treatment. Through sharing and learning, we can
                  collectively contribute to a healthier society.
                </div>
                <div className="syst-card-wrapper">
                  <div className="syst-card">
                    <NavLink className="syst-card-link">
                      <div className="syst-card-img">
                        <img
                          className="card-img"
                          src={AmbulanceSVG}
                          alt="BKCare System"
                        ></img>
                      </div>
                      <div className="syst-card-header">
                        Emergency Medical Solutions
                      </div>
                      <div className="syst-card-body">
                        Advanced equipment helps us meet all your medical needs
                        quickly and accurately.
                      </div>
                    </NavLink>
                  </div>
                  <div className="syst-card">
                    <NavLink className="syst-card-link">
                      <div className="syst-card-img">
                        <img
                          className="card-img"
                          src={HospitalSVG}
                          alt="BKCare System"
                        ></img>
                      </div>
                      <div className="syst-card-header">
                        Professional Hospital System
                      </div>
                      <div className="syst-card-body">
                        Delivering exceptional healthcare outcomes with our team
                        of dedicated and experienced doctors and nurses.
                      </div>
                    </NavLink>
                  </div>
                  <div className="syst-card">
                    <NavLink className="syst-card-link">
                      <div className="syst-card-img">
                        <img
                          className="card-img"
                          src={ClipboardSVG}
                          alt="BKCare System"
                        ></img>
                      </div>
                      <div className="syst-card-header">
                        High-quality healthcare
                      </div>
                      <div className="syst-card-body">
                        Improve your quality of life through the best healthcare
                        services, because you are our top priority.
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
