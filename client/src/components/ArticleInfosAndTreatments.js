import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";

const Symptom = (props) => {
  return (
    <div className="col-4 p-2">
      <div className="border border-danger-subtle p-2 text-center">
        <p className="m-0">{props.symptom.symptomName}</p>
      </div>
    </div>
  );
};

const Details = (props) => {
  const categoryList = props.symptom.categories;
  const descriptionList = categoryList.map((category) => category.descriptions);
  const descriptionDetailArray = descriptionList.flatMap((sublist) =>
    sublist.map((item) => item.descriptionDetail)
  );
  return (
    <div className="p-2">
      <p className="m-0">
        - {props.symptom.symptomName}: {descriptionDetailArray.join(", ")}
      </p>
    </div>
  );
};

const ArticleInfosAndTreatments = ({ article, setArticle }) => {
  const [finalInfoNumber, setFinalInfoNumber] = useState(
    article.diseaseInfos.length + 1
  );

  const addDiseaseInfoField = () => {
    let _article = { ...article };
    _article.diseaseInfos.push({
      index: uuidv4(),
      number: finalInfoNumber,
      detail: "",
    });
    setFinalInfoNumber(finalInfoNumber + 1);
    setArticle(_article);
  };

  const updateDiseaseInfoField = (infoNo, event) => {
    let _article = { ...article };
    _article.diseaseInfos[infoNo - 1][event.target.name] = event.target.value;
    setArticle(_article);
  };

  const deleteDiseaseInfoField = (infoNo) => {
    let _article = { ...article };
    _article.diseaseInfos = _article.diseaseInfos.filter(
      (info) => info.number !== infoNo
    );
    _article.diseaseInfos = _article.diseaseInfos.map((info) => ({
      ...info,
      number: info.number > infoNo ? info.number - 1 : info.number,
    }));
    setFinalInfoNumber(finalInfoNumber - 1);
    setArticle(_article);
  };

  const [finalTreatmentNumber, setFinalTreatmentNumber] = useState(
    article.diseaseTreatments.length + 1
  );

  const addDiseaseTreatmentField = () => {
    let _article = { ...article };
    _article.diseaseTreatments.push({
      index: uuidv4(),
      number: finalTreatmentNumber,
      detail: "",
    });
    setFinalTreatmentNumber(finalTreatmentNumber + 1);
    setArticle(_article);
  };

  const updateDiseaseTreatmentField = (treatmentNo, event) => {
    let _article = { ...article };
    _article.diseaseTreatments[treatmentNo - 1][event.target.name] =
      event.target.value;
    setArticle(_article);
  };

  const deleteDiseaseTreatmentField = (treatmentNo) => {
    let _article = { ...article };
    _article.diseaseTreatments = _article.diseaseTreatments.filter(
      (treatment) => treatment.number !== treatmentNo
    );
    _article.diseaseTreatments = _article.diseaseTreatments.map(
      (treatment) => ({
        ...treatment,
        number:
          treatment.number > treatmentNo
            ? treatment.number - 1
            : treatment.number,
      })
    );
    setFinalTreatmentNumber(finalTreatmentNumber - 1);
    setArticle(_article);
  };

  const updateTitleField = (event) => {
    let _article = { ...article };
    _article[event.target.name] = event.target.value;
    setArticle(_article);
  };

  const updateDiseaseNameField = (event) => {
    let _article = { ...article };
    _article[event.target.name] = event.target.value;
    setArticle(_article);
  };

  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);

  const checkAgeRangeField = (checkingAgeRange) => {
    if (selectedAgeRanges.includes(checkingAgeRange)) {
      setSelectedAgeRanges(
        selectedAgeRanges.filter(
          (selectedAgeRange) => selectedAgeRange !== checkingAgeRange
        )
      );
      let _article = { ...article };
      _article.diseaseAgeRanges = _article.diseaseAgeRanges.filter(
        (ageRange) => ageRange !== checkingAgeRange
      );
      setArticle(_article);
    } else {
      setSelectedAgeRanges([...selectedAgeRanges, checkingAgeRange]);
      let _article = { ...article };
      _article.diseaseAgeRanges.push(checkingAgeRange);
      setArticle(_article);
    }
  };

  const [selectedGenders, seSelectedtGenders] = useState([]);

  const checkGenderField = (checkingGender) => {
    if (selectedGenders.includes(checkingGender)) {
      seSelectedtGenders(
        selectedGenders.filter(
          (selectedGender) => selectedGender !== checkingGender
        )
      );
      let _article = { ...article };
      _article.diseaseGenders = _article.diseaseGenders.filter(
        (gender) => gender !== checkingGender
      );
      setArticle(_article);
    } else {
      seSelectedtGenders([...selectedGenders, checkingGender]);
      let _article = { ...article };
      _article.diseaseGenders.push(checkingGender);
      setArticle(_article);
    }
  };

  const ageRanges = [
    "Mọi độ tuổi",
    "Dưới 1 tháng",
    "1 tuổi - 6 tuổi",
    "6 tuổi - 12 tuổi",
    "12 tuổi - 18 tuổi",
    "18 tuổi - 30 tuổi",
    "30 tuổi - 60 tuổi",
  ];

  const genders = ["Nam", "Nữ"];

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <div className="form-group row pb-5">
        <h4 className="text-danger col-3">TÊN BÀI VIẾT</h4>
        <input
          type="text"
          className="form-control border-danger-subtle col"
          name="title"
          value={article.title}
          onChange={(e) => updateTitleField(e)}
        />
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-danger col-3">TÊN CĂN BỆNH</h4>
        <input
          type="text"
          className="form-control border-danger-subtle col"
          name="diseaseName"
          value={article.diseaseName}
          onChange={(e) => updateDiseaseNameField(e)}
        />
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-danger col-3">VỀ BỆNH NHÂN</h4>
        <div className="text-danger col p-0 row">
          <Dropdown className=" col-6" autoClose={false}>
            <Dropdown.Toggle className="col-12 border-danger-subtle text-danger bg-white ">
              Độ tuổi
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {ageRanges.map((ageRange) => (
                <Dropdown.Item>
                  <label className="text-danger">
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
          <Dropdown className=" col-6" autoClose={false}>
            <Dropdown.Toggle className="col-12 border-danger-subtle text-danger bg-white">
              Giới tính
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {genders.map((gender) => (
                <Dropdown.Item>
                  <label className="text-danger">
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

      <div className="form-group row pb-5">
        <h4 className="text-danger col-3">TRIỆU CHỨNG</h4>
        <div className="border border-danger-subtle rounded col-9">
          <div className="row">
            {article.diseaseSymptoms.map((symptom) => {
              return <Symptom symptom={symptom} key={symptom._id} />;
            })}
          </div>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-danger col-3">MÔ TẢ CHI TIẾT</h4>
        <div className="border border-danger-subtle rounded col">
          {article.diseaseSymptoms.map((symptom) => {
            return <Details symptom={symptom} key={symptom._id} />;
          })}
        </div>
      </div>

      <div className="row pb-5">
        {article.diseaseInfos.map((info) => {
          return (
            <div key={info.index}>
              <div className="form row pb-3">
                <div className="col-12" style={{ display: "flex" }}>
                  <i
                    class="bi bi-file-minus"
                    style={{ color: "red", marginRight: "5px" }}
                    onClick={(e) => deleteDiseaseInfoField(info.number)}
                  ></i>
                  <h4 className="text-danger">THÔNG TIN {info.number}</h4>
                </div>
                <textarea
                  name="detail"
                  value={info.detail}
                  className="form-control border-danger-subtle col-9"
                  placeholder="Thông tin"
                  rows="4"
                  onChange={(e) => updateDiseaseInfoField(info.number, e)}
                />
              </div>
            </div>
          );
        })}
        <div onClick={addDiseaseInfoField} className="btn btn-outline-danger">
          <h4 className="text-danger">THÊM THÔNG TIN</h4>
        </div>
      </div>

      <div className="row pb-5">
        {article.diseaseTreatments.map((treatment) => {
          return (
            <div key={treatment.index}>
              <div className="form row pb-3">
                <div className="col-12" style={{ display: "flex" }}>
                  <i
                    class="bi bi-file-minus"
                    style={{ color: "red", marginRight: "5px" }}
                    onClick={(e) =>
                      deleteDiseaseTreatmentField(treatment.number)
                    }
                  ></i>
                  <h4 className="text-danger">
                    PHƯƠNG PHÁP {treatment.number}
                  </h4>
                </div>
                <textarea
                  name="detail"
                  value={treatment.detail}
                  className="form-control border-danger-subtle col-9"
                  placeholder="Thông tin"
                  rows="4"
                  onChange={(e) =>
                    updateDiseaseTreatmentField(treatment.number, e)
                  }
                />
              </div>
            </div>
          );
        })}
        <div
          onClick={addDiseaseTreatmentField}
          className="btn btn-outline-danger"
        >
          <h4 className="text-danger">THÊM PHƯƠNG PHÁP CHỮA TRỊ</h4>
        </div>
      </div>
    </div>
  );
};

export default ArticleInfosAndTreatments;
