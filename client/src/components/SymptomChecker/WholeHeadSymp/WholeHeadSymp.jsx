import MobileSymptom from "components/SymptomChecker/Symptom/MobileSymptom";
import "components/SymptomChecker/test.css";

const WholeHeadSymp = ({
  dbSymps,
  onCheck,
  position,
  chosenSymps,
  toggleFunction,
}) => {
  return (
    <>
      <div className="mobile-symp-background-extra">
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
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default WholeHeadSymp;
