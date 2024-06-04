import React from "react";
import { NavLink } from "react-router-dom";

export default function SubNav() {
  const navLinks = [
    { link: "/view-blog-list", text: "News & Insights" },
    { link: "/symptom-checker", text: "Health checker" },
    { link: "/appt-detail-guest", text: "Appointments" },
    { link: "work-schedule", text: "Locations" },
    { link: "work-schedule", text: "813-784-4581" },
    { link: "work-schedule", text: "Search" },
  ];

  return (
    <>
      {/* LOWER NAVBAR */}
      <div className="w-100 low-nav-bg border-top">
        <div className="nav-container">
          <nav className="low-nav-bg py-0 d-none d-lg-block d-xl-block">
            <ul className="low-nav-list">
              {/* DROPDOWN  */}
              <li className="low-nav-item dropdown-list-item">
                <div className="dropdown-list-box">
                  <div className="low-nav-text">Our services</div>
                  <div className="dropdown-content">
                    <NavLink>Lab</NavLink>
                    <NavLink>Primary care</NavLink>
                    <NavLink>Home care</NavLink>
                    <NavLink>Imaging</NavLink>
                    <NavLink>Insurance</NavLink>
                    <NavLink>Health and wellness</NavLink>
                  </div>
                </div>
              </li>
              {navLinks.map((link, index) => (
                <li key={index} className="low-nav-item">
                  <NavLink to={link.link}>
                    {index === navLinks.length - 1 && (
                      <i className="bi bi-search"></i>
                    )}
                    {index === navLinks.length - 2 && (
                      <i className="bi bi-telephone-fill"></i>
                    )}
                    <div className="low-nav-text">{link.text}</div>
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
