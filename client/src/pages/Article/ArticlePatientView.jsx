import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ArticlePatientView({ userRole, userInfos }) {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { articleId } = useParams();

  // Fetch data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/article/${articleId}`)
      .then((res) => {
        const dbarticle = res.data;
        if (!dbarticle) {
          window.alert(`Article with id ${articleId} not found`);
        }
        console.log(dbarticle);
        setArticle(dbarticle);
        setIsLoading(false);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [articleId]);

  // Article
  const ArticleContent = ({ element }) => {
    const elemOverview = element.overview;
    const elemDetail = element.detail;
    return (
      <div>
        <p>{elemOverview}</p>
        {element.image && (
          <img
            alt={element.image}
            src={element.image}
            className="d-block w-50 p-5 mx-auto"
          />
        )}
        {elemDetail.split("\n\n").map((paragraph) => (
          <div key={paragraph.slice(0, 20)}>
            {paragraph.split("\n").map((line) => {
              // Determine if the line starts with "  •" to conditionally add a class
              const isLineWithBulletPoint = line.startsWith("   •");
              let processedLine;

              if (isLineWithBulletPoint) {
                const splitIndex = line.indexOf(":");
                if (splitIndex !== -1) {
                  processedLine = (
                    <>
                      <span className="fw-med">
                        {line.slice(1, splitIndex + 1)}
                      </span>
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

              // Conditionally assign a class name based on whether the line starts with "•"
              const className = isLineWithBulletPoint ? " ps-4" : "";
              return (
                <p key={line.slice(0, 10)} className={className}>
                  {processedLine}
                </p>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{article && article.title ? article.title : ""}</title>
        </Helmet>
      </HelmetProvider>
      <div className="symp-checker w-100">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="content-container">
            <h3 className="text-center">{article.title}</h3>
            <div className="symp-checker-steps">
              <h2>Overview</h2>
              {article.infos.map((info) => (
                <ArticleContent element={info} key={info.id} />
              ))}
              <h2>Treatments</h2>
              {article.treatments.map((trm) => (
                <ArticleContent element={trm} key={trm.id} />
              ))}
              <hr></hr>
              <div className="row">
                <p className="d-flex justify-content-end">
                  {article.createInfos.doctorCreated}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
