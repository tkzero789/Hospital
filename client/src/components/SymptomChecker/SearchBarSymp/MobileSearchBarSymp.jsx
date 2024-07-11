import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import MobileSymptom from "components/SymptomChecker/Symptom/MobileSymptom";
import "components/SymptomChecker/SymptomChecker.scss";

const MobileSearchBarSymp = ({
  inputRef,
  searchSympRef,
  searchTerm,
  setSearchTerm,
  displaySearch,
  setDisplaySearch,
  filteredSymps,
  onCheck,
  patientForm,
  toggleFunction,
  dbSymps,
  chosenSymps,
  handleSnackBarPosition,
  gender,
}) => {
  // Delay 1s on rendering symptom
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    setDelay(false);
    const timer = setTimeout(() => {
      setDelay(true);
    }, 500);
    return () => clearTimeout(timer); // Clean up on component unmount
  }, [searchTerm]);

  return (
    <>
      <div className="mobile-search-background">
        <div className="mobile-symptoms-list-header">
          <span>Search symptoms</span>
        </div>
        {/* Search */}
        <div className="mobile-search-symp-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter your symptom here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-symp-button">
            <button
              onClick={(e) => {
                e.preventDefault();
                setDisplaySearch(false);
                setSearchTerm("");
                toggleFunction();
              }}
            >
              {searchTerm && <i className="bi bi-x-lg"></i>}
            </button>
          </div>
        </div>
        {/* Search results */}
        {searchTerm && displaySearch && (
          <div ref={searchSympRef} className="search-symp-display">
            {delay
              ? filteredSymps
                  .filter(
                    (symptom) =>
                      !chosenSymps.includes(symptom.id) &&
                      symptom.status === "Approved"
                  ) // Filter out chosen symptoms
                  .map((symptom) => (
                    <MobileSymptom
                      symptom={symptom}
                      onCheck={onCheck}
                      key={symptom.id}
                      toggleFunction={toggleFunction}
                      handleSnackBarPosition={handleSnackBarPosition}
                      gender={gender}
                    />
                  ))
              : Array(10)
                  .fill()
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="text"
                      animation="wave"
                      sx={{ fontSize: "2rem" }}
                      style={{ margin: "0 10px" }}
                    />
                  ))}
          </div>
        )}
        <div className="mobile-search-symp-btn">
          <button
            onClick={(e) => {
              e.preventDefault();
              setDisplaySearch(false);
              toggleFunction();
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSearchBarSymp;
