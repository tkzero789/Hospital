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
        {patientResult
          .filter((i) => i.status === "Approved")
          .map((i, index) => (
            <div
              key={index}
              className={`m-disease-list-item`}
              onClick={() => handleDiseaseClick(index)}
            >
              <p>{i.name}</p>
              <p>Specialty: {i.medSpecialty}</p>
              <p>Matched points: {String(i.matchedScore)}</p>
              <img src={RightArrow} alt="icon" />
            </div>
          ))}
        <button
          className="m-disease-close"
          onClick={(e) => {
            e.preventDefault();
            setIsClicked(true);
          }}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default MobileDiseaseList;
