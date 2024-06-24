import React from "react";
import "components/SymptomChecker/Symptomchecker.css";

const Symptom = ({ symptom, onCheck, handleSnackBarPosition }) => {
  return (
    <>
      <button
        key={symptom.id}
        className="symptom-button"
        onClick={(e) => {
          e.preventDefault();
          onCheck(symptom.id);
          console.log(symptom.id);
          handleSnackBarPosition({ vertical: "bottom", horizontal: "center" });
        }}
      >
        <span>{symptom.name}</span>
      </button>
    </>
  );
};

export default Symptom;
