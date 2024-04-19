import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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

const ArticleSymptoms = ({ article, setArticle }) => {
  const [symptoms, setSymptoms] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom/`)
      .then((res) => {
        const symptoms = res.data;
        setSymptoms(symptoms);
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }, [symptoms.length]);

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  useEffect(() => {
    function updateForm() {
      if (article.diseaseSymptoms.length > 0) {
        console.log(article.diseaseSymptoms.flatMap((symptom) => symptom._id));
        const selectedBeforeSymptoms = article.diseaseSymptoms.flatMap(
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
      const _article = article;
      _article.diseaseSymptoms = _article.diseaseSymptoms.filter(
        (symptom) => symptom._id !== symptomId
      );
      setArticle(_article);
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
      let _article = article;
      _article.diseaseSymptoms.push({
        index: uuidv4(),
        _id: symptomId,
        symptomName: symptomName,
        categories: [],
      });
      setArticle(_article);
    }
  };

  return (
    <div>
      <h4 className="card-title text-body">Triệu chứng đã có:</h4>
      <div className="row pt-3 pb-3">{symptomList()}</div>
    </div>
  );
};

export default ArticleSymptoms;
