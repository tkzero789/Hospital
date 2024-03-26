import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext";

const navLinks = [
  { link: "/home", text: "Trang chủ" },
  { link: "/test-home", text: "Tin tức" },
  { link: "/appt-request", text: "Đăng ký khám bệnh" },
  { link: "", text: "Xem kết quả online" },
  { link: "", text: "Hotline: 0938 888 888" },
];

export default function MainNav() {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("No token found in storage");
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "https://symptom-checker-with-mern-backend.onrender.com/signout",
        null,
        config
      );
      console.log("Signed out");
      console.log(response);
      logout();
      navigate("/signin");
    } catch (err) {
      const message = `An error occurred: ${err}`;
      window.alert(message);
    }
  };

  return (
    <>
      <div className="w-100 nav-bg">
        <div className="nav-container">
          <nav className="nav-bg py-0 d-none d-lg-block d-xl-block">
            <ul className="main-nav-list">
              {navLinks.map((link, index) => (
                <li
                  key={link.link}
                  className={`nav-item item ${
                    index === navLinks.length - 1 ? "nav-item-last" : ""
                  }`}
                >
                  <NavLink className="nav-link nav-link-first" to={link.link}>
                    {index === 0 && (
                      <div className="home-icon-wrapper ms-3">
                        <i className="home-icon bi bi-house-door"></i>
                      </div>
                    )}
                    <div className="main-nav-text">{link.text}</div>
                  </NavLink>
                </li>
              ))}

              {loggedIn ? (
                <li key={"signin"}>
                  <NavLink
                    className="nav-link nav-link-first"
                    onClick={handleSignOut}
                  >
                    <div className="main-nav-text">Sign out</div>
                  </NavLink>
                </li>
              ) : (
                <li key={"signout"}>
                  <NavLink className="nav-link nav-link-first" to="/signin">
                    <div className="main-nav-text">Đăng nhập</div>
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
