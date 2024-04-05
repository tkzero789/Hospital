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
          <span className="text-blue-1">
            <h5 style={{ marginBottom: "1px" }}>{props.symptom.name}</h5>
          </span>
        </label>
      </div>
    </div>
  );
};

const DiseaseSymptoms = ({ disease, setDisease }) => {
  const [symptoms, setSymptoms] = useState([]);
  useEffect(() => {
    axios
      .get(`https://symptom-checker-with-mern-backend.onrender.com/symptom/`)
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
      if (disease.symptoms.length > 0) {
        const selectedBeforeSymptoms = disease.symptoms.flatMap(
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
      const _disease = disease;
      _disease.symptoms = _disease.symptoms.filter(
        (symptom) => symptom._id !== symptomId
      );
      setDisease(_disease);
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
      let _disease = disease;
      _disease.symptoms.push({
        index: uuidv4(),
        _id: symptomId,
        symptomName: symptomName,
        categories: [],
      });
      setDisease(_disease);
    }
  };

  return (
    <div>
      <h4 className="card-title text-body">Triệu chứng đã có:</h4>
      <div className="row pt-3 pb-3">{symptomList()}</div>
    </div>
  );
};

export default DiseaseSymptoms;
