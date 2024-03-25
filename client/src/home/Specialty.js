import React from "react";
import { NavLink } from "react-router-dom";
import TestImg from "../assets/splty.jpg";

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
                          <img src={TestImg} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Specialty</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={TestImg} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Specialty</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={TestImg} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Specialty</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={TestImg} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Specialty</span>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                  <div className="splty-items-wrapper">
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={TestImg} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Specialty</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={TestImg} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Specialty</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={TestImg} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Specialty</span>
                        </div>
                      </NavLink>
                    </div>
                    <div className="splty-item">
                      <NavLink className="splty-item__link">
                        <div className="splty-item-img">
                          <img src={TestImg} alt="specialty"></img>
                        </div>
                        <div className="splty-item-header">
                          <span>Specialty</span>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                  <div className="splty-btn-wrapper">
                    <NavLink className="splty-btn-link">
                      <btn className="splty-btn">Xem tất cả chuyên khoa</btn>
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
