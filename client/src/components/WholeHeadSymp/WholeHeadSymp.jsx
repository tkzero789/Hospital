import MobileSymptom from "../Symptom/MobileSymptom";

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
