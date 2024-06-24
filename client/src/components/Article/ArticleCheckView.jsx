import React from "react";
import "components/SymptomChecker/SymptomChecker.css";

export default function ArticlePatView({ article, setIsPatView }) {
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
            className="d-block w-50 mx-auto"
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

              // Conditionally assign a class name based on whether the line starts with "  •"
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
    <div className="symp-checker w-100">
      <div className="content-container">
        <h3 className="text-center">{article.title}</h3>
        <div className="symp-checker-steps">
          <h5>Overview</h5>
          {article.infos.map((info, index) => (
            <ArticleContent element={info} key={index} />
          ))}
          <h5>Treatments</h5>
          {article.treatments.map((trm, index) => (
            <ArticleContent element={trm} key={index} />
          ))}
          <hr></hr>
          <div className="row py-3">
            <div className="c-6">
              <button
                type="button"
                className="btn btn-outline-secondary w-25"
                onClick={() => setIsPatView(false)}
              >
                Back
              </button>
            </div>
            <div className="c-6 text-end">
              <p>By: Dr. {article.createInfos.doctorCreated}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
