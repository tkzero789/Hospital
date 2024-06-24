import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "auth/AuthContext";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BaySideLogo from "assets/icons/BaySide-logo-1.svg";
import "components/Navbar/MainNav/MainNav.css";

const navLinks = [
  { link: "/home", text: "" },
  { link: "/symptom-checker", text: "Health Checker" },
  { link: "", text: "Services" },
  { link: "", text: "Patients & Visitors" },
  { link: "", text: "Find care" },
];

export default function MainNav() {
  const { loggedIn, logout, getUserInfos } = useAuth();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false); //toggle dropdown

  // get user full name
  const userInfos = getUserInfos();
  const fullName = userInfos ? userInfos.fullName : null;

  // Handle sign out
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
        "http://localhost:5000/signout",
        null,
        config
      );
      console.log("Signed out");
      console.log(response);
      logout();
      navigate("/home");
    } catch (err) {
      const message = `Error: ${err}`;
      window.alert(message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".user-login")) {
        setDropdownVisible(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-100 nav-bg">
      <div className="nav-container">
        <nav className="nav-bg py-0 d-none d-lg-block d-xl-block">
          <ul className="main-nav-list">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item item">
                <NavLink className="nav-link nav-link-first" to={link.link}>
                  {index === 0 && (
                    <div className="home-logo">
                      <img src={BaySideLogo} alt="BaySide hospital logo"></img>
                    </div>
                  )}

                  <div className="main-nav-text">{link.text}</div>
                </NavLink>
              </li>
            ))}

            {loggedIn ? (
              <li key={"signin"}>
                <div
                  className="nav-link nav-link-first user-login"
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                  <NavLink>
                    <div className="main-nav-text">{fullName}</div>
                    <div className="user-icon-dropdown">
                      {dropdownVisible ? (
                        <i className="left-dropdown-icon bi bi-caret-down-fill"></i>
                      ) : (
                        <i className="down-dropdown-icon bi bi-caret-left-fill"></i>
                      )}
                    </div>
                    <div
                      className={`user-dropdown ${
                        dropdownVisible ? "visible" : "hidden"
                      }`}
                    >
                      <NavLink to="/dashboard">
                        <SpaceDashboardIcon />
                        <span>Dashboard</span>
                      </NavLink>
                      <NavLink>
                        <SettingsIcon />
                        <span>Setting</span>
                      </NavLink>
                      <NavLink onClick={handleSignOut}>
                        <ExitToAppIcon />
                        <span>Logout</span>
                      </NavLink>
                    </div>
                  </NavLink>
                </div>
              </li>
            ) : (
              <li key={"signout"}>
                <NavLink className="nav-link nav-link-first" to="/signin-staff">
                  <div className="main-nav-text">Patient portal</div>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
