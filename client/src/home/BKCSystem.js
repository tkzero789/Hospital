import React from "react";
import { NavLink } from "react-router-dom";
import HosEquip from "../assets/home/hosEquip.jpg";
import HosDoc from "../assets/home/hosDoc.jpg";
import HosServ from "../assets/home/hosServ.jpg";
import HosAward from "../assets/home/hosAward.jpg";

export default function BKCSystem() {
  return (
    <>
      {/* BKC SYSTEM SECTION */}
      <section className="system w-100">
        <div className="content-container">
          <div className="syst-wrapper">
            <div className="c-12">
              <div className="syst-section">
                <div className="syst-header">
                  Hệ thống BKCare - Vì một cuộc sống tốt đẹp hơn
                </div>
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
                          src={HosEquip}
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
                          src={HosDoc}
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
                          src={HosServ}
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
                          src={HosAward}
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
    </>
  );
}
