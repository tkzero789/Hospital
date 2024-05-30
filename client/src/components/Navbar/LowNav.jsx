import React from "react";
import { NavLink } from "react-router-dom";

export default function LowNav() {
  const navLinks = [
    { link: "/view-blog-list", text: "News" },
    { link: "/specialty-page", text: "Specialty" },
    { link: "/symptom-checker", text: "Online health check" },
    { link: "/appt-detail-guest", text: "Appointment status" },
    { link: "/work-schedule", text: "Business hours" },
  ];

  return (
    <>
      {/* LOWER NAVBAR */}
      <div className="w-100 low-nav-bg border-top">
        <div className="nav-container">
          <nav className="low-nav-bg py-0 d-none d-lg-block d-xl-block">
            <ul className="low-nav-list">
              {navLinks.map((link) => (
                <li key={link.link} className="low-nav-item">
                  <NavLink to={link.link}>
                    <div className="low-nav-text">{link.text}</div>
                  </NavLink>
                </li>
              ))}
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
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
