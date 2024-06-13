import React, { useState } from "react";
import "components/SymptomChecker/symptomchecker.css";

export default function PatientFormDes({
  chosenSymp,
  patientForm,
  setPatientForm,
}) {
  const [checkedItem, setCheckedItem] = useState({});

  const onCheck = (symptomId, descriptionId) => {
    if (
      patientForm.chosenDescs.some(
        (chosenDesc) => chosenDesc.descriptionId === descriptionId
      )
    ) {
      setPatientForm({
        ...patientForm,
        chosenDescs: patientForm.chosenDescs.filter(
          (chosenDesc) => chosenDesc.descriptionId !== descriptionId
        ),
      });
      setCheckedItem({ ...checkedItem, [descriptionId]: false });
    } else {
      setPatientForm({
        ...patientForm,
        chosenDescs: [...patientForm.chosenDescs, { symptomId, descriptionId }],
      });
      setCheckedItem({ ...checkedItem, [descriptionId]: true });
    }
  };

  return (
    <div>
      <div className="form-group row pb-4">
        <h4 className="text-dark-sub-header fw-med text-center text-underline m-symp-name">
          Select your symptoms relating to {chosenSymp.name}
        </h4>
      </div>
      {chosenSymp.categories.map((category) => {
        return (
          <div key={category.id}>
            <div className="form row pt-3 pb-3">
              <h5 className="card-title text-blue-3 col-12 fw-med">
                {category.categoryName}
              </h5>
            </div>
            <div className="row">
              {category.descriptions.map((description) => (
                <div
                  key={description.id}
                  className={`symp-checkbox form-group md-12 ${
                    checkedItem[description.id] ? "checked" : ""
                  }`}
                >
                  <label className="d-flex">
                    <input
                      type="checkbox"
                      checked={patientForm.chosenDescs.some(
                        (chosenDesc) =>
                          chosenDesc.descriptionId === description.id
                      )}
                      className="me-2"
                      onChange={() => onCheck(chosenSymp.id, description.id)}
                    />
                    <h5 className="fw-reg fs-18">
                      {description.descriptionDetail}
                    </h5>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <hr className="pb-4" style={{ color: "#002c77" }} />
    </div>
  );
}
