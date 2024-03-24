import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logoBKC.png";
import BCTLogo from "../assets/bctLogo.png";

const footerLinks1 = [
  { name: "Dịch vụ", link: "/" },
  { name: "Tư vấn", link: "/" },
  { name: "Chuyên khoa", link: "/" },
  { name: "Đặt lịch khám", link: "/" },
  { name: "Viện nghiên cứu", link: "/" },
  { name: "Thông tin Dược", link: "/" },
];

const footerLinks2 = [
  { name: "Trang chủ", link: "/" },
  { name: "Giới thiệu", link: "/" },
  { name: "Đối tác", link: "/" },
  { name: "Dự án", link: "/" },
  { name: "Đội ngũ", link: "/" },
  { name: "Tuyển dụng", link: "/" },
];

export default function Footer() {
  return (
    <footer className="footer w-100 footer-bg">
      <div className="content-container">
        <div className="footer-wrapper">
          <div className="c-3">
            <div className="footer-logo-wrapper">
              <img className="footer-logo" src={Logo} alt="Footer logo"></img>
            </div>
            <div className="footer-logo-header">
              <span>Công ty cổ phần bệnh viện Đa khoa BKC</span>
            </div>
            <div className="footer-logo-address">
              <span>Khu túc xá Đại Học Quốc Gia thành phố Hồ Chí Minh</span>
            </div>
          </div>
          <div className="c-3">
            <div className="footer-header">Hỗ trợ khách hàng</div>
            <ul className="footer-list">
              {footerLinks1.map((link) => (
                <li className="footer-item" key={link.name}>
                  <NavLink className="footer-item__link" to={link.link}>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="c-3">
            <div className="footer-header">Liên kết</div>
            <ul className="footer-list">
              {footerLinks2.map((e) => (
                <li className="footer-item" key={e.name}>
                  <NavLink className="footer-item__link" to={e.link}>
                    {e.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="c-3">
            <div className="footer-header">Mạng xã hội</div>
            <div className="footer-socials">
              <NavLink className="footer-socials__link">
                <div className="footer-socials-icon">
                  <span>
                    <i class="bi bi-facebook"></i>
                  </span>
                </div>
              </NavLink>
              <NavLink className="footer-socials__link">
                <div className="footer-socials-icon">
                  <span>
                    <i class="bi bi-youtube"></i>
                  </span>
                </div>
              </NavLink>
            </div>
            <div className="bct-logo-wrapper">
              <img
                className="bct-logo"
                src={BCTLogo}
                alt="Đã thông báo Bộ Công Thương"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="footer-copyright">
          <div className="copyright-header">
            <span>Copyright © 2024 BKC. All rights reserved.</span>
          </div>
          <div className="copyright-body">
            <span>
              Các thông tin trên website BKC.com chỉ dành cho mục đích tham
              khảo, tra cứu, khuyến nghị. Quý khách hàng không tự ý áp dụng. BKC
              không chịu trách nhiệm về những trường hợp tự ý áp dụng mà không
              có chỉ định của bác sĩ.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
