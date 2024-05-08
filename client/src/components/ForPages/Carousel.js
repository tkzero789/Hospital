import React from "react";
import HI1 from "../../assets/carousel/h6.jpg";
import HI3 from "../../assets/carousel/h8.png";
import Test9 from "../../assets/carousel/test9.png";

export default function Carousel() {
  return (
    <>
      <div
        id="carouselExampleInterval"
        className="carousel slide d-none d-lg-block d-xl-block"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="5000">
            <img className="car-img" src={HI1} alt="Background 1" />
          </div>
          <div className="carousel-item" data-bs-interval="5000">
            <img className="car-img" src={HI3} alt="Background 3" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
