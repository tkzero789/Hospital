import React, { useEffect, useState } from "react";

export default function DiseaseName({
  disease,
  setDisease,
  dbSymps,
  checkedSymptoms,
  mode,
}) {
  // get chosen symptoms and chosen descriptions
  const [chosenSymptom, setChosenSymps] = useState([]);
  const [chosenDescs, setChosenDescs] = useState([]);

  // Fetch chosen symptoms
  useEffect(() => {
    console.log("disease.symptomIds", disease.symptomIds);
    if (checkedSymptoms) {
      const orderedChosenSymps = checkedSymptoms
        .map((symptomId) => dbSymps.find((symptom) => symptom.id === symptomId))
        .filter((symptom) => symptom !== undefined);

      setChosenSymps(orderedChosenSymps);
    } else {
      let filteredSymps = dbSymps.filter((symptom) =>
        disease.symptomIds?.includes(symptom.id)
      );
      // Sort the filtered symptoms based on the index of their ID in disease.symptomIds
      filteredSymps.sort(
        (a, b) =>
          disease.symptomIds.indexOf(a.id) - disease.symptomIds.indexOf(b.id)
      );
      setChosenSymps(filteredSymps);
    }
  }, [dbSymps, disease.symptomIds, checkedSymptoms]);

  // chosen description(s) from each symptom
  useEffect(() => {
    const chosenDescs = [];
    for (const chosenSymp of chosenSymptom) {
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
  }, [chosenSymptom, disease.descIds]);

  // Update input
  const updateField = (event) => {
    setDisease({ ...disease, [event.target.name]: event.target.value });
  };

  // Symptom
  const Symptom = ({ symptom, symptomKey }) => {
    return (
      <div
        key={symptomKey}
        className="border-0 rounded mx-2 bg-blue-6 text-white"
      >
        <p className="py-1 px-3">{symptom.name}</p>
      </div>
    );
  };

  // Details for each property
  const Details = ({ symptom }) => {
    const details = chosenDescs;
    return (
      <div className="box-shadow-6 rounded my-3 px-3">
        <h5 className="pt-3 pb-1 text-blue-3">{symptom.name}</h5>
        <div className="d-flex flex-wrap">
          {symptom.categories.map((category, index) => (
            <React.Fragment key={index}>
              <div className="w-25 pb-3">
                <p className="fw-med">{category.categoryName}</p>
                <ul className="ps-4">
                  {category.descriptions.filter((d) =>
                    details.some(
                      (desc) =>
                        desc.descriptionDetail === d.descriptionDetail &&
                        desc.symptomId === symptom.id
                    )
                  ).length > 0 ? (
                    category.descriptions
                      .filter((d) =>
                        details.some(
                          (desc) =>
                            desc.descriptionDetail === d.descriptionDetail &&
                            desc.symptomId === symptom.id
                        )
                      )
                      .map((filteredDescription, index) => (
                        <li key={index} className="text-secondary-1">
                          <span>{filteredDescription.descriptionDetail}</span>
                        </li>
                      ))
                  ) : (
                    <li className="text-secondary-1">N/A</li>
                  )}
                </ul>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="form-group row pb-5">
        <h5 className="text-dark-1 fw-med col-3">Disease name:</h5>
        <input
          type="text"
          className="form-control border-dark-subtle col"
          name="name"
          value={disease.name}
          readOnly={mode === "view"}
          disabled={mode === "view"}
          onChange={(e) => updateField(e)}
        />
      </div>

      <div className="form-group row pb-5">
        <h5 className="text-dark-1 fw-med col-3">Ages:</h5>
        <div
          className={`border border-dark-subtle rounded col-9 ${
            mode === "view" ? "bg-gray-2" : ""
          }`}
        >
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
        <h5 className="text-dark-1 fw-med col-3">Gender:</h5>
        <div
          className={`border border-dark-subtle rounded col-9 ${
            mode === "view" ? "bg-gray-2" : ""
          }`}
        >
          <p className="m-1">
            {disease.genders?.map((gender, index) => (
              <span key={index}>
                {gender} {index < disease.genders.length - 1 && "& "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="form-group row pb-5">
        <h5 className="text-dark-1 fw-med col-3">Symptom(s):</h5>
        <div
          className={`border border-dark-subtle rounded col-9 ${
            mode === "view" ? "bg-gray-2" : ""
          }`}
        >
          <div className="d-flex py-2">
            {chosenSymptom?.map((symptom) => {
              return <Symptom symptom={symptom} key={symptom.name} />;
            })}
          </div>
        </div>
      </div>

      <div className="form-group pb-5">
        <h5 className="text-dark-1 fw-med col-3">Chosen descriptions:</h5>
        <div className="col">
          {chosenSymptom?.map((symptom) => {
            return <Details symptom={symptom} key={symptom.name} />;
          })}
        </div>
      </div>
    </div>
  );
}
