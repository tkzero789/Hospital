import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BKCsvg from "../../assets/logo/bkcaresvg.svg";

export default function MobileNav({ to }) {
  const [show, setShow] = useState(false);

  const handleButtonClick = () => {
    setShow(!show);
  };

  const location = useLocation();

  const handleLinkClick = (event) => {
    const { to } = event.currentTarget.dataset;
    if (location.pathname === to) {
      event.preventDefault();
      window.location.reload();
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg mobile-nav d-md-block d-lg-none">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            <div className="mobile-nav-logo">
              <img src={BKCsvg} alt="hospital logo" />
            </div>
          </NavLink>

          <button
            onClick={handleButtonClick}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="mobile-nav-icon">
              <div>
                {show ? <i class="bi bi-x-lg"></i> : <i class="bi bi-list"></i>}
              </div>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-lg-0">
              <li className="nav-item px-2 text-black">
                <NavLink
                  className="mobile-nav-link"
                  to="/home"
                  data-to="/home"
                  onClick={handleLinkClick}
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink
                  className="mobile-nav-link"
                  to="/appt-request"
                  data-to="/appt-request"
                  onClick={handleLinkClick}
                >
                  Thông tin
                </NavLink>
              </li>
              <li className="nav-item px-2 text-black">
                <NavLink
                  className="mobile-nav-link"
                  to="/appt-request"
                  data-to="/appt-request"
                  onClick={handleLinkClick}
                >
                  Đăng ký khám bệnh
                </NavLink>
              </li>
              <li className="nav-item px-2 text-black">
                <NavLink
                  className="mobile-nav-link"
                  to="/symptom-checker"
                  data-to="/symptom-checker"
                  onClick={handleLinkClick}
                >
                  Chẩn đoán - Xem kết quả online
                </NavLink>
              </li>

              <li className="nav-item dropdown px-2">
                <NavLink
                  className="mobile-nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Khác
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item bg-white"
                      to="/symptom-checker"
                      onClick={handleLinkClick}
                    >
                      Bác sĩ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item bg-white"
                      to="/symptom-checker"
                      onClick={handleLinkClick}
                    >
                      Chuyên khoa
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="dropdown-item bg-white"
                      to="/appt-request"
                      onClick={handleLinkClick}
                    >
                      Tin tức - Y học thường thức
                    </NavLink>
                  </li>
                  <li className="dropdown-divider"></li>

                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      to="/symptom-checker"
                    >
                      Liên hệ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      to="/symptom-checker"
                    >
                      Lịch làm việc
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
