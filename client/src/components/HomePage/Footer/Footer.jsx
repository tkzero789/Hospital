import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BaySideLogo from "assets/logo/BaySide-logo-2.svg";
import "components/HomePage/Footer/footer.css";

const footerLinks1 = [
  { name: "Home", link: "/" },
  { name: "Our team", link: "/" },
  { name: "Specialties", link: "/" },
  { name: "Latest news", link: "/" },
  { name: "BaySide system", link: "/" },
  { name: "Health and wellness", link: "/" },
];

const footerLinks2 = [
  { name: "Lab", link: "/" },
  { name: "Services", link: "/" },
  { name: "Consultation", link: "/" },
  { name: "Primary care", link: "/" },
  { name: "Health and wellness", link: "/" },
  { name: "Request an appointment", link: "/" },
];

export default function Footer() {
  const location = useLocation();
  const footerClass = location.pathname === "/home" ? "footer-home-mt" : "";
  return (
    <footer className={`footer w-100 footer-bg ${footerClass}`}>
      <div className="content-container">
        <div className="footer-wrapper">
          <div className="c-3 md-12">
            <div className="footer-logo-wrapper">
              <img
                className="footer-logo"
                src={BaySideLogo}
                alt="footer logo"
              ></img>
            </div>
            <div className="footer-logo-header">
              <span>BaySide Hospital</span>
            </div>
            <div className="footer-logo-address">
              <span>7171 N Dale Mabry Hwy, Tampa, FL 33614</span>
            </div>
          </div>
          <div className="c-3 md-6">
            <div className="footer-header">Quick connect</div>
            <ul className="footer-list">
              {footerLinks1.map((e) => (
                <li className="footer-item" key={e.name}>
                  <NavLink className="footer-item__link" to={e.link}>
                    {e.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="c-3 md-6">
            <div className="footer-header">Explore</div>
            <ul className="footer-list">
              {footerLinks2.map((link) => (
                <li className="footer-item" key={link.name}>
                  <NavLink className="footer-item__link" to={link.link}>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="c-3 md-12">
            <div className="footer-header">Follow us</div>
            <div className="footer-socials">
              <NavLink className="footer-socials__link">
                <div className="footer-socials-icon">
                  <span>
                    <i className="bi bi-facebook"></i>
                  </span>
                </div>
              </NavLink>
              <NavLink className="footer-socials__link">
                <div className="footer-socials-icon">
                  <span>
                    <i className="bi bi-youtube"></i>
                  </span>
                </div>
              </NavLink>
              <NavLink className="footer-socials__link">
                <div className="footer-socials-icon">
                  <span>
                    <i className="bi bi-twitter-x"></i>
                  </span>
                </div>
              </NavLink>
              <NavLink className="footer-socials__link">
                <div className="footer-socials-icon">
                  <span>
                    <i className="bi bi-instagram"></i>
                  </span>
                </div>
              </NavLink>
            </div>
            <div className="footer-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3522.3603299916645!2d-82.50669742452168!3d28.01346067600846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c16f67337b11%3A0x9c40bf8b22b18f1d!2s7171%20N%20Dale%20Mabry%20Hwy%2C%20Tampa%2C%20FL%2033614!5e0!3m2!1sen!2sus!4v1716919058990!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="footer-copyright">
          <div className="copyright-header">
            <span>Copyright © 2024 BaySide. All rights reserved.</span>
          </div>
          <div className="copyright-body">
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
