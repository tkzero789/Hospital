import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "components/Navbar/SubNav/SubNav.css";

export default function SubNav() {
  const navLinks = [
    { link: "/news/page-1", text: "News & Insights" },
    { link: "/symptom-checker", text: "Health checker" },
    { link: "work-schedule", text: "Locations" },
    { link: "work-schedule", text: "813-784-4581" },
    { link: "work-schedule", text: "Search" },
  ];

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const hideDropdown = () => setDropdownVisible(false);

  return (
    <>
      {/* LOWER NAVBAR */}
      <div className="w-100 sub-nav-bg">
        <div className="nav-container">
          <nav className="sub-nav-bg py-0 d-none d-lg-block d-xl-block">
            <ul className="sub-nav-list">
              {/* DROPDOWN  */}
              <li
                className="sub-nav-item dropdown-list-item"
                onMouseEnter={() => setDropdownVisible(true)}
                onMouseLeave={() => setDropdownVisible(false)}
              >
                <div className="dropdown-list-box">
                  <div className="sub-nav-text">
                    <span>Our services</span>{" "}
                    <i className="bi bi-caret-down-fill"></i>
                  </div>
                  {dropdownVisible && (
                    <div className="dropdown-content" onClick={hideDropdown}>
                      <NavLink>Lab</NavLink>
                      <NavLink>Primary care</NavLink>
                      <NavLink>Home care</NavLink>
                      <NavLink>Imaging</NavLink>
                      <NavLink>Insurance</NavLink>
                      <NavLink>Health and wellness</NavLink>
                    </div>
                  )}
                </div>
              </li>
              <li
                className="sub-nav-item dropdown-list-item"
                onMouseEnter={() => setDropdownVisible(true)}
                onMouseLeave={() => setDropdownVisible(false)}
              >
                <div className="dropdown-list-box">
                  <div className="sub-nav-text">
                    <span>Appointment</span>{" "}
                    <i className="bi bi-caret-down-fill"></i>
                  </div>
                  {dropdownVisible && (
                    <div className="dropdown-content" onClick={hideDropdown}>
                      <Link to="/appt-request">Request appointment</Link>
                      <NavLink to="/appt-request">Returning patients</NavLink>
                      <NavLink to="/appt-detail-guest">
                        Check appointment status
                      </NavLink>
                      <NavLink>Referring physicians</NavLink>
                    </div>
                  )}
                </div>
              </li>
              {navLinks.map((link, index) => (
                <li key={index} className="sub-nav-item">
                  <NavLink to={link.link}>
                    {index === navLinks.length - 1 && (
                      <i className="bi bi-search"></i>
                    )}
                    {index === navLinks.length - 2 && (
                      <i className="bi bi-telephone-fill"></i>
                    )}
                    <div className="sub-nav-text">{link.text}</div>
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
