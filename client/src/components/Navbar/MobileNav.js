import React from "react";
import { NavLink } from "react-router-dom";

export default function MobileNav() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary-subtle d-md-block d-lg-none">
        <div className="container-fluid">
          <NavLink className="navbar-brand" href="#">
            BKCare
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item px-2">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink className="nav-link" href="#">
                  Thông tin
                </NavLink>
              </li>

              <li className="nav-item px-2">
                <NavLink className="nav-link" href="#">
                  Đăng ký khám bệnh
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink className="nav-link" href="#">
                  Chẩn đoán - Xem kết quả online
                </NavLink>
              </li>

              <li className="nav-item dropdown px-2">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Khác
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Bác sĩ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Chuyên khoa
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Tin tức - Y học thường thức
                    </NavLink>
                  </li>
                  <li className="dropdown-divider"></li>

                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Liên hệ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
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
