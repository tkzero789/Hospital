import React from "react";
import HI1 from "../assets/h6.jpg";
import HI3 from "../assets/h8.png";

export default function Carousel() {
  return (
    <>
      <div
        id="carouselExampleInterval"
        class="carousel slide d-none d-lg-block d-xl-block"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="5000">
            <img className="car-img" src={HI1} alt="Background 1" />
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <img className="car-img" src={HI3} alt="Background 3" />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
