import React from "react";

const MobileSelectedSympBox = ({ patientForm, dbSymps, handleDelete }) => {
  return (
    <div className="mobile-selected-symp-box">
      <div className="selected-symp-header">
        <span>Your symptoms:</span>
      </div>
      <div className="selected-symp-box-wrapper">
        {[...patientForm.chosenSymps].reverse().map((symptomId) => {
          const symptom = dbSymps.find((symptom) => symptom.id === symptomId);
          return (
            <div className="selected-symp-item" key={symptomId}>
              <div className="selected-symp-name">{symptom.name}</div>
              <button onClick={(event) => handleDelete(event, symptomId)}>
                <i className="bi bi-x-circle-fill"></i>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileSelectedSympBox;
