import "../../css/sympchecker.css";

export const MobileSympBtn = ({
  toggleFunction,
  position,
  patientForm,
  dbSymps,
}) => {
  return (
    <div className="mobile-symp-list-button">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFunction();
        }}
      >
        Huỷ
      </button>
      <button
        disabled={
          patientForm.chosenSymps.filter((id) =>
            dbSymps.some(
              (symptom) =>
                position.includes(symptom.position) && symptom.id === id
            )
          ).length === 0
        }
        onClick={(e) => {
          e.preventDefault();
          toggleFunction();
          window.scrollTo({ top: 800, left: 0 });
        }}
      >
        Xác nhận chọn
      </button>
    </div>
  );
};
