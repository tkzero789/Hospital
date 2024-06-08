import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../css/swiperarticles.css";
import RightArrow from "../../assets/home/right-arrowSVG.svg";
import { Skeleton } from "@mui/material";

const PatientFormResult = ({ patientResult }) => {
  const [article, setArticle] = useState([]);
  const [otherArticles, setOtherArticles] = useState([]);
  const [selectedDiseaseIndex, setSelectedDiseaseIndex] = useState(0);
  const [loading, setIsLoading] = useState(false);

  // Fetch articles
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let mainArticle = [];
        let otherArticles = [];
        for (let result of patientResult) {
          const res = await axios.get(
            `http://localhost:5000/article/by-disease/${result.id}`
          );
          const validArticles = res.data.filter(
            (article) =>
              article.isDisplay === true &&
              article.diseaseId === patientResult[selectedDiseaseIndex].id
          );
          const relatedArticles = res.data.filter(
            (article) =>
              article.isDisplay === false &&
              article.diseaseId === patientResult[selectedDiseaseIndex].id
          );
          mainArticle = mainArticle.concat(validArticles);
          otherArticles = otherArticles.concat(relatedArticles);

          console.log("result", result);
        }
        const timer = setTimeout(() => {
          setArticle(mainArticle);
          setOtherArticles(otherArticles);
          setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [patientResult, selectedDiseaseIndex]);

  // Switch index
  async function handleDiseaseClick(index) {
    setSelectedDiseaseIndex(index);
  }

  return (
    <div>
      <div className="pb-5">
        <div className="text-center">
          <h4 className="text-blue-2">Results based on your provided info</h4>
        </div>
        <div className="symp-step-4">
          {/* Diseases list */}
          <div className="c-4 disease-list">
            <h6>Conditions that match your symptoms</h6>
            {patientResult
              .filter((i) => i.status === "Approved")
              .map((i, index) => (
                <div
                  key={index}
                  className={`disease-list-item ${
                    selectedDiseaseIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleDiseaseClick(index)}
                >
                  <p>{i.name}</p>
                  <p>{i.medSpecialty}</p>
                  <p>{String(i.matchedScore)}</p>
                  {selectedDiseaseIndex === index ? (
                    <span>Selected</span>
                  ) : (
                    <img src={RightArrow} alt="icon" />
                  )}
                </div>
              ))}
          </div>
          {/* Main article */}
          <div className="main-article c-8 d-flex flex-column">
            <div className="main-article-wrapper">
              {loading
                ? Array(10)
                    .fill()
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="text"
                        animation="wave"
                        sx={{ fontSize: "2rem" }}
                        style={{ margin: "0 10px" }}
                      />
                    ))
                : article
                    .filter((a) => a.isDisplay === true)
                    .map((i) =>
                      i.status === "Approved" ? (
                        <>
                          <div className="main-article-title">
                            <h5>{i.title}</h5>
                          </div>
                          <hr />
                          <h5 className="main-article-overview">Overview</h5>
                          <p className="main-article-detail">
                            {i.infos[0].overview}
                          </p>
                          <p className="main-article-detail">
                            {i.infos[0].detail}
                          </p>
                          <h5 className="main-article-treatment">Treatments</h5>
                          <p className="main-article-detail">
                            {i.treatments[0].overview}
                          </p>
                          <p className="main-article-detail">
                            {i.treatments[0].detail}
                          </p>
                        </>
                      ) : (
                        <div className="position-absolute top-50 start-50 translate-middle">
                          Sorry, but it appears that the information regarding
                          your selected condition is not available at this time.
                        </div>
                      )
                    )}
            </div>
          </div>
        </div>
        <hr />
        {/* Others articles */}
        <div className="other-articles">
          <h6>Related articles: </h6>
          <Swiper
            breakpoints={{
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
              },
            }}
            spaceBetween={64}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {otherArticles
              .filter((a) => a.status === "Approved")
              .map((i, index) => (
                <SwiperSlide key={index}>
                  <Link
                    target="_blank"
                    to={`/articles/${i.id}`}
                    className="swipe-article"
                  >
                    <div className="swipe-article-info">
                      <h6>{i.title}</h6>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PatientFormResult;
