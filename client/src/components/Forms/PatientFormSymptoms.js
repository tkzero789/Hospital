import React from "react";

const Symptom = (props) => {
  return (
    <div className="col-3 pb-3">
      <div className="form">
        <label className="d-flex">
          <input
            type="checkbox"
            style={{ marginRight: "5px" }}
            checked={props.isChecked}
            onChange={() => {
              props.onCheck(props.symptom._id, props.symptom.name);
            }}
          />
          <span className="text-black-1 fw-reg fs-18">
            <div style={{ marginBottom: "1px" }}>{props.symptom.name}</div>
          </span>
        </label>
      </div>
    </div>
  );
};

const PatientFormSymptoms = ({ dbSymps, patientForm, setPatientForm }) => {
  const onCheck = (symptomId) => {
    if (patientForm.chosenSymps.includes(symptomId)) {
      const _patientForm = patientForm;
      _patientForm.chosenSymps = _patientForm.chosenSymps.filter(
        (chosenId) => chosenId !== symptomId
      );
      _patientForm.chosenCats = _patientForm.chosenCats.filter(
        (chosenCat) => chosenCat.sympId !== symptomId
      );
      _patientForm.chosenDes = _patientForm.chosenDes.filter(
        (chosenDes) => chosenDes.sympId !== symptomId
      );
      setPatientForm(_patientForm);
    } else {
      setPatientForm({
        ...patientForm,
        chosenSymps: [...patientForm.chosenSymps, symptomId],
      });
    }
  };

  return (
    <div>
      <div className="pb-5 text-center">
        <h4 className="text-blue-1 fw-med">
          Hãy chọn triệu chứng mà bạn đang gặp phải
        </h4>
      </div>
      <h5 className="card-title text-blue-1 fw-med text-blue-2">
        Triệu chứng phổ biến
      </h5>
      <div className="row pt-3 pb-3">
        {dbSymps.map((symptom) => {
          return (
            <Symptom
              symptom={symptom}
              onCheck={() => onCheck(symptom.id)}
              isChecked={patientForm.chosenSymps.includes(symptom.id)}
              key={symptom.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PatientFormSymptoms;
