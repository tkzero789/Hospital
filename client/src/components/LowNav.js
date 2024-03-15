import React from "react";
import { NavLink } from "react-router-dom";

export default function LowNav() {
  const navLinks = [
    { link: "/home", text: "Giới thiệu" },
    { link: "", text: "Chuyên khoa" },
    { link: "", text: "Bác sĩ" },
    { link: "", text: "Chẩn đoán" },
    { link: "/record-list", text: "Dịch vụ y khoa" },
    { link: "", text: "Chăm sóc khách hàng" },
  ];

  return (
    <>
      {/* LOWER NAVBAR */}
      <div className="w-100 sub-nav-bg">
        <div className="nav-container">
          <nav className="sub-nav-bg py-0 d-none d-lg-block d-xl-block">
            <ul className="low-nav-list">
              {navLinks.map((link) => (
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
    </>
  );
}
