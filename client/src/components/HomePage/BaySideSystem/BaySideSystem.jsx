import React from "react";
import { Link } from "react-router-dom";
import AmbulanceSVG from "assets/icons/ambulance-icon.svg";
import ClipboardSVG from "assets/icons/clipboard-icon.svg";
import HospitalSVG from "assets/icons/hospital-icon.svg";
import "components/HomePage/BaySideSystem/BaySideSystem.scss";

export default function BaySideSystem() {
  return (
    <>
      {/* BKC SYSTEM SECTION */}
      <section className="system w-100">
        <div className="content-container">
          <div className="system__wrapper">
            <div className="c-12">
              <div className="system__section">
                <div className="system__section-header">
                  Beyond Living: Thriving with BaySide
                </div>
                <div className="system__section-body">
                  A system built to elevate patient care and foster a community
                  for sharing healthcare experiences and knowledge. We leverage
                  cutting-edge technology and a patient-centric approach to
                  ensure that each individual receives personalized and
                  effective treatment. Through sharing and learning, we can
                  collectively contribute to a healthier society.
                </div>
                <div className="system__card-wrapper">
                  <div className="system__card">
                    <Link>
                      <div className="system__card-img">
                        <img src={AmbulanceSVG} alt="Bayside System"></img>
                      </div>
                      <div className="system__card-header">
                        Emergency Medical Solutions
                      </div>
                      <div className="system__card-body">
                        Advanced equipment helps us meet all your medical needs
                        quickly and accurately.
                      </div>
                      <div className="system__card-btn">
                        <span>
                          Emergency <i className="bi bi-arrow-right"></i>
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="system__card">
                    <Link>
                      <div className="system__card-img">
                        <img src={HospitalSVG} alt="Bayside System"></img>
                      </div>
                      <div className="system__card-header">
                        Professional Hospital System
                      </div>
                      <div className="system__card-body">
                        Delivering exceptional healthcare outcomes with our team
                        of dedicated and experienced doctors and nurses.
                      </div>
                      <div className="system__card-btn">
                        <span>
                          Explore <i className="bi bi-arrow-right"></i>
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="system__card">
                    <Link>
                      <div className="system__card-img">
                        <img src={ClipboardSVG} alt="Bayside System"></img>
                      </div>
                      <div className="system__card-header">
                        High-quality healthcare
                      </div>
                      <div className="system__card-body">
                        Improve your quality of life through the best healthcare
                        services, because you are our top priority.
                      </div>
                      <div className="system__card-btn">
                        <span>
                          Find care <i className="bi bi-arrow-right"></i>
                        </span>
                      </div>
                    </Link>
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
