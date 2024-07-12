import ResultBar from "components/UI/ProgressBar";

const MobileDiseaseList = ({
  patientResult,
  handleDiseaseClick,
  RightArrow,
  isClicked,
  setIsClicked,
}) => {
  return (
    <>
      <div className={`m-disease-list ${isClicked ? "hide" : ""}`}>
        <h6>Conditions that match your symptoms</h6>
        <div className="m-disease-list-wrapper">
          {patientResult
            .filter((i) => i.status === "Approved")
            .map((i, index) => {
              const matchedScore = parseInt(i.matchedScore, 10);
              let strengthLevel;

              if (matchedScore <= 5) {
                strengthLevel = "Weak";
              } else if (matchedScore > 5 && matchedScore <= 14) {
                strengthLevel = "Fair";
              } else if (matchedScore > 14 && matchedScore <= 28) {
                strengthLevel = "High";
              } else {
                strengthLevel = "Significant";
              }

              return (
                <div
                  key={index}
                  className="m-disease-list-item"
                  onClick={() => handleDiseaseClick(index)}
                >
                  <p>{i.name}</p>
                  <p>Specialty: {i.medSpecialty}</p>
                  <p>
                    Result strength:{" "}
                    <span className="fw-med">{strengthLevel}</span>
                  </p>
                  <div className="pt-1">
                    <ResultBar score={String(i.matchedScore)} />
                  </div>
                  <img src={RightArrow} alt="icon" />
                </div>
              );
            })}
        </div>
        <div className="m-disease-close">
          {" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsClicked(true);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileDiseaseList;
