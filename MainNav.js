import React from "react";
import { NavLink } from "react-router-dom";

const navigationLinks = [
  { link: "/home", text: "Chẩn đoán" },
  { link: "", text: "Đặt lịch khám" },
  { link: "", text: "Liên hệ" },
  {
    link: "",
    text: "Cấp cứu 24/7: (089) 546-7421",
    className: "emer-nav-item bg-danger",
  },
  { link: "/doctor-login", text: "Doctor Login" },
];

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light nav-bg py-0">
        <div className="container-fluid">
          <div
            className="d-flex flex-row-reverse collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              {navigationLinks.map((link) => (
                <li
                  key={link.link}
                  className={`nav-item item mx-2 py-2 ${link.className || ""}`}
                >
                  <NavLink className="nav-link px-3" to={link.link}>
                    <div className="navbar-fs text-white fw-normal">
                      {link.text}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
