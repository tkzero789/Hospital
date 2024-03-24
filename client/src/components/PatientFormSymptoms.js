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

const PatientFormSymptoms = ({ patientForm, setPatientForm }) => {
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
      if (patientForm.patientSymptoms.length > 0) {
        const selectedBeforeSymptoms = patientForm.patientSymptoms.flatMap(
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
      const _patientForm = patientForm;
      _patientForm.patientSymptoms = _patientForm.patientSymptoms.filter(
        (symptom) => symptom._id !== symptomId
      );
      setPatientForm(_patientForm);
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
      let _patientForm = patientForm;
      _patientForm.patientSymptoms.push({
        index: uuidv4(),
        _id: symptomId,
        symptomName: symptomName,
        categories: [],
      });
      setPatientForm(_patientForm);
    }
  };

  return (
    <div>
      <div className="pb-5 text-center">
        <h4>Hãy chọn triệu chứng mà bạn đang gặp phải</h4>
      </div>
      <h4 className="card-title text-danger">Triệu chứng phổ biến</h4>
      <div className="row pt-3 pb-3">{symptomList()}</div>
    </div>
  );
};

export default PatientFormSymptoms;
