import React from "react";
import HospitalImg from "../assets/home/hospitalBuilding.jpg";

export default function About() {
  return (
    <>
      {/* ABOUT SECTION */}
      <section className="about w-100">
        <div className="content-container">
          <div className="about-wrapper">
            <div className="c-6 m-12">
              <div className="about-section">
                <div className="about-header">
                  BKC - Nơi gửi gắm niềm tin sức khỏe
                </div>
                <div className="about-body">
                  Chào mừng bạn đến với Bệnh viện BKC, nơi cung cấp dịch vụ chăm
                  sóc sức khỏe chất lượng cao với sự tận tâm và chuyên nghiệp.
                  BKC tự hào là một trong những bệnh viện uy tín tại Việt Nam,
                  với đội ngũ y bác sĩ giàu kinh nghiệm và trang thiết bị hiện
                  đại.
                </div>
              </div>
            </div>
            <div className="c-6 m-12">
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
    </>
  );
}
