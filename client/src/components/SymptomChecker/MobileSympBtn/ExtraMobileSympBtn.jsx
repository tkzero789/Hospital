import "components/SymptomChecker/Symptomchecker.css";

export const ExtraMobileSympBtn = ({ toggleExtraM }) => {
  return (
    <div className="mobile-symp-list-button">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleExtraM();
        }}
      >
        Back
      </button>
    </div>
  );
};
