import React from "react";
import "components/SymptomChecker/symptomchecker.css";

const Symptom = ({ symptom, onCheck }) => {
  return (
    <button
      className="symptom-button"
      onClick={(e) => {
        e.preventDefault();
        onCheck(symptom.id);
      }}
    >
      <span>{symptom.name}</span>
    </button>
  );
};

export default Symptom;
