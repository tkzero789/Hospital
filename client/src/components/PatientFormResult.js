import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientFormResult = ({ patientForm, setPatientForm }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios
      .get(`https://symptom-checker-with-mern-backend.onrender.com/article/`)
      .then((res) => {
        const articles = res.data;
        setArticles(articles);
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }, [articles.length]);

  function findSortedSuitableArticles(patientForm) {
    let articlesWithScore = [];
    for (const article of articles) {
      let articleSuitableScore = 0;
      for (const symptom of article.diseaseSymptoms) {
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
      articlesWithScore.push({ _id: article._id, score: articleSuitableScore });
    }
    const sortedArticlesWithScore = [...articlesWithScore].sort(
      (a, b) => b.score - a.score
    );
    const sortedSuitableArticlesWithScore = sortedArticlesWithScore.filter(
      (sortedArticle) => sortedArticle.score > 0
    );
    const sortedSuitableArticles = sortedSuitableArticlesWithScore.map(
      (articleWithScore) =>
        articles.find((article) => article._id === articleWithScore._id)
    );

    return sortedSuitableArticles;
  }

  const sortedSuitableArticles = findSortedSuitableArticles(patientForm);

  const SuitableArticle = (props) => {
    return (
      <div className="col-12 mb-3 border border-danger-subtle">
        <h5 className="p-3" style={{ marginBottom: "1px" }}>
          {props.article.diseaseName}
        </h5>
        <p className="p-3 pt-0" style={{ marginBottom: "1px" }}>
          {props.article.diseaseInfos[0].detail.substr(0, 20)}...
        </p>
      </div>
    );
  };
  const FirstSuitableArticle = (props) => {
    return (
      <div className="col-12 mb-3 border border-danger-subtle">
        <h5 className="p-3" style={{ marginBottom: "1px" }}>
          {props.article.diseaseName}
        </h5>
        <p className="p-3 pt-0" style={{ marginBottom: "1px" }}>
          {props.article.diseaseInfos[0].detail.substr(0, 20)}...
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="pb-5 text-center">
        <h4>ĐÂY LÀ KẾT QUẢ GỢI Ý CHẨN ĐOÁN DỰA TRÊN THÔNG TIN BẠN CUNG CẤP</h4>
      </div>
      <div className="row pt-3 pb-3">
        <div className="col-4">
          {sortedSuitableArticles.map((article) => (
            <SuitableArticle article={article} key={article._id} />
          ))}
        </div>
        <div className="col-8">
          {sortedSuitableArticles.length > 0 ? (
            <FirstSuitableArticle
              article={sortedSuitableArticles[0]}
              key={sortedSuitableArticles[0]._id}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PatientFormResult;
