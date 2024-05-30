import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DiseaseAgeGen = ({ disease, setDisease }) => {
  const ageRanges = [
    "All ages",
    "Under 1 years old",
    "1 - 5 years old",
    "6 - 12 years old",
    "13 - 16 years old",
    "17 - 29 years old",
    "30 - 39 years old",
    "40 - 49 years old",
    "50 - 64 years old",
    "Above 65 years old",
  ];
  const genders = ["All genders", "Male", "Female"];
  const [chosenAges, setChosenAges] = useState([]);
  const [chosenGens, setChosenGens] = useState([]);

  // check form status if user click back button
  useEffect(() => {
    if (disease.ageRanges.length > 0) {
      setChosenAges([...disease.ageRanges]);
    }
    if (disease.genders.length > 0) {
      setChosenGens([...disease.genders]);
    }
  }, []);

  // display age chosen
  const checkAgeRangeField = (checkingAgeRange) => {
    if (chosenAges.includes(checkingAgeRange)) {
      setChosenAges(
        chosenAges.filter((ageRange) => ageRange !== checkingAgeRange)
      );
    } else {
      setChosenAges([...chosenAges, checkingAgeRange]);
    }
  };

  // update disease ageRanges
  useEffect(() => {
    setDisease({ ...disease, ageRanges: chosenAges });
  }, [chosenAges]);

  // display gender chosen
  const checkGenderField = (checkingGender) => {
    if (chosenGens.includes(checkingGender)) {
      setChosenGens(chosenGens.filter((gender) => gender !== checkingGender));
    } else {
      setChosenGens([...chosenGens, checkingGender]);
    }
  };

  // update disease genders
  useEffect(() => {
    setDisease({ ...disease, genders: chosenGens });
  }, [chosenGens]);

  return (
    <div>
      <div className="pb-5 text-center">
        <h4 className="text-blue-1 fw-med">Select age and gender</h4>
      </div>
      <div className="px-5">
        <div className="form-group row pb-5">
          <h5 className="col-2 fw-med">Age</h5>
          <div className="col-3">
            <Dropdown className="col-12" autoClose="outside">
              <Dropdown.Toggle className="form-select blue-border-1 col-12 fw-reg btn-light">
                Select age
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                {ageRanges.map((ageRange) => (
                  <div
                    className="px-3 py-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <label className="text-blue-1">
                      <input
                        type="checkbox"
                        checked={chosenAges.includes(ageRange)}
                        onChange={() => checkAgeRangeField(ageRange)}
                        disabled={
                          chosenAges.includes("All ages") &&
                          ageRange !== "All ages"
                        }
                      />
                      <span className="ps-2">{ageRange}</span>
                    </label>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="form-group row pb-5">
          <h5 className="col-2 fw-med">Gender</h5>
          <div className="col-3">
            <Dropdown className=" col-12" autoClose="outside">
              <Dropdown.Toggle className="form-select blue-border-1 col-12 fw-reg btn-light">
                Select gender
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                {genders.map((gender) => (
                  <div
                    className="px-3 py-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <label className="text-blue-1">
                      <input
                        type="checkbox"
                        checked={chosenGens.includes(gender)}
                        onChange={() => checkGenderField(gender)}
                        disabled={
                          chosenGens.includes("All genders") &&
                          gender !== "All genders"
                        }
                      />
                      <span className="ps-2">{gender}</span>
                    </label>
                  </div>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseAgeGen;
