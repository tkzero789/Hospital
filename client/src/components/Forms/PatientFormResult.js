import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PatientFormResult = ({ patientForm }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [articlesDB, setArticlesDB] = useState([]);
  const [sortedSuitableArticles, setSortedSuitableArticles] = useState([]);
  const [displayedArticle, setDisplayedArticle] = useState();
  const [part, setPart] = useState(1);
  useEffect(() => {
    axios
      .get(`https://symptom-checker-with-mern-backend.onrender.com/article/`)
      .then((res) => {
        const articlesDB = res.data;
        processData(articlesDB);
        console.log(patientForm);
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }, [articlesDB.length]);

  function findSortedSuitableArticles(patientForm) {
    let articlesWithScore = [];
    for (const articleDB of articlesDB) {
      if (!articleDB.diseaseAgeRanges.includes(patientForm.patientAgeRange)) {
        continue;
      } else if (
        !articleDB.diseaseGenders.includes(patientForm.patientGender)
      ) {
        continue;
      }
      let articleSuitableScore = 0;
      for (const symptom of articleDB.diseaseSymptoms) {
        if (
          !patientForm.patientSymptoms
            .map((patientSymptom) => patientSymptom._id)
            .includes(symptom._id)
        ) {
          continue;
        }
        const _patientSymptoms = patientForm.patientSymptoms;
        const patientSymptomIndex = _patientSymptoms.findIndex(
          (patientSymptom) => patientSymptom._id === symptom._id
        );
        for (const category of symptom.categories) {
          // Vi tri, muc do,...
          if (
            !_patientSymptoms[patientSymptomIndex].categories
              .map((category) => category.categoryName)
              .includes(category.categoryName)
          ) {
            continue;
          }
          const _patientCategories =
            _patientSymptoms[patientSymptomIndex].categories;
          const categoryIndex = _patientCategories.findIndex(
            (patientCategory) =>
              patientCategory.categoryName === category.categoryName
          );
          for (const description of category.descriptions) {
            if (
              _patientCategories[categoryIndex].descriptions
                .map((description) => description.descriptionDetail)
                .includes(description.descriptionDetail)
            ) {
              articleSuitableScore += 1;
            }
          }
        }
      }
      articlesWithScore.push({
        _id: articleDB._id,
        score: articleSuitableScore,
      });
    }
    const SuitableArticle = articlesWithScore.filter(
      (article) => article.score > 0
    );
    const sortedSuitableArticle = [...SuitableArticle].sort(
      (a, b) => b.score - a.score
    );

    const sortedSuitableArticlesDB = sortedSuitableArticle.map(
      (suitableArticle) =>
        articlesDB.find((articleDB) => articleDB._id === suitableArticle._id)
    );

    return sortedSuitableArticlesDB;
  }

  const processData = (articlesDB) => {
    setArticlesDB(articlesDB);
    setIsProcessing(true);
    const res = findSortedSuitableArticles(patientForm);
    setSortedSuitableArticles(res);
    setDisplayedArticle(res[0]);
    setIsProcessing(false);
  };

  const chooseArticle = (article) => {
    setDisplayedArticle(article);
  };

  const SuitableArticle = (props) => {
    const articleFirstInfo =
      props.article.diseaseInfos[0].detail.split("\n\n")[1];
    return (
      <div
        className="button col-12 mb-3 p-3 box-shadow-1"
        onClick={() => chooseArticle(props.article)}
      >
        <h5 className="fw-med text-blue-2" style={{ marginBottom: "1px" }}>
          {props.article.diseaseName}
        </h5>
        <p className="pt-1 fw-reg" style={{ marginBottom: "1px" }}>
          {articleFirstInfo.substr(0, 20)}...
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
          {props.article.diseaseName}
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
            {sortedSuitableArticles.map((article) => (
              <SuitableArticle article={article} key={article._id} />
            ))}
          </div>
          <div className="col-8">
            {sortedSuitableArticles.length > 0 ? (
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

export default PatientFormResult;
