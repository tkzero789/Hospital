import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import BaySideLogo from "assets/icons/BaySide-logo-1.svg";
import "components/Navbar/MobileNav/Mobilenav.css";

export default function MobileNav() {
  const location = useLocation();

  // link
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

  // open and close slider
  useEffect(() => {
    const handleClick = () => {
      menuBtn.current.classList.toggle("open");
      navSlider.current.classList.toggle("open");
      setOpenAppt(false);
      setOpenServices(false);
    };
    const menuBtnElement = menuBtn.current;
    menuBtnElement.addEventListener("click", handleClick);

    return () => {
      menuBtnElement.removeEventListener("click", handleClick);
    };
  }, []);

  // toggle open child link
  const [openAppt, setOpenAppt] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  return (
    <>
      <div className="mobile-nav">
        <div className="navbar-slider" ref={navSlider}>
          <div className="slider-content">
            <div className="slider-wrapper">
              <ul>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/home"
                    data-to="/home"
                    onClick={handleLinkClick}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="mobile-nav-link" onClick={handleLinkClick}>
                    Find a doctor
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/symptom-checker"
                    data-to="/symptom-checker"
                    onClick={handleLinkClick}
                  >
                    Health checker
                  </Link>
                </li>
                <li>
                  <div
                    className="mobile-nav-link"
                    onClick={() => {
                      setOpenAppt(!openAppt);
                    }}
                  >
                    <div className="dropdown-link-wrapper">
                      <span className="me-auto">Appointment</span>
                      <i
                        className={`bi ${
                          openAppt ? "bi-chevron-up" : "bi-chevron-down"
                        }`}
                      ></i>
                    </div>
                  </div>
                </li>
                {openAppt && (
                  <div className="mobile-child-links">
                    <Link
                      to="/appt-request"
                      data-to="/appt-request"
                      onClick={handleLinkClick}
                    >
                      Request appointment
                    </Link>
                    <Link>Returning patients</Link>
                    <Link
                      to="/appt-detail-guest"
                      data-to="/appt-detail-guest"
                      onClick={handleLinkClick}
                    >
                      Appointment status
                    </Link>
                    <Link>Reffering physicians</Link>
                  </div>
                )}
                <li>
                  <div
                    className="mobile-nav-link"
                    onClick={() => {
                      setOpenServices(!openServices);
                    }}
                  >
                    <div className="dropdown-link-wrapper">
                      <span className="me-auto">Our services</span>
                      <i
                        className={`bi ${
                          openServices ? "bi-chevron-up" : "bi-chevron-down"
                        }`}
                      ></i>
                    </div>
                  </div>
                </li>
                {openServices && (
                  <div className="mobile-child-links">
                    <Link>Lab</Link>
                    <Link>Returning patients</Link>
                    <Link>Primary care</Link>
                    <Link>Home care</Link>
                    <Link>Imagine</Link>
                    <Link>Insurance</Link>
                    <Link>Health and wellness</Link>
                  </div>
                )}
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/specialty-page"
                    data-to="/specialty-page"
                    onClick={handleLinkClick}
                  >
                    Specialty
                  </Link>
                </li>
                <li>
                  <Link
                    className="mobile-nav-link"
                    to="/view-blog-list"
                    data-to="/view-blog-list"
                    onClick={handleLinkClick}
                  >
                    News & Insights
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mobile-nav-container">
          <div className="mobile-nav-wrapper">
            <Link
              className="mobile-logo-link"
              to="/home"
              data-to="/home"
              onClick={handleLinkClick}
            >
              <div className="mobile-nav-logo">
                <img src={BaySideLogo} alt="hospital logo" />
              </div>
            </Link>
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
