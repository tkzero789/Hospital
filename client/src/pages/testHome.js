import React from "react";
import { NavLink } from "react-router-dom";
import MainNav from "../components/MainNav";
import MidNav from "../components/MidNav";
import LowNav from "../components/LowNav";
import HI1 from "../assets/h6.jpg";
import HI2 from "../assets/h7.png";
import HI3 from "../assets/h8.png";
import HospitalImg from "../assets/hospitalBuilding.jpg";
import SystemImg from "../assets/systemImg.jpg";
import Logo from "../assets/logoBKC.png";
import TestApptForm from "../components/TestApptForm";

export default function TestHome() {
  return (
    <>
      {/* NAVBAR */}
      <header>
        <MainNav />
        <MidNav />
        <LowNav />
      </header>

      {/* MOBILE: HAMBURGER MENU */}
      <nav className="navbar navbar-expand-lg nav-bg d-md-block d-lg-none">
        <div className="container-fluid">
          <NavLink className="navbar-brand" href="#">
            Navbar
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
                  Home
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink className="nav-link" href="#">
                  Link
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
                  Dropdown
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Action
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Another action
                    </NavLink>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <NavLink
                      className="dropdown-item bg-white text-black"
                      href="#"
                    >
                      Something else here
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CAROUSEL */}
      <div
        id="carouselExampleInterval"
        class="carousel slide d-none d-lg-block d-xl-block"
        data-bs-ride="carousel"
      >
        <div className="hero-section">
          <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="5000">
              <img
                className="car-img d-block w-100"
                src={HI1}
                alt="Background 1"
              />
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img
                className="car-img d-block w-100"
                src={HI2}
                alt="Background 2"
              />
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img
                className="car-img d-block w-100"
                src={HI3}
                alt="Background 3"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* OPTIONS SECTION */}
      <section className="options w-100">
        <div className="content-container">
          <div className="options-wrapper">
            <div className="c-6">
              <div className="opt-wrapper">
                <div className="opt-header">
                  <div className="opt-header-text">Dịch vụ</div>
                </div>
                <div className="opt-box">
                  <div className="opt-title">Chẩn đoán sức khoẻ trực tuyến</div>
                  <div className="opt-body">
                    Với phòng khám online, bạn có thể tiếp cận các dịch vụ y tế
                    chất lượng mà không cần ra khỏi nhà.
                  </div>
                  <div className="opt-btn-wrapper">
                    <NavLink className="opt-btn-link" to="/record-list">
                      <btn className="opt-btn">Chẩn đoán</btn>
                    </NavLink>
                  </div>
                </div>
                <div className="opt-box">
                  <div className="opt-title">Đăng ký lịch khám</div>
                  <div className="opt-body">
                    Đăng ký dịch vụ khám bệnh của chúng tôi để nhận được sự chăm
                    sóc y tế chất lượng cao mà bạn xứng đáng.
                  </div>
                  <div className="opt-btn-wrapper">
                    <NavLink className="opt-btn-link" to="/appt-request">
                      <btn className="opt-btn">Đăng ký</btn>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="c-6">
              <div className="opt-wrapper">
                <div className="opt-header">
                  <div className="opt-header-text">Thông tin</div>
                </div>
                <div className="big-opt-box">
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i class="bi bi-question-circle"></i>
                      </div>
                      <div className="box-text">Tư vấn</div>
                    </NavLink>
                  </div>
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i class="bi bi-lungs"></i>
                      </div>
                      <div className="box-text">Chuyên khoa</div>
                    </NavLink>
                  </div>
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i class="bi bi-calendar-heart"></i>
                      </div>
                      <div className="box-text">Lịch làm việc</div>
                    </NavLink>
                  </div>
                  <div className="box-select">
                    <NavLink className="box-select-link">
                      <div className="box-icon">
                        <i class="bi bi-file-earmark-medical"></i>
                      </div>
                      <div className="box-text">Bảng giá</div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about w-100">
        <div className="content-container">
          <div className="about-wrapper">
            <div className="c-6">
              <div className="about-section">
                <div className="about-section-header">
                  BKC - Nơi gửi gắm niềm tin sức khỏe
                </div>
                <div className="about-section-body">
                  Chào mừng bạn đến với Bệnh viện BKC, nơi cung cấp dịch vụ chăm
                  sóc sức khỏe chất lượng cao với sự tận tâm và chuyên nghiệp.
                  BKC tự hào là một trong những bệnh viện uy tín tại Việt Nam,
                  với đội ngũ y bác sĩ giàu kinh nghiệm và trang thiết bị hiện
                  đại.
                </div>
              </div>
            </div>
            <div className="c-6">
              <div className="about-img">
                <img
                  className="hospital-img"
                  src={HospitalImg}
                  alt="Hospital Building About Section"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BKC SYSTEM SECTION */}
      <section className="system w-100">
        <div className="content-container">
          <div className="syst-wrapper">
            <div className="c-12">
              <div className="syst-section">
                <div className="syst-header">Hệ thống BKCare</div>
                <div className="syst-body">
                  Hệ thống được xây dựng nhằm mục đích nâng cao chất lượng dịch
                  vụ chăm sóc sức khỏe cho người bệnh, đồng thời giúp cho việc
                  theo dõi sức khỏe của người bệnh trở nên dễ dàng và hiệu quả
                  hơn. Ngoài ra, BKCare còn tạo ra một cộng đồng nơi mọi người
                  có thể chia sẻ kinh nghiệm và kiến thức về sức khỏe. Chúng tôi
                  tin rằng, thông qua việc chia sẻ và học hỏi, mọi người sẽ có
                  thêm kiến thức để chăm sóc sức khỏe của mình tốt hơn.
                </div>
                <div className="syst-card-wrapper">
                  <div className="syst-card">
                    <NavLink className="syst-card-link">
                      <div className="syst-card-img">
                        <img
                          className="card-img"
                          src={SystemImg}
                          alt="BKCare System"
                        ></img>
                      </div>
                      <div className="syst-card-header">
                        Hệ thống trang thiết bị tân tiến
                      </div>
                      <div className="syst-card-body">
                        Với hệ thống trang thiết bị y tế hiện đại bậc nhất, giúp
                        chẩn đoán và điều trị bệnh hiệu quả.
                      </div>
                    </NavLink>
                  </div>
                  <div className="syst-card">
                    <NavLink className="syst-card-link">
                      <div className="syst-card-img">
                        <img
                          className="card-img"
                          src={SystemImg}
                          alt="BKCare System"
                        ></img>
                      </div>
                      <div className="syst-card-header">
                        Đội ngũ y bác sĩ giàu kinh nghiệm
                      </div>
                      <div className="syst-card-body">
                        BKC sở hữu đội ngũ y bác sĩ giỏi, giàu kinh nghiệm, tận
                        tâm và chuyên nghiệp
                      </div>
                    </NavLink>
                  </div>
                  <div className="syst-card">
                    <NavLink className="syst-card-link">
                      <div className="syst-card-img">
                        <img
                          className="card-img"
                          src={SystemImg}
                          alt="BKCare System"
                        ></img>
                      </div>
                      <div className="syst-card-header">
                        Dịch vụ chăm sóc chuyên nghiệp
                      </div>
                      <div className="syst-card-body">
                        BKC cung cấp dịch vụ chăm sóc sức khỏe toàn diện, tận
                        tâm và chuyên nghiệp cho người bệnh.
                      </div>
                    </NavLink>
                  </div>
                  <div className="syst-card">
                    <NavLink className="syst-card-link">
                      <div className="syst-card-img">
                        <img
                          className="card-img"
                          src={SystemImg}
                          alt="BKCare System"
                        ></img>
                      </div>
                      <div className="syst-card-header">
                        Thành tích nổi bật trong 10 năm
                      </div>
                      <div className="syst-card-body">
                        Bệnh viện đã đạt được nhiều thành tích nổi bật trong
                        lĩnh vực y tế, được ghi nhận bởi các tổ chức uy tín.
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="footer w-100 bg-primary-subtle">
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
                <li className="footer-item">
                  <NavLink className="footer-item__link">Dịch vụ</NavLink>
                </li>
                <li className="footer-item">
                  <NavLink className="footer-item__link">Tư vấn</NavLink>
                </li>
                <li className="footer-item">
                  <NavLink className="footer-item__link">Chuyên khoa</NavLink>
                </li>
                <li className="footer-item">
                  <NavLink className="footer-item__link">Đặt lịch khám</NavLink>
                </li>
                <li className="footer-item">
                  <NavLink className="footer-item__link">
                    Viện nghiên cứu
                  </NavLink>
                </li>
                <li className="footer-item">
                  <NavLink className="footer-item__link">
                    Thông tin Dược
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="c-3">
              <div className="footer-header">Liên kết</div>
              <ul className="footer-list">
                <li className="footer-item">
                  <NavLink className="footer-item__link">Trang chủ</NavLink>
                </li>
                <li className="footer-item">
                  <NavLink className="footer-item__link">Giới thiệu</NavLink>
                </li>
                <li className="footer-item">
                  <NavLink className="footer-item__link">Đối tác</NavLink>
                </li>
                <li className="footer-item">
                  <NavLink className="footer-item__link">Dự án</NavLink>
                </li>
                <li className="footer-item">
                  <NavLink className="footer-item__link">Đội ngũ</NavLink>
                </li>
                <li className="footer-item">
                  <NavLink className="footer-item__link">Tuyển dụng</NavLink>
                </li>
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
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
