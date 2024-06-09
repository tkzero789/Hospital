import React from "react";
import "components/SymptomChecker/test.css";

const MobileSymptom = ({ symptom, onCheck, toggleFunction }) => {
  return (
    <button
      className="symptom-button"
      onClick={(e) => {
        e.preventDefault();
        onCheck(symptom.id);
        toggleFunction();
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }}
    >
      <span>{symptom.name}</span>
    </button>
  );
};

export default MobileSymptom;
