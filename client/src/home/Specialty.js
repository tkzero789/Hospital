import React from "react";
import { NavLink } from "react-router-dom";
import HeartSVG from "../assets/home/heartSVG.svg";
import DentistSVG from "../assets/home/dentistSVG.svg";
import LungSVG from "../assets/home/lungSVG.svg";
import EyesSVG from "../assets/home/eyesSVG.svg";
import BoneSVG from "../assets/home/boneSVG.svg";
import EarSVG from "../assets/home/earSVG.svg";
import DnaSVG from "../assets/home/dnaSVG.svg";
import TubeSVG from "../assets/home/tubesSVG.svg";

export default function Specialty() {
  return (
    <>
      <section className="specialty w-100">
        <div className="content-container">
          <div className="splty-wrapper">
            <div className="c-12">
              <div className="splty-section">
                <div className="splty-section-header">
                  Chuyên khoa tiêu biểu
                </div>
                <div className="splty-items-container">
                  <div className="splty-items-wrapper">
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={HeartSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Tim mạch</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={BoneSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Cơ – xương – khớp</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={LungSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Nội tổng hợp</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={DentistSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Răng - hàm - mặt</span>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                  <div className="splty-items-wrapper">
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={EyesSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Mắt</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={TubeSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Xét nghiệm</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={EarSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Tai - mũi - họng</span>
                        </div>
                      </NavLink>
                    </div>

                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={DnaSVG} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Thần kinh</span>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                  <div className="splty-btn-wrapper">
                    <NavLink to="/specialty-page" className="splty-btn-link">
                      Xem chi tiết các chuyên khoa
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
