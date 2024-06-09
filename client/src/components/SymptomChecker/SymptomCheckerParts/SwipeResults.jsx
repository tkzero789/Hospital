import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "css/swipernews.css";

const SwipeResults = () => {
  return (
    <>
      <div>
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
          <SwiperSlide>1</SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default SwipeResults;
