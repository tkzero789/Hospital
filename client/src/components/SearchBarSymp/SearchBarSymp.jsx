import { useRef } from "react";
import Symptom from "../Symptom/Symptom";

const SearchBarSymp = ({
  searchTerm,
  setSearchTerm,
  displaySearch,
  setDisplaySearch,
  filteredSymps,
  onCheck,
  patientForm,
}) => {
  const inputRef = useRef(null);
  const searchSympRef = useRef(null);

  return (
    <>
      {/* Search */}
      <div className="search-symp-input">
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
              window.scrollTo({ top: 500, left: 0 });
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
    </>
  );
};

export default SearchBarSymp;
