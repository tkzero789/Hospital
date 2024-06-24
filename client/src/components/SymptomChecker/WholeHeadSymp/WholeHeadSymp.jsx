import MobileSymptom from "components/SymptomChecker/Symptom/MobileSymptom";
import "components/SymptomChecker/SymptomChecker.css";

const WholeHeadSymp = ({
  dbSymps,
  onCheck,
  position,
  chosenSymps,
  toggleFunction,
  handleSnackBarPosition,
}) => {
  return (
    <>
      <div className="mobile-symp-background-extra">
        <div className="mobile-symptoms-list-header">
          <span>{position}</span>
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
