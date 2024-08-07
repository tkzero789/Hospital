import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Skeleton } from "@mui/material";
import RightArrow from "assets/icons/right-arrow-icon.svg";
import ResultBar from "components/UI/ProgressBar";
import MobileDiseaseList from "../MobileDiseaseList/MobileDiseaseList";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "components/SymptomChecker/SymptomChecker.scss";

const PatientFormResult = ({ patientResult }) => {
  const [article, setArticle] = useState([]);
  const [otherArticles, setOtherArticles] = useState([]);
  const [selectedDiseaseIndex, setSelectedDiseaseIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
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
            `${process.env.REACT_APP_API_BASE_URL}/article/by-disease/${result.id}`
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
    setIsClicked(true);
    let scrollPosition = 0;

    // adjust scroll position based on viewport width
    if (window.innerWidth <= 767) {
      scrollPosition = 0;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 991) {
      scrollPosition = 0;
    } else {
      scrollPosition = 220;
    }

    window.scrollTo({ top: scrollPosition, left: 0, behavior: "instant" });
  }

  // Format detail text
  function processDetailText(detailText) {
    return detailText.split("\n").map((line, index) => {
      const isLineWithBulletPoint = line.startsWith("   •");
      const isEmptyLine = line.trim() === "";
      let processedLine;
      let className = "main-article-detail";

      if (isLineWithBulletPoint) {
        className += " ps-4 d-block";
        const splitIndex = line.indexOf(":");
        if (splitIndex !== -1) {
          processedLine = (
            <>
              <span className="fw-med">{line.slice(1, splitIndex + 1)}</span>
              {line.slice(splitIndex + 1)}
            </>
          );
        } else {
          processedLine = (
            <>
              <span className="fw-med">{line.slice(1)}</span>
            </>
          );
        }
      } else {
        processedLine = line;
      }

      if (isEmptyLine) {
        className += " pt-0";
      }

      return (
        <span key={index} className={className}>
          {processedLine}
        </span>
      );
    });
  }

  return (
    <div>
      <div className="pb-5">
        <div className="text-center">
          <h4 className="text-dark-sub-header">
            Results based on your provided info
          </h4>
        </div>
        <button
          className="m-back-list"
          onClick={(e) => {
            e.preventDefault();
            setIsClicked(false);
          }}
        >
          <div>
            <span>
              <i className="bi bi-caret-up-fill"></i>
            </span>
            <span>Choose different conditions</span>
          </div>
        </button>
        <MobileDiseaseList
          patientResult={patientResult}
          selectedDiseaseIndex={selectedDiseaseIndex}
          handleDiseaseClick={handleDiseaseClick}
          RightArrow={RightArrow}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
        />
        <div className="symp-step-4">
          {/* Diseases list */}
          <div className="c-4 md-12 disease-list">
            <h6>Conditions that match your symptoms</h6>
            {patientResult
              .filter((i) => i.status === "Approved")
              .map((i, index) => {
                const matchedScore = parseInt(i.matchedScore, 10);
                let strengthLevel;

                if (matchedScore <= 5) {
                  strengthLevel = "Weak";
                } else if (matchedScore > 5 && matchedScore <= 14) {
                  strengthLevel = "Fair";
                } else if (matchedScore > 14 && matchedScore <= 28) {
                  strengthLevel = "High";
                } else {
                  strengthLevel = "Significant";
                }
                return (
                  <div
                    key={index}
                    className={`disease-list-item ${
                      selectedDiseaseIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleDiseaseClick(index)}
                  >
                    <p>{i.name}</p>
                    <p>Specialty: {i.medSpecialty}</p>
                    <p>
                      Result strength:{" "}
                      <span className="fw-med">{strengthLevel}</span>
                    </p>
                    <div className="pt-1">
                      <ResultBar score={String(i.matchedScore)} />
                    </div>
                    {selectedDiseaseIndex === index ? (
                      <span className="selected-disease">Selected</span>
                    ) : (
                      <img src={RightArrow} alt="icon" />
                    )}
                  </div>
                );
              })}
          </div>
          {/* Main article */}
          <div className="main-article c-8 md-12 d-flex flex-column">
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
                    .map((i, index) =>
                      i.status === "Approved" ? (
                        <React.Fragment key={index}>
                          <div className="main-article-title">
                            <h5>{i.title}</h5>
                          </div>
                          <hr />
                          <h5 className="main-article-overview">Overview</h5>
                          <p className="main-article-detail">
                            {i.infos[0].overview}
                          </p>
                          <p className="main-article-detail">
                            {processDetailText(i.infos[0].detail)}
                          </p>
                          <h5 className="main-article-treatment">Treatments</h5>
                          <p className="main-article-detail">
                            {i.treatments[0].overview}
                          </p>
                          <p className="main-article-detail">
                            {processDetailText(i.treatments[0].detail)}
                          </p>
                        </React.Fragment>
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
