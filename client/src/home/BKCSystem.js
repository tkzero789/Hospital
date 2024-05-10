import React from "react";
import { NavLink } from "react-router-dom";
import AmbulanceSVG from "../assets/home/ambulanceSVG.svg";
import ClipboardSVG from "../assets/home/clipboardSVG.svg";
import HospitalSVG from "../assets/home/hospitalSVG.svg";

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
                  Một hệ thống được xây dựng với mục đích nâng cao chất lượng
                  dịch vụ cho người bệnh, và tạo ra một cộng đồng nơi mọi người
                  có thể chia sẻ kinh nghiệm và kiến thức về chăm sóc sức khoẻ.
                  Chúng tôi tin rằng, thông qua việc san sẻ và học hỏi, chúng ta
                  sẽ góp phần xây dựng một xã hội khoẻ mạnh hơn.
                </div>
                <div className="syst-card-wrapper">
                  <div className="syst-card">
                    <NavLink className="syst-card-link">
                      <div className="syst-card-img">
                        <img
                          className="card-img"
                          src={AmbulanceSVG}
                          alt="BKCare System"
                        ></img>
                      </div>
                      <div className="syst-card-header">
                        Giải pháp y tế khẩn cấp
                      </div>
                      <div className="syst-card-body">
                        Trang thiết bị tiên tiến giúp chúng tôi đáp ứng mọi nhu
                        cầu y tế của bạn một cách nhanh chóng và chính xác.
                      </div>
                    </NavLink>
                  </div>
                  <div className="syst-card">
                    <NavLink className="syst-card-link">
                      <div className="syst-card-img">
                        <img
                          className="card-img"
                          src={HospitalSVG}
                          alt="BKCare System"
                        ></img>
                      </div>
                      <div className="syst-card-header">
                        Hệ thống bệnh viện chuyên nghiệp
                      </div>
                      <div className="syst-card-body">
                        Cam kết cung cấp dịch vụ y tế hàng đầu với đội ngũ y bác
                        sĩ và y tá tận tâm và giàu kinh nghiệm.
                      </div>
                    </NavLink>
                  </div>
                  <div className="syst-card">
                    <NavLink className="syst-card-link">
                      <div className="syst-card-img">
                        <img
                          className="card-img"
                          src={ClipboardSVG}
                          alt="BKCare System"
                        ></img>
                      </div>
                      <div className="syst-card-header">
                        Chăm sóc y tế chất lượng cao
                      </div>
                      <div className="syst-card-body">
                        Cải thiện chất lượng cuộc sống của bạn thông qua dịch vụ
                        y tế tốt nhất, vì bạn là ưu tiên hàng đầu của chúng tôi.
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
