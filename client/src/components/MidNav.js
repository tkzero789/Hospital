import { NavLink } from "react-router-dom";
import Logo from "../assets/logoBKC.png";

export default function MidNav() {
  const navLinks = [
    { link: "/home", text: "Hệ thống BKCare" },
    { link: "", text: "Phòng khám online" },
  ];

  return (
    <div className="w-100 mid-nav-bg">
      <div className="nav-container">
        <nav className="mid-nav-bg py-0 d-none d-lg-block d-xl-block">
          <ul className="mid-nav-list">
            <div className="d-flex align-items-center">
              <NavLink className="nav-link py-0 px-0" to="/home">
                <div className="logo-container">
                  <img className="logo-img" src={Logo} alt="Company logo" />
                </div>
              </NavLink>
              {navLinks.map((link) => (
                <li key={link.link} className="mid-nav-item">
                  <NavLink className="nav-link py-2" to={link.link}>
                    <div className="mid-nav-text">{link.text}</div>
                  </NavLink>
                </li>
              ))}
            </div>
            <div className="d-flex">
              <div className="mid-item-wrapper">
                <div className="mid-item-icon">
                  <i class="bi bi-telephone"></i>
                </div>
                <div className="mid-item-text">Hotline: 0905 677 589</div>
              </div>
              <NavLink className="mid-item-wrapper" to="/appt-request">
                <div className="mid-item-icon">
                  <i class="bi bi-calendar-week"></i>
                </div>
                <div className="mid-item-text">Đăng ký khám</div>
              </NavLink>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}
