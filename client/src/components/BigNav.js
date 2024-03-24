import React from "react";
import { NavLink } from "react-router-dom";

export default function BigNav() {
  const upLinks = [
    { link: "/home", text: "Trang chủ" },
    { link: "/test-home", text: "Hướng dẫn" },
    { link: "", text: "Tin tức" },
    { link: "", text: "Tuyển dụng" },
    { link: "", text: "Liên hệ" },
    { link: "/doctor-login", text: "Hỏi đáp" },
  ];

  const lowLinks = [
    { link: "/home", text: "Giới thiệu" },
    { link: "", text: "Chuyên khoa" },
    { link: "", text: "Bác sĩ" },
    { link: "", text: "Chẩn đoán" },
    { link: "/record-list", text: "Dịch vụ y khoa" },
    { link: "", text: "Chăm sóc khách hàng" },
  ];

  return (
    <>
      <div className="navbar-wrapper w-100">
        {/* Up Nav */}
        <div className="w-100 nav-bg">
          <div className="nav-container">
            <nav className="nav-bg py-0 d-none d-lg-block d-xl-block">
              <ul className="main-nav-list">
                {upLinks.map((link, index) => (
                  <li
                    key={link.link}
                    className={`nav-item item ${link.className || ""}`}
                  >
                    <NavLink className="nav-link nav-link-first" to={link.link}>
                      {index === 0 && ( // Check if it's the first item (index 0)
                        <div className="home-icon-wrapper ms-3">
                          <i className="home-icon bi bi-house-door"></i>
                        </div>
                      )}
                      <div className="up-nav-text">{link.text}</div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Low Nav */}
        <div className="w-100 sub-nav-bg ">
          <div className="nav-container">
            <nav className="sub-nav-bg py-0 d-none d-lg-block d-xl-block">
              <ul className="low-nav-list">
                {lowLinks.map((link) => (
                  <li key={link.link} className="low-nav-item">
                    <NavLink className="nav-link" to={link.link}>
                      <div className="low-nav-text">{link.text}</div>
                    </NavLink>
                  </li>
                ))}
                {/* DROPDOWN  */}
                <li className="low-nav-item dropdown-link">
                  <NavLink className="nav-link" to="">
                    <div className="low-nav-text">Khác</div>
                    <div className="dropdown-content">
                      <NavLink>Lịch làm việc</NavLink>
                      <NavLink>Bảo hiểm</NavLink>
                      <NavLink>Tra cứu</NavLink>
                      <NavLink>Thông tin Dược</NavLink>
                      <NavLink>Bảng giá dịch vụ</NavLink>
                      <NavLink>Viện nghiên cứu</NavLink>
                      <NavLink>Hoạt động vì cộng đồng</NavLink>
                    </div>
                  </NavLink>
                </li>

                {/* SEARCH BUTTON */}
                <div className="search">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Tìm kiếm bài viết, trợ giúp"
                    name=""
                  />
                  <div className="search-icon-wrapper">
                    <NavLink href="#" class="search-icon-link">
                      <i className="search-icon bi bi-search"></i>
                    </NavLink>
                  </div>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
