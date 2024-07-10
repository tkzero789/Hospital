import MobileSymptom from "components/SymptomChecker/Symptom/MobileSymptom";
import "components/SymptomChecker/SymptomChecker.scss";

const WholeHeadSymp = ({
  dbSymps,
  onCheck,
  position,
  chosenSymps,
  toggleFunction,
  toggleExtraM,
  handleSnackBarPosition,
}) => {
  return (
    <>
      <div className="mobile-symp-background-extra">
        <div className="mobile-symptoms-list-header">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleExtraM();
            }}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          {position}
        </div>
        <div className="mobile-symptoms-list-extra">
          {dbSymps
            .filter(
              (symptom) =>
                symptom.position === position &&
                symptom.status === "Approved" &&
                !chosenSymps.includes(symptom.id)
            )
            .map((symptom) => (
              <MobileSymptom
                symptom={symptom}
                onCheck={onCheck}
                key={symptom.id}
                toggleFunction={toggleFunction}
                handleSnackBarPosition={handleSnackBarPosition}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default WholeHeadSymp;
