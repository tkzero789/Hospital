import React from "react";
import { Link } from "react-router-dom";
import HeartSVG from "assets/home/heartSVG.svg";
import BoneSVG from "assets/home/boneSVG.svg";
import MedicationSVG from "assets/home/medicationSVG.svg";
import FileSVG from "assets/home/fileSVG.svg";
import HandSVG from "assets/home/handSVG.svg";
import RibbonSVG from "assets/home/ribbonSVG.svg";
import ProtectionSVG from "assets/home/protectionSVG.svg";
import DnaSVG from "assets/home/dnaSVG.svg";
import "components/HomePage/Specialty/specialty.scss";

export default function Specialty() {
  return (
    <>
      <section className="specialty w-100">
        <div className="content-container">
          <div className="splty-wrapper specialty__wrapper">
            <div className="c-12">
              <div className="splty-section specialty__section">
                <div className="specialty__section-header">
                  Specialties at BaySide Health
                </div>
                <div className="specialty__section-items">
                  {/* First row */}
                  <div className="specialty__items">
                    <div className="specialty__item">
                      <Link to="/specialty-page/cardiology">
                        <div className="specialty__item-img">
                          <img src={HeartSVG} alt="specialty"></img>
                        </div>
                        <div className="specialty__item-header">
                          <span>Cardiology</span>
                        </div>
                      </Link>
                    </div>
                    <div className="specialty__item">
                      <Link to="/specialty-page/orthopedics">
                        <div className="specialty__item-img">
                          <img src={BoneSVG} alt="specialty"></img>
                        </div>
                        <div className="specialty__item-header">
                          <span>Orthopedics</span>
                        </div>
                      </Link>
                    </div>
                    <div className="specialty__item">
                      <Link to="/specialty-page/surgery">
                        <div className="specialty__item-img">
                          <img src={MedicationSVG} alt="specialty"></img>
                        </div>
                        <div className="specialty__item-header">
                          <span>Surgery</span>
                        </div>
                      </Link>
                    </div>
                    <div className="specialty__item">
                      <Link to="/specialty-page/pediatricians">
                        <div className="specialty__item-img">
                          <img src={FileSVG} alt="specialty"></img>
                        </div>
                        <div className="specialty__item-header">
                          <span>Pediatricians</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  {/* Second Row */}
                  <div className="specialty__items">
                    <div className="specialty__item">
                      <Link to="/specialty-page/diabetes">
                        <div className="specialty__item-img">
                          <img src={HandSVG} alt="specialty"></img>
                        </div>
                        <div className="specialty__item-header">
                          <span>Diabetes</span>
                        </div>
                      </Link>
                    </div>
                    <div className="specialty__item">
                      <Link to="/specialty-page/women-care">
                        <div className="specialty__item-img">
                          <img src={RibbonSVG} alt="specialty"></img>
                        </div>
                        <div className="specialty__item-header">
                          <span>Women's care</span>
                        </div>
                      </Link>
                    </div>
                    <div className="specialty__item">
                      <Link to="/specialty-page/family-medicine">
                        <div className="specialty__item-img">
                          <img src={ProtectionSVG} alt="specialty"></img>
                        </div>
                        <div className="specialty__item-header">
                          <span>Family Medicine</span>
                        </div>
                      </Link>
                    </div>

                    <div className="specialty__item">
                      <Link to="/specialty-page/neurology">
                        <div className="specialty__item-img">
                          <img src={DnaSVG} alt="specialty"></img>
                        </div>
                        <div className="specialty__item-header">
                          <span>Neurology</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="specialty__section-btn">
                  <Link to="/specialty-page">View more details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
