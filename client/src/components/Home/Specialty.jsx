import React from "react";
import { Link } from "react-router-dom";
import HeartSVG from "../../assets/home/heartSVG.svg";
import BoneSVG from "../../assets/home/boneSVG.svg";
import MedicationSVG from "../../assets/home/medicationSVG.svg";
import FileSVG from "../../assets/home/fileSVG.svg";
import HandSVG from "../../assets/home/handSVG.svg";
import RibbonSVG from "../../assets/home/ribbonSVG.svg";
import ProtectionSVG from "../../assets/home/protectionSVG.svg";
import DnaSVG from "../../assets/home/dnaSVG.svg";

export default function Specialty() {
  return (
    <>
      <section className="specialty w-100">
        <div className="content-container">
          <div className="splty-wrapper">
            <div className="c-12">
              <div className="splty-section">
                <div className="splty-section-header">
                  Specialties at BaySide Health
                </div>
                <div className="splty-items-container">
                  <div className="splty-items-wrapper">
                    <div className="splty-item">
                      <Link
                        to="/specialty-page/cardiology"
                        className="splty-item__link"
                      >
                        <div className="splty-item-img">
                          <img src={HeartSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Cardiology</span>
                        </div>
                      </Link>
                    </div>
                    <div className="splty-item">
                      <Link
                        to="/specialty-page/orthopedics"
                        className="splty-item__link"
                      >
                        <div className="splty-item-img">
                          <img src={BoneSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Orthopedics</span>
                        </div>
                      </Link>
                    </div>
                    <div className="splty-item">
                      <Link
                        to="/specialty-page/surgery"
                        className="splty-item__link"
                      >
                        <div className="splty-item-img">
                          <img src={MedicationSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Surgery</span>
                        </div>
                      </Link>
                    </div>
                    <div className="splty-item">
                      <Link
                        to="/specialty-page/pediatricians"
                        className="splty-item__link"
                      >
                        <div className="splty-item-img">
                          <img src={FileSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Pediatricians</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="splty-items-wrapper">
                    <div className="splty-item">
                      <Link
                        to="/specialty-page/diabetes"
                        className="splty-item__link"
                      >
                        <div className="splty-item-img">
                          <img src={HandSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Diabetes</span>
                        </div>
                      </Link>
                    </div>
                    <div className="splty-item">
                      <Link
                        to="/specialty-page/women-care"
                        className="splty-item__link"
                      >
                        <div className="splty-item-img">
                          <img src={RibbonSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Women's care</span>
                        </div>
                      </Link>
                    </div>
                    <div className="splty-item">
                      <Link
                        to="/specialty-page/family-medicine"
                        className="splty-item__link"
                      >
                        <div className="splty-item-img">
                          <img src={ProtectionSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Family Medicine</span>
                        </div>
                      </Link>
                    </div>

                    <div className="splty-item">
                      <Link
                        to="/specialty-page/neurology"
                        className="splty-item__link"
                      >
                        <div className="splty-item-img">
                          <img src={DnaSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Neurology</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="splty-btn-wrapper">
                  <Link to="/specialty-page" className="splty-btn-link">
                    View more details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}