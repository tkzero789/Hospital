import React, { useEffect, useState } from "react";

const DiseaseSympDes = ({
  disease,
  dbSymps,
  setDisease,
  chosenSymps,
  chosenCats,
  setChosenCats,
  chosenDes,
  setChosenDes,
}) => {
  const [chosenSympsDB, setChosenSympsDB] = useState([]); // chosen symptoms from DB
  // set target to update disease when clicking on checkbox
  const [target, setTarget] = useState({
    symptomId: "",
    categoryId: "",
    categoryName: "",
    descriptionId: "",
    descriptionDetail: "",
    checkedFlag: false,
  });

  // get chosen symptom objects from DB
  useEffect(() => {
    setChosenSympsDB(
      dbSymps.filter((symptom) => chosenSymps.includes(symptom.id))
    );
  }, [chosenSymps]);

  // update disease categories and descriptions
  useEffect(() => {
    if (!target.checkedFlag) {
      const _disease = disease;
      const symptomIndex = _disease.symptoms.findIndex(
        (symptom) => symptom.id === target.symptomId
      );
      if (symptomIndex !== -1) {
        const categoryIndex = _disease.symptoms[
          symptomIndex
        ].categories.findIndex((category) => category.id === target.categoryId);
        if (categoryIndex !== -1) {
          _disease.symptoms[symptomIndex].categories[
            categoryIndex
          ].descriptions = _disease.symptoms[symptomIndex].categories[
            categoryIndex
          ].descriptions.filter(
            (description) => description.id !== target.descriptionId
          );
          if (
            _disease.symptoms[symptomIndex].categories[categoryIndex]
              .descriptions.length === 0
          ) {
            _disease.symptoms[symptomIndex].categories = _disease.symptoms[
              symptomIndex
            ].categories.filter((cat) => cat.id !== target.categoryId);
            setChosenCats(
              chosenCats.filter((chosenId) => chosenId !== target.categoryId)
            );
          }
        }
        setDisease(_disease);
      }
    } else {
      const _disease = disease;
      const symptomIndex = _disease.symptoms.findIndex(
        (symptom) => symptom.id === target.symptomId
      );
      if (symptomIndex !== -1) {
        const categoryIndex = _disease.symptoms[
          symptomIndex
        ].categories.findIndex((category) => category.id === target.categoryId);
        if (categoryIndex === -1) {
          _disease.symptoms[symptomIndex].categories.push({
            id: target.categoryId,
            categoryName: target.categoryName,
            descriptions: [
              {
                id: target.descriptionId,
                descriptionDetail: target.descriptionDetail,
              },
            ],
          });
          setChosenCats([...chosenCats, target.categoryId]);
          setDisease(_disease);
        } else {
          _disease.symptoms[symptomIndex].categories[
            categoryIndex
          ].descriptions.push({
            id: target.descriptionId,
            descriptionDetail: target.descriptionDetail,
          });
          setDisease(_disease);
        }
      }
    }
  }, [target]);

  // display description chosen
  const updateExistDes = (
    symptomId,
    categoryId,
    categoryName,
    descriptionId,
    descriptionDetail
  ) => {
    if (chosenDes.includes(descriptionId)) {
      setChosenDes(chosenDes.filter((chosenId) => chosenId !== descriptionId));
      setTarget({
        symptomId: symptomId,
        categoryId: categoryId,
        categoryName: categoryName,
        descriptionId: descriptionId,
        descriptionDetail: descriptionDetail,
        checkedFlag: false,
      });
    } else {
      setChosenDes([...chosenDes, descriptionId]);
      setTarget({
        symptomId: symptomId,
        categoryId: categoryId,
        categoryName: categoryName,
        descriptionId: descriptionId,
        descriptionDetail: descriptionDetail,
        checkedFlag: true,
      });
    }
  };

  const Symptom = ({ key, symptom }) => {
    return (
      <div key={key}>
        <div className="form-group row pb-4">
          <h4 className="card-title text-blue-2 text-uppercase">
            MÔ TẢ CHI TIẾT TRIỆU CHỨNG {symptom.name}
          </h4>
        </div>
        {symptom.categories.map((category) => {
          return (
            <div key={category.id}>
              <div className="form row pt-3 pb-3">
                <h4 className="card-title text-blue-2 col-12 text-uppercase">
                  {category.categoryName}
                </h4>
              </div>
              <div className="row">
                {category.descriptions.map((description) => (
                  <div
                    className="form-group pb-3 col-4"
                    style={{ display: "flex" }}
                    key={description.id}
                  >
                    <input
                      type="checkbox"
                      checked={chosenDes.includes(description.id)}
                      style={{ marginRight: "5px" }}
                      onChange={() => {
                        updateExistDes(
                          symptom.id,
                          category.id,
                          category.categoryName,
                          description.id,
                          description.descriptionDetail
                        );
                      }}
                    />
                    <h5 className="text-blue-1" style={{ marginBottom: "0px" }}>
                      {description.descriptionDetail}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <hr className="pb-4" style={{ color: "blue" }} />
      </div>
    );
  };

  return (
    <div className="row pt-3 pb-3">
      {chosenSympsDB.map((symptom) => (
        <Symptom symptom={symptom} key={symptom.id} />
      ))}
    </div>
  );
};

export default DiseaseSympDes;
