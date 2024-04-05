import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientFormResultTest = ({ patientForm }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [suitableArticles, setSuitableArticles] = useState([]);
  const [displayedArticle, setDisplayedArticle] = useState();
  const [part, setPart] = useState(1);
  useEffect(() => {
    axios
      .post(
        `https://symptom-checker-with-mern-backend.onrender.com/suit-articles/`,
        patientForm
      )
      .then((res) => {
        processData(res.data);
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }, []);

  const processData = (apiRes) => {
    setIsProcessing(true);
    setSuitableArticles(apiRes);
    setDisplayedArticle(apiRes[0]);
    setIsProcessing(false);
  };

  const chooseArticle = (article) => {
    setDisplayedArticle(article);
  };

  const SuitableArticle = (props) => {
    console.log(props.article);
    return (
      <div
        className="button col-12 mb-3 p-3 box-shadow-1"
        onClick={() => chooseArticle(props.article)}
      >
        <h5 className="fw-med text-blue-2" style={{ marginBottom: "1px" }}>
          {props.article.diseaseName}
        </h5>
        <p className="pt-1 fw-reg" style={{ marginBottom: "1px" }}>
          Mức độ khớp: {props.article.matchingDetailsCount}
        </p>
      </div>
    );
  };

  const handlePrev = () => {
    setPart((part) => part - 1);
  };
  const handleNext = () => {
    setPart((part) => part + 1);
  };

  const SwitchPartButton = () => {
    return (
      <div className="row pb-3">
        <div className="col-6 d-grid gap-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={part === 1}
            onClick={handlePrev}
          >
            Thông tin chi tiết
          </button>
        </div>
        <div className="col-6 d-grid gap-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={part === 2}
            onClick={handleNext}
          >
            Phương pháp điều trị
          </button>
        </div>
      </div>
    );
  };

  const PartInfo = (props) => {
    const firstInfo = props.articleFirstInfo;
    const firstInfoRows = firstInfo.split("\n");
    return (
      <div>
        {firstInfoRows.map((row, index) => (
          <p
            className="pt-1 fw-reg"
            style={{ marginBottom: "1px" }}
            key={index}
          >
            {row}
          </p>
        ))}
      </div>
    );
  };

  const PartTreatment = (props) => {
    const firstTreatment = props.articleFirstTreatment;
    const firstTreatmentRows = firstTreatment.split("\n");
    return (
      <div>
        {firstTreatmentRows.map((row, index) => (
          <p
            className="pt-1 fw-reg"
            style={{ marginBottom: "1px" }}
            key={index}
          >
            {row}
          </p>
        ))}
      </div>
    );
  };

  const PartDisplay = (articleFirstInfo, articleFirstTreatment) => {
    if (part === 1) {
      return <PartInfo articleFirstInfo={articleFirstInfo} />;
    } else {
      return <PartTreatment articleFirstTreatment={articleFirstTreatment} />;
    }
  };

  const DisplayedArticle = (props) => {
    const articleFirstInfo =
      props.article.diseaseInfos[0].detail.split("\n\n")[1];
    const articleFirstTreatment =
      props.article.diseaseTreatments[0].detail.split("\n\n")[1];
    return (
      <div className="col-12 mb-3 p-3 box-shadow-1">
        <h5
          className="fw-med text-blue-2 d-flex justify-content-center pb-3"
          style={{ marginBottom: "1px" }}
        >
          {props.article.title}
        </h5>
        {SwitchPartButton()}
        {PartDisplay(articleFirstInfo, articleFirstTreatment)}
        <Link
          to={`/articles/${props.article._id}`}
          className="pt-1 fw-reg d-flex justify-content-end"
          style={{ marginBottom: "1px" }}
        >
          Xem chi tiết
        </Link>
      </div>
    );
  };

  return (
    <div>
      <div className="pb-5 text-center text-blue-1 fw-med">
        <h4>Kết quả gợi ý chẩn đoán dựa trên thông tin bạn cung cấp</h4>
      </div>
      {isProcessing ? (
        <div className="row pt-3 pb-3">
          <p>Đang xử lý kết quả...</p>
        </div>
      ) : (
        <div className="row pt-3 pb-3">
          <div className="col-4">
            {suitableArticles.map((article) => (
              <SuitableArticle article={article} key={article._id} />
            ))}
          </div>
          <div className="col-8">
            {suitableArticles.length > 0 ? (
              <DisplayedArticle
                article={displayedArticle}
                key={displayedArticle._id}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientFormResultTest;
