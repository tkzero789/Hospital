import React from "react";
import HI1 from "../assets/h6.jpg";
import HI2 from "../assets/h7.png";
import HI3 from "../assets/h8.png";

const Carousel = () => {
  const images = [HI1, HI2, HI3];

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide d-none d-lg-block d-xl-block"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            data-bs-interval="5000"
          >
            <img
              className="car-img d-block w-100"
              src={image}
              alt={`Background ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
