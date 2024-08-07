import "components/SymptomChecker/SymptomChecker.scss";

export const MobileSympBtn = ({ toggleFunction }) => {
  return (
    <div className="mobile-symp-list-button">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFunction();
        }}
      >
        Cancel
      </button>
    </div>
  );
};
