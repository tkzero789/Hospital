import React from "react";
import "components/SymptomChecker/SymptomChecker.scss";

const SelectedSympBox = ({ patientForm, dbSymps, handleDelete }) => {
  return (
    <div className="selected-symp-box">
      <div className="selected-symp-header">
        <span>Your symptoms:</span>
      </div>
      <div className="selected-symp-box-wrapper">
        {patientForm.chosenSymps.length === 0 ? (
          <div className="symptom-list-no-symptoms">
            <div>
              <i className="bi bi-info-circle-fill"></i>
              <span>Please add one or more symptoms</span>
            </div>
          </div>
        ) : (
          patientForm.chosenSymps.map((symptomId) => {
            const symptom = dbSymps.find((symptom) => symptom.id === symptomId);
            return (
              <div className="selected-symp-item" key={symptomId}>
                <div className="selected-symp-name">{symptom.name}</div>
                <button onClick={(event) => handleDelete(event, symptomId)}>
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SelectedSympBox;
