import React from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { link: "/home", text: "Trang chủ" },
  { link: "/test-home", text: "Hướng dẫn" },
  { link: "", text: "Tin tức" },
  { link: "", text: "Tuyển dụng" },
  { link: "", text: "Liên hệ" },
  { link: "/doctor-login", text: "Hỏi đáp" },
];

export default function MainNav() {
  return (
    <>
      <div className="w-100 nav-bg">
        <div className="nav-container">
          <nav className="nav-bg py-0 d-none d-lg-block d-xl-block">
            <ul className="main-nav-list">
              {navLinks.map((link, index) => (
                <li
                  key={link.link}
                  className={`nav-item item ${link.className || ""}`}
                >
                  <NavLink className="nav-link nav-link-first" to={link.link}>
                    {index === 0 && ( // Check if it's the first item (index 0)
                      <div className="home-icon-wrapper ms-3">
                        <i className="home-icon bi bi-house-door"></i>
                      </div>
                    )}
                    <div className="up-nav-text text-white fw-semibold">
                      {link.text}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
