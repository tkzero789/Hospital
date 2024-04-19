import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientFormResult = ({ patientResult }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  // set disease choosing from user, it is the first disease in patientResult (sorted) initially
  const [choosingDisease, setChoosingDisease] = useState({});
  // get all articles form DB related to choosingDisease
  const [diseaseArticles, setDiseaseArticles] = useState([]);
  // set article to display on screen, it is the first article of choosingDisease initially
  const [choosingArticle, setChoosingArticle] = useState({});
  // divide article into Info part and Treatment part
  const [part, setPart] = useState(1);

  useEffect(() => {
    if (patientResult.length > 0) setChoosingDisease(patientResult[0]);
  }, [patientResult]);

  useEffect(() => {
    const articleIds = patientResult[0].relatedArticles.map(
      (article) => article.id
    );
    console.log(articleIds);
    axios
      .post(`http://localhost:5000/article/by-ids`, { ids: articleIds })
      .then((res) => {
        setDiseaseArticles(res.data);
        if (res.data.length > 0) {
          setChoosingArticle(res.data[0]);
        }
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    setIsProcessing(false);
  }, [choosingDisease]);

  const chooseDisease = (disease) => {
    setChoosingDisease(disease);
  };

  const chooseArticle = (article) => {
    setChoosingArticle(article);
  };

  const SuitDiseases = ({ disease }) => {
    return (
      <div
        className="button col-12 mb-3 p-3 box-shadow-1"
        onClick={() => chooseDisease(disease)}
      >
        <h5 className="fw-med text-blue-2" style={{ marginBottom: "1px" }}>
          {disease.name}
        </h5>
        <h6 className="fw-med text-blue-2" style={{ marginBottom: "1px" }}>
          Điểm khớp mô tả: {disease.matchedScore}
        </h6>
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

  const PartDisplay = (articleFirstInfo, articleFirstTrm) => {
    if (part === 1) {
      const firstInfoRows = articleFirstInfo.split("\n");
      return (
        <div>
          {firstInfoRows.map((row) => (
            <p
              className="pt-1 fw-reg"
              style={{ marginBottom: "1px" }}
              key={row.slice(0, 10)}
            >
              {row}
            </p>
          ))}
        </div>
      );
    } else {
      const firstTrmRows = articleFirstTrm.split("\n");
      return (
        <div>
          {firstTrmRows.map((row) => (
            <p
              className="pt-1 fw-reg"
              style={{ marginBottom: "1px" }}
              key={row.slice(0, 10)}
            >
              {row}
            </p>
          ))}
        </div>
      );
    }
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const DisplayedArticle = ({ article }) => {
    console.log(article);
    const articleFirstInfo = article.infos[0].detail.split("\n\n")[1];
    const articleFirstTrm = article.treatments[0].detail.split("\n\n")[1];
    return (
      <div className="col-12 mb-3 p-3 box-shadow-1">
        <h5
          className="fw-med text-blue-2 d-flex justify-content-center pb-3"
          style={{ marginBottom: "1px" }}
        >
          {article.title}
        </h5>
        {SwitchPartButton()}
        {PartDisplay(articleFirstInfo, articleFirstTrm)}
        {/* <button
          className="pt-1 fw-reg d-flex justify-content-end"
          style={{ marginBottom: "1px" }}
          onClick={() =>
            openInNewTab(`http://localhost:3000/articles/${article.id}`)
          }
        >
          Xem chi tiết
        </button> */}
        <Link
          to={`/articles/${article.id}`}
          className="pt-1 fw-reg d-flex justify-content-end"
          style={{ marginBottom: "1px" }}
        >
          Xem chi tiết
        </Link>
      </div>
    );
  };

  const OtherArticle = ({ article }) => {
    return (
      <div
        className="button col-12 mb-3 p-3 box-shadow-1"
        onClick={() => chooseArticle(article)}
      >
        <h5 className="fw-med text-blue-2" style={{ marginBottom: "1px" }}>
          {article.name}
        </h5>
        <h6 className="fw-med text-blue-2" style={{ marginBottom: "1px" }}>
          Viết bởi BS {article.createInfos.doctorCreated}
        </h6>
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
            {patientResult.map((disease) => (
              <SuitDiseases disease={disease} key={disease.id} />
            ))}
          </div>
          <div className="col-8 row">
            <div className="col-12">
              {diseaseArticles.length > 0 && (
                <DisplayedArticle
                  article={choosingArticle}
                  key={choosingArticle.id}
                />
              )}
              {diseaseArticles.length > 1 &&
                diseaseArticles
                  .filter((article) => article.id !== choosingArticle.id)
                  .map((article) => (
                    <OtherArticle article={article} key={article.id} />
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientFormResult;
