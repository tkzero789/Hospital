import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "components/HomePage/SwipeNews/SwipeNews.scss";

export default function SwipeNews() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/news/blogSwipe`
        );
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <section className="news w-100">
        <div className="content-container">
          <div className="news__wrapper">
            <div className="news__wrapper-header">Latest News</div>
            <div className="news__section">
              <Swiper
                breakpoints={{
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={54}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {blogs?.map((blog) => {
                  const thumbnailImage = blog.content?.content.find(
                    (item) => item.type === "image"
                  );
                  return (
                    <SwiperSlide key={blog.id}>
                      <div className="swipe__news">
                        <Link
                          className="swipe__news-wrapper"
                          to={`/news/view/${blog.slug}`}
                        >
                          <div className="h-100">
                            <div className="swipe__news-img">
                              {thumbnailImage && (
                                <img
                                  src={thumbnailImage.attrs.src}
                                  alt={
                                    thumbnailImage.attrs.alt ||
                                    "Thumbnail image"
                                  }
                                  loading="lazy"
                                />
                              )}
                            </div>
                            <div className="swipe__news-text">
                              <div className="swipe__news-title">
                                <h5>{blog.title}</h5>
                              </div>
                              <div className="swipe__news-sub">
                                <p>{blog.intro}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="news__btn">
              <Link to="/news/page-1">View all news</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
