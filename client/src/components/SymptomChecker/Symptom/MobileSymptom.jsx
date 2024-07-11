import React from "react";
import "components/SymptomChecker/SymptomChecker.scss";

const MobileSymptom = ({
  symptom,
  onCheck,
  toggleFunction,
  handleSnackBarPosition,
  gender,
}) => {
  const handleScrollTo = () => {
    let scrollPosition = 0;

    // adjust scroll position based on viewport width
    if (window.innerWidth <= 767) {
      scrollPosition = 90;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 991) {
      scrollPosition = 170;
    } else {
      scrollPosition = 220;
    }

    window.scrollTo({ top: scrollPosition, left: 0, behavior: "instant" });
  };

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
            toggleFunction();
            handleScrollTo();
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
    return null;
  }
};

export default MobileSymptom;
