import "../../css/sympchecker.css";

export const MobileSympBtn = ({ toggleFunction }) => {
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
    </div>
  );
};
