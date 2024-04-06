import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";

const Symptom = (props) => {
  return (
    <div className="col-4 p-2">
      <div className="border border-primary-subtle p-2 text-center">
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
    const newSelectedAgeRanges = selectedAgeRanges.includes(checkingAgeRange)
      ? selectedAgeRanges.filter((ageRange) => ageRange !== checkingAgeRange)
      : [...selectedAgeRanges, checkingAgeRange];
    setSelectedAgeRanges(newSelectedAgeRanges);
    const _article = {
      ...article,
      diseaseAgeRanges: newSelectedAgeRanges,
    };
    setArticle(_article);
  };

  const [selectedGenders, setSelectedtGenders] = useState([]);

  const checkGenderField = (checkingGender) => {
    if (selectedGenders.includes(checkingGender)) {
      setSelectedtGenders(
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
      setSelectedtGenders([...selectedGenders, checkingGender]);
      let _article = { ...article };
      _article.diseaseGenders.push(checkingGender);
      setArticle(_article);
    }
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

  return (
    <div>
      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">TÊN BÀI VIẾT</h4>
        <input
          type="text"
          className="form-control border-primary-subtle col"
          name="title"
          value={article.title}
          onChange={(e) => updateTitleField(e)}
        />
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">TÊN CĂN BỆNH</h4>
        <input
          type="text"
          className="form-control border-primary-subtle col"
          name="diseaseName"
          value={article.diseaseName}
          onChange={(e) => updateDiseaseNameField(e)}
        />
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">VỀ BỆNH NHÂN</h4>
        <div className="text-blue-1 col p-0 row">
          <Dropdown className=" col-6" autoClose={false}>
            <Dropdown.Toggle className="col-12 border-primary-subtle text-blue-2 bg-white ">
              Độ tuổi
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {ageRanges.map((ageRange) => (
                <Dropdown.Item>
                  <label className="text-blue-1">
                    <input
                      type="checkbox"
                      style={{ marginRight: "5px" }}
                      defaultChecked={selectedAgeRanges.includes(ageRange)}
                      onChange={() => checkAgeRangeField(ageRange)}
                    />
                    {ageRange}
                  </label>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className=" col-6" autoClose={false}>
            <Dropdown.Toggle className="col-12 border-primary-subtle text-blue-2 bg-white">
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

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">TRIỆU CHỨNG</h4>
        <div className="border border-primary-subtle rounded col-9">
          <div className="row">
            {article.diseaseSymptoms.map((symptom) => {
              return <Symptom symptom={symptom} key={symptom._id} />;
            })}
          </div>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">MÔ TẢ CHI TIẾT</h4>
        <div className="border border-primary-subtle rounded col">
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
                  <h4 className="text-blue-2">THÔNG TIN {info.number}</h4>
                </div>
                <textarea
                  name="detail"
                  value={info.detail}
                  className="form-control border-primary-subtle col-9"
                  placeholder="Thông tin"
                  rows="4"
                  onChange={(e) => updateDiseaseInfoField(info.number, e)}
                />
              </div>
            </div>
          );
        })}
        <div onClick={addDiseaseInfoField} className="btn btn-outline-primary">
          <h4 className="text-blue-2">THÊM THÔNG TIN</h4>
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
                  <h4 className="text-blue-2">
                    PHƯƠNG PHÁP {treatment.number}
                  </h4>
                </div>
                <textarea
                  name="detail"
                  value={treatment.detail}
                  className="form-control border-primary-subtle col-9"
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
          className="btn btn-outline-primary"
        >
          <h4 className="text-blue-2">THÊM PHƯƠNG PHÁP CHỮA TRỊ</h4>
        </div>
      </div>
    </div>
  );
};

export default ArticleInfosAndTreatments;
