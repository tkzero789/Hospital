import React, { useEffect, useState } from "react";

const DiseaseAgeGen = ({ disease, setDisease }) => {
  const ageRanges = [
    "0 - 1 years old",
    "2 - 11 years old",
    "12 - 17 years old",
    "18 - 64 years old",
    "Above 65 years old",
  ];
  const genders = ["Male", "Female"];
  const [chosenAges, setChosenAges] = useState(disease.ageRanges || []);
  const [chosenGens, setChosenGens] = useState(disease.genders || []);

  // Fetch age from database
  useEffect(() => {
    setChosenAges(disease.ageRanges || []);
  }, [disease.ageRanges]);

  // Fetch gender from database
  useEffect(() => {
    setChosenGens(disease.genders || []);
  }, [disease.genders]);

  // Update disease object whenever chosenAges or chosenGens changes
  useEffect(() => {
    setDisease((prevDisease) => ({
      ...prevDisease,
      ageRanges: chosenAges,
      genders: chosenGens,
    }));
  }, [chosenAges, chosenGens, setDisease]);

  // Select age
  const checkAgeRangeField = (checkingAgeRange) => {
    setChosenAges((currentAges) => {
      const updatedAges = currentAges.includes(checkingAgeRange)
        ? currentAges.filter((ageRange) => ageRange !== checkingAgeRange)
        : [...currentAges, checkingAgeRange];
      // Reorder based on ageRanges array
      return ageRanges.filter((ageRange) => updatedAges.includes(ageRange));
    });
  };

  // Select gender
  const checkGenderField = (selectedGender) => {
    setChosenGens((currentGens) => {
      const updatedGens = currentGens.includes(selectedGender)
        ? currentGens.filter((gender) => gender !== selectedGender)
        : [...currentGens, selectedGender];
      // Reorder based on genders array
      return genders.filter((gender) => updatedGens.includes(gender));
    });
  };

  console.log("DISEASE", disease);

  return (
    <div>
      <div className="pb-5 text-center">
        <h4 className="text-blue-3 fw-med">Select age and gender</h4>
      </div>
      <div className="px-5 d-flex">
        {/* Age */}
        <div className="form-group row c-6 pb-5">
          <h5 className="c-3 text-dark-1 fw-reg">Age</h5>
          <div className="c-8">
            <div className="border border-secondary rounded c-12 fw-reg btn-light bg-white">
              <div className="py-1 px-3 border-bottom   ">Select age</div>
              <div className="w-100">
                {ageRanges.map((ageRange, index) => (
                  <div key={index} className="px-3 py-1">
                    <label className="text-blue-1">
                      <input
                        type="checkbox"
                        checked={chosenAges.includes(ageRange)}
                        onChange={() => checkAgeRangeField(ageRange)}
                      />
                      <span className="ps-2">{ageRange}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Gender */}
        <div className="form-group row c-6 pb-5">
          <h5 className="c-3 text-dark-1 fw-reg">Gender</h5>
          <div className="c-8">
            <div className="border border-secondary rounded c-12 fw-reg btn-light bg-white">
              <div className="py-1 px-3 border-bottom">Select gender</div>
              <div className="w-100">
                {genders.map((gender, index) => (
                  <div key={index} className="px-3 py-1">
                    <label className="text-blue-1">
                      <input
                        type="checkbox"
                        name="gender"
                        checked={chosenGens.includes(gender)}
                        onChange={() => checkGenderField(gender)}
                      />
                      <span className="ps-2">{gender}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseAgeGen;
