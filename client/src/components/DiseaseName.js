import React from "react";

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

const DiseaseName = ({ disease, setDisease }) => {
  const updateField = (event) => {
    let _disease = { ...disease };
    _disease[event.target.name] = event.target.value;
    setDisease(_disease);
  };

  console.log(disease);

  return (
    <div>
      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">TÊN CĂN BỆNH</h4>
        <input
          type="text"
          className="form-control border-primary-subtle col"
          name="name"
          value={disease.name}
          onChange={(e) => updateField(e)}
        />
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">ĐỘ TUỔI</h4>
        <div className="border border-primary-subtle rounded col-9">
          <p className="m-1">
            {disease.ageRanges.map((ageRange, index) => (
              <span key={index}>
                {ageRange} {index < disease.ageRanges.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">GIỚI TÍNH</h4>
        <div className="border border-primary-subtle rounded col-9">
          <p className="m-1">
            {disease.genders.map((gender, index) => (
              <span key={index}>
                {gender} {index < disease.genders.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">TRIỆU CHỨNG</h4>
        <div className="border border-primary-subtle rounded col-9">
          <div className="row">
            {disease.symptoms.map((symptom) => {
              return <Symptom symptom={symptom} key={symptom._id} />;
            })}
          </div>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h4 className="text-blue-2 col-3">MÔ TẢ CHI TIẾT</h4>
        <div className="border border-primary-subtle rounded col">
          {disease.symptoms.map((symptom) => {
            return <Details symptom={symptom} key={symptom._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DiseaseName;
