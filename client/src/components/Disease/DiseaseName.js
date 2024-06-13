import React, { useEffect, useState } from "react";

export default function DiseaseName({ disease, setDisease, dbSymps, mode }) {
  // get chosen symptoms and chosen descriptions
  const [chosenSymps, setChosenSymps] = useState([]);
  const [chosenDescs, setChosenDescs] = useState([]);
  useEffect(() => {
    setChosenSymps(
      dbSymps.filter((symptom) => disease.symptomIds?.includes(symptom.id))
    );
  }, [dbSymps, disease.symptomIds]);

  useEffect(() => {
    const chosenDescs = [];
    for (const chosenSymp of chosenSymps) {
      for (const cat of chosenSymp.categories) {
        for (const des of cat.descriptions) {
          if (disease.descIds.some((desc) => desc.descriptionId === des.id)) {
            chosenDescs.push({
              symptomId: chosenSymp.id,
              descriptionDetail: des.descriptionDetail,
            });
          }
        }
      }
    }
    setChosenDescs(chosenDescs);
  }, [chosenSymps]);

  const updateField = (event) => {
    setDisease({ ...disease, [event.target.name]: event.target.value });
  };

  const Symptom = ({ symptom, key }) => {
    return (
      <div key={key} className="border border-secondary rounded">
        <p className="py-1 px-3">{symptom.name}</p>
      </div>
    );
  };

  const Details = ({ symptom, key }) => {
    const descDetails = chosenDescs
      .filter((desc) => desc.symptomId === symptom.id)
      .map((desc) => desc.descriptionDetail);
    return (
      <div key={key} className="p-2">
        <p>
          - {symptom.name}: {descDetails.join(", ")}
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="form-group row pb-5">
        <h5 className="text-dark-1 fw-md col-3">Disease name</h5>
        <input
          type="text"
          className="form-control border-secondary-subtle bg-secondary-subtle col"
          name="name"
          value={disease.name}
          readOnly={mode === "view"}
          onChange={(e) => updateField(e)}
        />
      </div>

      <div className="form-group row pb-5">
        <h5 className="text-dark-1 fw-md col-3">Ages</h5>
        <div className="border border-secondary-subtle bg-secondary-subtle rounded col-9">
          <p className="m-1">
            {disease.ageRanges?.map((ageRange, index) => (
              <span key={index}>
                {ageRange} {index < disease.ageRanges.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h5 className="text-dark-1 fw-md col-3">Gender</h5>
        <div className="border border-secondary-subtle bg-secondary-subtle rounded col-9">
          <p className="m-1">
            {disease.genders?.map((gender, index) => (
              <span key={index}>
                {gender} {index < disease.genders.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h5 className="text-dark-1 fw-md col-3">Symptom(s)</h5>
        <div className="border border-secondary-subtle bg-secondary-subtle rounded col-9">
          <div className="d-flex p-2">
            {chosenSymps?.map((symptom) => {
              return <Symptom symptom={symptom} key={symptom.name} />;
            })}
          </div>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h5 className="text-dark-1 fw-md col-3">Description</h5>
        <div className="border border-secondary-subtle bg-secondary-subtle rounded col">
          {chosenSymps?.map((symptom) => {
            return <Details symptom={symptom} key={symptom.name} />;
          })}
        </div>
      </div>
    </div>
  );
}
