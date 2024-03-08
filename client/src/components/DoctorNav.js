import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const navLinks = [
  { link: "/record-list", text: "Create New Record" },
  { link: "/create-symptom", text: "Tạo triệu chứng" },
  { link: "/create-article", text: "Tạo bài viết" },
];

export default function DoctorNav() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-secondary py-0">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav justify-content-center">
              {navLinks.map((link) => (
                <li
                  key={link.link}
                  className={`nav-item px-5 mx-3 ${link.className || ""}`}
                >
                  <NavLink className="nav-link" to={link.link}>
                    <h6 className="text-light">{link.text}</h6>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
