import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logoBKC.png";

export default function SubNavbar() {
  const homeLinks = [
    { link: "/home", text: "Hệ thống BKC" },
    { link: "", text: "Thông tin cho bệnh nhân" },
  ];

  const navLinks = [
    { link: "/home", text: "Trang chủ" },
    { link: "", text: "Chuyên khoa" },
    { link: "", text: "Bác sĩ" },
    { link: "", text: "Gói dịch vụ" },
    { link: "", text: "Tuyển dụng" },
    { link: "", text: "Khác" },
  ];

  return (
    <>
      <div>
        {/* 1st SECOND TIER NAV */}
        <nav className="navbar navbar-expand-sm navbar-light bg-transparent py-0">
          <div className="container-fluid">
            <div
              className="first-sub-nav d-flex flex-row collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="d-flex">
                <NavLink className="nav-link py-0 px-0" to="/home">
                  <div className="nav-item-color">
                    <div className="logo-container ms-7">
                      <img className="logo-img" src={Logo} alt="Company logo" />
                    </div>
                  </div>
                </NavLink>

                <ul className="navbar-nav mr-auto">
                  {homeLinks.map((link) => (
                    <li
                      key={link.link}
                      className="flex-text nav-item mx-4 py-2"
                    >
                      <NavLink className="nav-link py-0 px-0" to={link.link}>
                        <div className="fs-5 nav-item-color fw-semibold">
                          {link.text}
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* 2nd SECOND TIER NAV */}
        <nav className="navbar navbar-expand-lg navbar-light sub-nav-bg py-0">
          <div className="container-fluid">
            <div className="second-sub-nav d-flex collapse navbar-collapse ms-7">
              <ul className="navbar-nav">
                {navLinks.map((link) => (
                  <li key={link.link} className="flex-text nav-item mx-4 py-2">
                    <NavLink className="nav-link py-0 px-0" to={link.link}>
                      <div className="fs-5 nav-item-color fw-semibold">
                        {link.text}
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="d-flex btn login-btn text-light fs-5 me-6">
            <div className="btn-icon-container me-3">
              <i class="btn-icon bi bi-box-arrow-in-right"></i>
            </div>
            <div className="btn-name ms-3">
              <NavLink
                className="text-decoration-none text-light"
                to={"/create-symptom"}
              >
                <div>Đăng nhập</div>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
