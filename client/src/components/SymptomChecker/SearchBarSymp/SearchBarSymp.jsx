import { useState, useEffect } from "react";
import Symptom from "components/SymptomChecker/Symptom/Symptom";
import { Skeleton } from "@mui/material";
import "components/SymptomChecker/test.css";

const SearchBarSymp = ({
  inputRef,
  searchSympRef,
  searchTerm,
  setSearchTerm,
  displaySearch,
  setDisplaySearch,
  filteredSymps,
  onCheck,
  chosenSymps,
}) => {
  // Delay 0.5s on rendering symptom
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
      {/* Search */}
      <div className="search-symp-input">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your symptom here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="search-symp-button">
          <button
            onClick={(e) => {
              e.preventDefault();
              setDisplaySearch(false);
              setSearchTerm("");
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
      {/* Search results */}
      {searchTerm && displaySearch && (
        <div className="search-symp-display" ref={searchSympRef}>
          {delay
            ? filteredSymps
                .filter(
                  (symptom) =>
                    !chosenSymps.includes(symptom.id) &&
                    symptom.status === "Approved"
                ) // Filter out chosen symptoms
                .map((symptom) => (
                  <Symptom
                    symptom={symptom}
                    onCheck={onCheck}
                    key={symptom.id}
                  />
                ))
            : Array(7)
                .fill()
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="text"
                    animation="wave"
                    sx={{ fontSize: "1.2rem" }}
                    style={{ margin: "0 10px" }}
                  />
                ))}
        </div>
      )}
    </>
  );
};

export default SearchBarSymp;
