import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, NavLink } from "react-router-dom";

const Symptom = (props) => {
  return (
    <div className="col-3 pb-3">
      <div className="form">
        <label style={{ display: "flex" }}>
          <input
            type="checkbox"
            style={{ marginRight: "5px" }}
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

const ExistedSymptoms = ({ form, setForm }) => {
  const [symptoms, setSymptoms] = useState([]);
  useEffect(() => {
    async function getSymptoms() {
      const response = await fetch(`http://localhost:5000/symptom/`);
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
      const _form = form.filter((symptom) => symptom._id !== symptomId);
      setForm(_form);
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
      let _form = form;
      _form.push({
        index: uuidv4(),
        _id: symptomId,
        symptomName: symptomName,
        categories: [],
      });
      setForm(_form);
    }
  };

  return (
    <div>
      <h4 className="card-title text-body">Triệu chứng đã có:</h4>
      <div className="row pt-3 pb-3">{symptomList()}</div>
    </div>
  );
};

export default ExistedSymptoms;
