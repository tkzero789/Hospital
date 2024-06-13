import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BaySideLogo from "assets/logo/BaySide-logo-1.svg";
import "components/Navbar/MobileNav/mobilenav.css";

export default function MobileNav() {
  const location = useLocation();

  const handleLinkClick = (event) => {
    event.preventDefault();
    const { to } = event.currentTarget.dataset;
    if (location.pathname === to) {
      event.preventDefault();
      window.location.reload();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    // Close the mobile navigation menu
    menuBtn.current.classList.remove("open");

    // Add a delay before navigating
    setTimeout(() => {
      window.location.href = to;
    }, 100);
  };

  const menuBtn = useRef(null);
  const navSlider = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      menuBtn.current.classList.toggle("open");
      navSlider.current.classList.toggle("open");
    };
    const menuBtnElement = menuBtn.current;
    menuBtnElement.addEventListener("click", handleClick);

    return () => {
      menuBtnElement.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div className="mobile-nav">
        <div className="navbar-slider" ref={navSlider}>
          <div className="slider-content">
            <div className="slider-wrapper">
              <ul>
                <li>
                  <NavLink
                    className="mobile-nav-link"
                    to="/home"
                    data-to="/home"
                    onClick={handleLinkClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="mobile-nav-link"
                    to="/specialty-page"
                    data-to="/specialty-page"
                    onClick={handleLinkClick}
                  >
                    Specialty
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="mobile-nav-link"
                    to="/appt-request"
                    data-to="/appt-request"
                    onClick={handleLinkClick}
                  >
                    Schedule an appointment
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="mobile-nav-link"
                    to="/appt-detail-guest"
                    data-to="/appt-detail-guest"
                    onClick={handleLinkClick}
                  >
                    Appointment status
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="mobile-nav-link"
                    to="/symptom-checker"
                    data-to="/symptom-checker"
                    onClick={handleLinkClick}
                  >
                    Health check
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="mobile-nav-link"
                    to="/view-blog-list"
                    data-to="/view-blog-list"
                    onClick={handleLinkClick}
                  >
                    News
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="mobile-nav-link"
                    to="/work-schedule"
                    data-to="/work-schedule"
                    onClick={handleLinkClick}
                  >
                    Business hours
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mobile-nav-container">
          <div className="mobile-nav-wrapper">
            <NavLink
              className="mobile-logo-link"
              to="/home"
              data-to="/home"
              onClick={handleLinkClick}
            >
              <div className="mobile-nav-logo">
                <img src={BaySideLogo} alt="hospital logo" />
              </div>
            </NavLink>
            <div className="menu-btn" ref={menuBtn}>
              <div className="menu-toggler">
                <div className="menu-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
