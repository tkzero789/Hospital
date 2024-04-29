import { useRef } from "react";
import Symptom from "../Symptom/Symptom";

const MobileSearchBarSymp = ({
  searchTerm,
  setSearchTerm,
  displaySearch,
  setDisplaySearch,
  filteredSymps,
  onCheck,
  patientForm,
  toggleIsAddClick,
  dbSymps,
}) => {
  const inputRef = useRef(null);
  const searchSympRef = useRef(null);
  return (
    <>
      <div className="mobile-search-background">
        {/* Search */}
        <div className="mobile-search-symp-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm triệu chứng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-symp-button">
            <button
              onClick={(e) => {
                e.preventDefault();
                setDisplaySearch(false);
                toggleIsAddClick();
              }}
            >
              <i className="bi bi-arrow-right-square-fill"></i>
            </button>
          </div>
        </div>
        {/* Search results */}
        {searchTerm && displaySearch && (
          <div className="search-symp-display" ref={searchSympRef}>
            {filteredSymps.map((symptom) => {
              return (
                <Symptom
                  symptom={symptom}
                  onCheck={() => onCheck(symptom.id)}
                  isChecked={patientForm.chosenSymps.includes(symptom.id)}
                  key={symptom.id}
                />
              );
            })}
          </div>
        )}
        <div className="mobile-search-symp-btn">
          <button
            onClick={(e) => {
              e.preventDefault();
              setDisplaySearch(false);
              toggleIsAddClick();
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }}
          >
            Huỷ
          </button>
          <button
            disabled={
              patientForm.chosenSymps.filter((id) =>
                dbSymps.some((symptom) => symptom.id === id)
              ).length === 0
            }
            onClick={(e) => {
              e.preventDefault();
              setDisplaySearch(false);
              toggleIsAddClick();
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }}
          >
            Xác nhận chọn
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSearchBarSymp;
