import React from "react";
import { NavLink } from "react-router-dom";
import NewsIMG1 from "../assets/home/newsImg1.jpg";
import NewsIMG2 from "../assets/home/newsImg2.jpg";
import NewsIMG3 from "../assets/home/newsImg3.jpg";
import NewsIMG4 from "../assets/home/newsImg4.jpg";

export default function News() {
  return (
    <>
      <section className="news w-100">
        <div className="content-container">
          <div className="news-wrapper">
            <div className="news-header">Tin tức y học mới nhất</div>
            <div className="news-section">
              <div className="c-7 m-12">
                <div className="news-section-left">
                  <div className="news-left-wrapper">
                    <NavLink className="news-link-left">
                      <div className="img-container-left">
                        <img
                          className="news-img-left"
                          src={NewsIMG1}
                          alt="News 1"
                        ></img>
                      </div>
                      <div className="news-title-left">
                        Thoát vị đĩa đệm cột sống thắt lưng là bệnh gì? Cách
                        phòng tránh hiệu quả
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="c-5 m-12">
                <div className="news-section-right">
                  <div className="news-link-wrapper">
                    <NavLink className="news-link-right">
                      <div className="img-container-right">
                        <img
                          className="news-img-right"
                          src={NewsIMG2}
                          alt="News 1"
                        ></img>
                      </div>
                      <div className="news-title-right">
                        Giải pháp chăm sóc sức khoẻ cho cả gia đình
                      </div>
                    </NavLink>
                    <NavLink className="news-link-right">
                      <div className="img-container-right">
                        <img
                          className="news-img-right"
                          src={NewsIMG3}
                          alt="News 1"
                        ></img>
                      </div>
                      <div className="news-title-right">
                        Nâng cao công tác chăm sóc sức khỏe nhân dân trong tình
                        hình mới
                      </div>
                    </NavLink>
                    <NavLink className="news-link-right">
                      <div className="img-container-right">
                        <img
                          className="news-img-right"
                          src={NewsIMG4}
                          alt="News 1"
                        ></img>
                      </div>
                      <div className="news-title-right">
                        Hợp tác chuyên môn nhằm nâng cao chất lượng khám, chữa
                        bệnh của hệ thống
                      </div>
                    </NavLink>
                  </div>
                  <div className="news-btn-wrapper">
                    <NavLink className="news-btn-link">
                      Xem tất cả tin tức
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
