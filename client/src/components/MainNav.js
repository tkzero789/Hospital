import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useAuth } from "../AuthContext";

const navLinks = [
  { link: "/home", text: "Trang chủ" },
  { link: "/test-home", text: "Hướng dẫn" },
  { link: "", text: "Tin tức" },
  { link: "", text: "Tuyển dụng" },
  { link: "", text: "Liên hệ" },
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
                  className={`nav-item item ${link.className || ""}`}
                >
                  <NavLink className="nav-link nav-link-first" to={link.link}>
                    {index === 0 && (
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

              {loggedIn ? (
                <li key={"signin"}>
                  <NavLink
                    className="nav-link nav-link-first"
                    onClick={handleSignOut}
                  >
                    <div className="up-nav-text text-white fw-semibold">
                      Sign out
                    </div>
                  </NavLink>
                </li>
              ) : (
                <li key={"signout"}>
                  <NavLink className="nav-link nav-link-first" to="/signin">
                    <div className="up-nav-text text-white fw-semibold">
                      Sign in
                    </div>
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
