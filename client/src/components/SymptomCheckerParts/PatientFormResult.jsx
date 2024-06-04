import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SwipeResults from "./SwipeResults";

const PatientFormResult = ({ patientResult }) => {
  const [article, setArticle] = useState([]);

  // Fetch main articles
  useEffect(() => {
    const fetchData = async () => {
      try {
        let articles = [];
        for (let result of patientResult) {
          const res = await axios.get(
            `http://localhost:5000/article/by-disease/${result.id}`
          );
          const validArticles = res.data.filter(
            (article) =>
              article.isDisplay === true &&
              article.diseaseId === patientResult[0].id
          );
          articles = articles.concat(validArticles);
          console.log("result", result);
        }
        setArticle(articles);
        console.log("article", articles);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [patientResult]);

  // Fetch other articles

  console.log("patientResult", patientResult);

  return (
    <div>
      <div className="pb-5">
        <div className="text-center">
          <h4 className="text-blue-2">Results based on your provided info</h4>
        </div>
        <div className="symp-step-4">
          {/* Disease */}
          <div className="c-3 disease-list">
            {patientResult.map((i) => {
              return (
                <>
                  <div className="disease-list-item">
                    <p>{i.name}</p>
                    <p>{i.medSpecialty}</p>
                    <p>{String(i.matchedScore)}</p>
                  </div>
                </>
              );
            })}
          </div>
          {/* Main article */}
          <div className="main-article c-9 d-flex flex-column">
            <div className="main-article-wrapper">
              {article
                .filter((a) => a.isDisplay === true)
                .map((i) => {
                  return (
                    <>
                      <div className="main-article-title">
                        <h5>{i.title}</h5>
                      </div>
                      <p className="main-article-subtitle">
                        {i.infos[0].about}
                      </p>
                      <p className="main-article-detail">
                        {i.infos[0].overview}
                      </p>
                      <p className="main-article-detail">{i.infos[0].detail}</p>
                      <p className="main-article-subtitle">
                        {i.treatments[0].about}
                      </p>
                      <p className="main-article-detail">
                        {i.treatments[0].overview}
                      </p>
                      <p className="main-article-detail">
                        {i.treatments[0].detail}
                      </p>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
        {/* Others articles */}
        <div className="other-articles">
          <div className="other-articles-wrapper">
            {article
              .filter((a) => a.isDisplay !== true && a.status === "Approved")
              .map((i) => {
                return (
                  <>
                    <div className="other-articles-item">
                      <SwipeResults />
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFormResult;
