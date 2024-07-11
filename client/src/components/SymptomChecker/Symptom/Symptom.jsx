import React from "react";
import "components/SymptomChecker/SymptomChecker.scss";

const Symptom = ({ symptom, onCheck, handleSnackBarPosition, gender }) => {
  // Render symptoms based on the gender (Male => Male && Both || Female => Female && Both)
  const shouldRender = symptom.gender === gender || symptom.gender === "Both";

  if (shouldRender) {
    return (
      <>
        <button
          key={symptom.id}
          className="symptom-button"
          onClick={(e) => {
            e.preventDefault();
            onCheck(symptom.id);
            console.log(symptom.id);
            handleSnackBarPosition({
              vertical: "bottom",
              horizontal: "center",
            });
          }}
        >
          <span>{symptom.name}</span>
        </button>
      </>
    );
  } else {
    // If the condition does not match, do not render anything
    return null;
  }
};

export default Symptom;
