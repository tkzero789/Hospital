import React from "react";
import { Link, useLocation } from "react-router-dom";
import BaySideLogo from "assets/icons/BaySide-logo-2.svg";
import "components/HomePage/Footer/Footer.scss";

const footerLinks1 = [
  { name: "Appointments", link: "/" },
  { name: "Accepted Insurance", link: "/" },
  { name: "Find Care", link: "/" },
  { name: "Patient Portal", link: "/" },
  { name: "Price Transparency", link: "/" },
  { name: "Phone Directory", link: "/" },
  { name: "Refer a Patient", link: "/" },
];

const footerLinks2 = [
  { name: "Consultation", link: "/" },
  { name: "Emergency Medicine", link: "/" },
  { name: "Financial Services", link: "/" },
  { name: "Health and Wellness", link: "/" },
  { name: "News & Events", link: "/" },
  { name: "Patient Experience", link: "/" },
  { name: "Primary Care", link: "/" },
];

const footerLinks3 = [
  { name: "Careers", link: "/" },
  { name: "Contact Us", link: "/" },
  { name: "Locations", link: "/" },
  { name: "Departments", link: "/" },
  { name: "For Employees", link: "/" },
  { name: "Laboratories", link: "/" },
  { name: "Research Faculty", link: "/" },
];

export default function Footer() {
  const location = useLocation();
  const check = location.pathname === "/symptom-checker";

  return (
    <footer
      className={`footer w-100 footer-bg footer__background ${
        check ? "footer__padding-0" : ""
      }`}
    >
      <div className="content-container">
        <div className="footer__wrapper">
          <div className="c-3 md-12">
            <div className="footer__logo">
              <img
                src={BaySideLogo}
                alt="footer logo"
                width="150"
                height="70"
                loading="lazy"
              />
            </div>
            <div className="footer__logo-header">
              <span>BaySide Hospital</span>
            </div>
            <div className="footer-logo-address footer__logo-address">
              <span>
                7171 N Dale Mabry Hwy <br /> Tampa, FL 33614
              </span>
            </div>
            <div className="footer__logo-header">Follow us</div>
            <div className="footer__socials">
              <Link aria-label="Facebook">
                <div className="footer__socials-icon">
                  <span>
                    <i className="bi bi-facebook"></i>
                  </span>
                </div>
              </Link>
              <Link aria-label="Youtube">
                <div className="footer__socials-icon">
                  <span>
                    <i className="bi bi-youtube"></i>
                  </span>
                </div>
              </Link>
              <Link aria-label="Twitter">
                <div className="footer__socials-icon">
                  <span>
                    <i className="bi bi-twitter-x"></i>
                  </span>
                </div>
              </Link>
              <Link aria-label="Instagram">
                <div className="footer__socials-icon">
                  <span>
                    <i className="bi bi-instagram"></i>
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="c-3 md-12">
            <div className="footer__header">Explore Options</div>
            <ul className="footer__list">
              {footerLinks1.map((e) => (
                <li className="footer__list-item" key={e.name}>
                  <Link to={e.link}>{e.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="c-3 md-12">
            <div className="footer__header">Patient Resources</div>
            <ul className="footer__list">
              {footerLinks2.map((link) => (
                <li className="footer__list-item" key={link.name}>
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="c-3 md-12">
            <div className="footer__header">About BaySide Hospital</div>
            <ul className="footer__list">
              {footerLinks3.map((link) => (
                <li className="footer__list-item" key={link.name}>
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="copyright__wrapper">
          <div className="copyright__wrapper-header">
            <span>Copyright © 2024 BaySide. All rights reserved.</span>
          </div>
          <div className="copyright__wrapper-body">
            <span>
              The information on BaySide.com is for reference, research, and
              recommendation purposes only. Customers should not apply it on
              their own. BaySide hospital is not responsible for any cases of
              self-application without a doctor's prescription.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
