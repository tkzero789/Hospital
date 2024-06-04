import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../css/swiper.css";
import img from "../../assets/home/cardi2.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SwipeNews() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/blog");
        setBlogs(res.data.reverse());
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div className="news w-100">
        <div className="content-container">
          <div className="news-wrapper">
            <div className="news-header">Latest News</div>
            <div className="news-section">
              <Swiper
                breakpoints={{
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={50}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {blogs.slice(0, 8).map((blog) => (
                  <SwiperSlide key={blog.id}>
                    <div className="swipe-news">
                      <Link
                        className="swipe-news-wrapper"
                        to={`/view-blog-list/${blog.id}`}
                      >
                        <div>
                          <div className="swipe-news-img">
                            <img src={blog.image} alt={blog.title} />
                          </div>
                          <div className="swipe-news-text">
                            <div className="swipe-news-title">
                              <h5>{blog.title}</h5>
                            </div>
                            <div className="swipe-news-sub">
                              <p>{blog.intro}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="news-btn-wrapper">
              <Link className="news-btn-link" to="/view-blog-list">
                View all news
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
