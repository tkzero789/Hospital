import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

import Logo from "../assets/logo-hospital.png";
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              alt="Hospital logo"
              style={{ width: 100 + "%" }}
              src={Logo}
            ></img>
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item item px-5">
                <NavLink className="nav-link" to="">
                  <h3 className="text-danger">Hotline: 066 77 88 99</h3>
                </NavLink>
              </li>
              <li className="nav-item item px-5">
                <NavLink className="nav-link" to="">
                  <h3 className="text-danger">Đặt lịch khám</h3>
                </NavLink>
              </li>
              <li className="nav-item item px-5">
                <NavLink className="nav-link" to="/signin">
                  <h3 className="text-danger">Sign in</h3>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav justify-content-center">
              <li className="nav-item px-5 mx-4">
                <NavLink className="nav-link" to="/create-symptom">
                  <h3 className="text-light">TRANG CHỦ</h3>
                </NavLink>
              </li>
              <li className="nav-item px-5 mx-3">
                <NavLink className="nav-link" to="/create-symptom">
                  <h3 className="text-light">GIỚI THIỆU</h3>
                </NavLink>
              </li>
              <li className="nav-item px-5 mx-3">
                <NavLink className="nav-link" to="/create-article">
                  <h3 className="text-light">CHẨN ĐOÁN BỆNH</h3>
                </NavLink>
              </li>
              <li className="nav-item px-5 mx-2">
                <NavLink className="nav-link" to="/symptom-checker">
                  <h3 className="text-light">HỎI & ĐÁP</h3>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
