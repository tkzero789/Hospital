import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DiseaseAgeGen = ({ disease, setDisease }) => {
  const updateField = (event) => {
    let _disease = { ...disease };
    _disease[event.target.name] = event.target.value;
    return setDisease(_disease);
  };

  const ageRanges = [
    "Mọi độ tuổi",
    "Dưới 1 tháng",
    "1 tháng - 1 tuổi",
    "1 tuổi - 5 tuổi",
    "6 tuổi - 12 tuổi",
    "13 tuổi - 16 tuổi",
    "17 tuổi - 29 tuổi",
    "30 tuổi - 39 tuổi",
    "40 tuổi - 49 tuổi",
    "50 tuổi - 64 tuổi",
    "Trên 65 tuổi",
  ];

  const genders = ["Cả nam và nữ", "Nam", "Nữ"];

  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);

  const checkAgeRangeField = (checkingAgeRange) => {
    const newSelectedAgeRanges = selectedAgeRanges.includes(checkingAgeRange)
      ? selectedAgeRanges.filter((ageRange) => ageRange !== checkingAgeRange)
      : [...selectedAgeRanges, checkingAgeRange];
    setSelectedAgeRanges(newSelectedAgeRanges);
    const _disease = {
      ...disease,
      ageRanges: newSelectedAgeRanges,
    };
    setDisease(_disease);
  };

  const [selectedGenders, setSelectedtGenders] = useState([]);

  const checkGenderField = (checkingGender) => {
    const newSelectedGenders = selectedGenders.includes(checkingGender)
      ? selectedGenders.filter((gender) => gender !== checkingGender)
      : [...selectedGenders, checkingGender];
    setSelectedtGenders(newSelectedGenders);
    const _disease = {
      ...disease,
      genders: newSelectedGenders,
    };
    setDisease(_disease);
  };

  return (
    <div>
      <div className="pb-5 text-center">
        <h4 className="text-blue-1 fw-med">
          CHỌN ĐỘ TUỔI VÀ GIỚI TÍNH CÓ THỂ MẮC PHẢI
        </h4>
      </div>
      <div className="px-5">
        <div className="form-group row pb-5">
          <h5 className="col-2 fw-med text-blue-2">Độ tuổi</h5>
          <div className="col-3">
            <Dropdown className=" col-12" autoClose={false}>
              <Dropdown.Toggle className="form-select blue-border-1 col-12 fw-reg">
                Độ tuổi
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {ageRanges.map((ageRange) => (
                  <Dropdown.Item>
                    <label className="text-blue-1">
                      <input
                        type="checkbox"
                        style={{ marginRight: "5px" }}
                        checked={selectedAgeRanges.includes(ageRange)}
                        onChange={() => checkAgeRangeField(ageRange)}
                      />
                      {ageRange}
                    </label>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="form-group row pb-5">
          <h5 className="col-2 fw-med text-blue-2">Giới tính</h5>
          <div className="col-3">
            <Dropdown className=" col-12" autoClose={false}>
              <Dropdown.Toggle className="form-select blue-border-1 col-12 fw-reg">
                Giới tính
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {genders.map((gender) => (
                  <Dropdown.Item>
                    <label className="text-blue-1">
                      <input
                        type="checkbox"
                        style={{ marginRight: "5px" }}
                        checked={selectedGenders.includes(gender)}
                        onChange={() => checkGenderField(gender)}
                      />
                      {gender}
                    </label>
                  </Dropdown.Item>
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
