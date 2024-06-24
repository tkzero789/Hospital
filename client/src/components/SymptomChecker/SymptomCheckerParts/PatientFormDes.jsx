import React from "react";
import "components/SymptomChecker/SymptomChecker.css";

export default function PatientFormDes({
  chosenSymp,
  patientForm,
  setPatientForm,
  checkedItem,
  setCheckedItem,
}) {
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

  console.log(chosenSymp);

  return (
    <div>
      <div className="form-group row pb-4">
        <h4 className="text-dark-sub-header fw-med text-center text-underline m-symp-name pt-2 pt-md-0">
          <span className="fw-med">{chosenSymp.name}</span>
        </h4>
      </div>
      {chosenSymp.categories.map((category) => {
        return (
          <div key={category.id}>
            <div className="form row pt-4 pt-md-3 pb-3 pb-md-3">
              <h5 className="text-blue-3 col-12">{category.categoryName}:</h5>
            </div>
            <div className="row ps-0 ps-md-2">
              {category.descriptions.map((description) => (
                <div
                  key={description.id}
                  className={`symp-checkbox form-group md-12 ${
                    checkedItem[description.id] ? "checked" : ""
                  }`}
                >
                  <label className="symp-checkbox-label">
                    <input
                      type="checkbox"
                      checked={patientForm.chosenDescs.some(
                        (chosenDesc) =>
                          chosenDesc.descriptionId === description.id
                      )}
                      className="me-2"
                      onChange={() => onCheck(chosenSymp.id, description.id)}
                    />
                    <h5 className="fw-reg fs-16">
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
