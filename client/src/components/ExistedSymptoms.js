import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Symptom = (props) => {
  return (
    <div className="col-3 pb-3">
      <div className="form">
        <label style={{ display: "flex" }}>
          <input
            type="checkbox"
            style={{ marginRight: "5px" }}
            checked={props.isChecked}
            onChange={() => {
              props.onCheck(props.symptom._id, props.symptom.name);
            }}
          />
          <span className="text-danger">
            <h5 style={{ marginBottom: "1px" }}>{props.symptom.name}</h5>
          </span>
        </label>
      </div>
    </div>
  );
};

const ExistedSymptoms = ({ articleSymptoms, setArticleSymptoms }) => {
  const [symptoms, setSymptoms] = useState([]);
  useEffect(() => {
    async function getSymptoms() {
      const response = await fetch(
        `https://symptom-checker-with-mern-backend.onrender.com/symptom/`
      );
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const symptoms = await response.json();
      setSymptoms(symptoms);
    }
    getSymptoms();
    return;
  }, [symptoms.length]);

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  useEffect(() => {
    function updateForm() {
      if (articleSymptoms.length > 0) {
        const selectedBeforeSymptoms = articleSymptoms.flatMap(
          (symptom) => symptom._id
        );
        setSelectedSymptoms(selectedBeforeSymptoms);
      } else return;
    }
    updateForm();
    return;
  }, [selectedSymptoms.length]);

  function symptomList() {
    return symptoms.map((symptom) => {
      return (
        <Symptom
          symptom={symptom}
          onCheck={() => onCheck(symptom._id, symptom.name)}
          isChecked={selectedSymptoms.includes(symptom._id)}
          key={symptom._id}
        />
      );
    });
  }

  const onCheck = (symptomId, symptomName) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(
        selectedSymptoms.filter((selectedId) => selectedId !== symptomId)
      );
      const _articleSymptoms = articleSymptoms.filter(
        (symptom) => symptom._id !== symptomId
      );
      setArticleSymptoms(_articleSymptoms);
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
      let _articleSymptoms = articleSymptoms;
      _articleSymptoms.push({
        index: uuidv4(),
        _id: symptomId,
        symptomName: symptomName,
        categories: [],
      });
      setArticleSymptoms(_articleSymptoms);
    }
  };

  return (
    <div>
      <h4 className="card-title text-danger">TRIỆU CHỨNG ĐÃ CÓ</h4>
      <div className="row pt-3 pb-3">{symptomList()}</div>
    </div>
  );
};

export default ExistedSymptoms;
