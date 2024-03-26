import React from "react";
import { NavLink } from "react-router-dom";
import NewsIMG1 from "../assets/newsImg1.jpg";

export default function News() {
  return (
    <>
      <section className="news w-100">
        <div className="content-container">
          <div className="news-wrapper">
            <div className="news-header">Tin tức mới nhất</div>
            <div className="news-section">
              <div className="c-7">
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
                        Hội nghị Hợp tác Y tế Quốc tế, kỷ niệm 50 năm Thiết lập
                        Quan hệ Ngoại giao Việt Nam - Nhật Bản
                      </div>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="c-5">
                <div className="news-section-right">
                  <div className="news-link-wrapper">
                    <NavLink className="news-link-right">
                      <div className="img-container-right">
                        <img
                          className="news-img-right"
                          src={NewsIMG1}
                          alt="News 1"
                        ></img>
                      </div>
                      <div className="news-title-right">
                        Hội nghị Hợp tác Y tế Quốc tế, kỷ niệm 50 năm Thiết lập
                        Quan hệ Ngoại giao Việt Nam - Nhật Bản
                      </div>
                    </NavLink>
                    <NavLink className="news-link-right">
                      <div className="img-container-right">
                        <img
                          className="news-img-right"
                          src={NewsIMG1}
                          alt="News 1"
                        ></img>
                      </div>
                      <div className="news-title-right">
                        Hội nghị Hợp tác Y tế Quốc tế, kỷ niệm 50 năm Thiết lập
                        Quan hệ Ngoại giao Việt Nam - Nhật Bản
                      </div>
                    </NavLink>
                    <NavLink className="news-link-right">
                      <div className="img-container-right">
                        <img
                          className="news-img-right"
                          src={NewsIMG1}
                          alt="News 1"
                        ></img>
                      </div>
                      <div className="news-title-right">
                        Hội nghị Hợp tác Y tế Quốc tế, kỷ niệm 50 năm Thiết lập
                        Quan hệ Ngoại giao Việt Nam - Nhật Bản
                      </div>
                    </NavLink>
                  </div>
                  <div className="news-btn-wrapper">
                    <NavLink className="news-btn-link">
                      <btn class="news-btn">Xem tất cả tin tức</btn>
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
