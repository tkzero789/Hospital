import React from "react";

const Symptom = ({ symptom, isChecked, onCheck, key }) => {
  return (
    <div key={key} className="col-3 pb-3">
      <div className="form">
        <label style={{ display: "flex" }}>
          <input
            type="checkbox"
            style={{ marginRight: "5px" }}
            checked={isChecked}
            onChange={() => {
              onCheck(symptom.id, symptom.name);
            }}
          />
          <span className="text-blue-1">
            <h5 style={{ marginBottom: "1px" }}>{symptom.name}</h5>
          </span>
        </label>
      </div>
    </div>
  );
};

const DiseaseSymptoms = ({
  disease,
  dbSymps,
  setDisease,
  chosenSymps,
  setChosenSymps,
  chosenCats,
  setChosenCats,
  chosenDes,
  setChosenDes,
}) => {
  // display symptom chosen and update disease symptoms
  const onCheck = (symptomId, symptomName) => {
    if (chosenSymps.includes(symptomId)) {
      setChosenSymps(chosenSymps.filter((existId) => existId !== symptomId));
      const _disease = disease;
      const symptomIndex = _disease.symptoms.findIndex(
        (symptom) => symptom.id === symptomId
      );
      if (_disease.symptoms[symptomIndex].categories.length > 0) {
        for (const cat of _disease.symptoms[symptomIndex].categories) {
          setChosenCats(chosenCats.filter((chosenId) => chosenId !== cat.id));
          if (cat.descriptions.length > 0) {
            for (const des of cat.descriptions) {
              setChosenDes(chosenDes.filter((chosenId) => chosenId !== des.id));
            }
          }
        }
      }
      _disease.symptoms = _disease.symptoms.filter(
        (symptom) => symptom.id !== symptomId
      );
      setDisease(_disease);
    } else {
      setChosenSymps([...chosenSymps, symptomId]);
      const newSymptom = {
        id: symptomId,
        name: symptomName,
        categories: [],
      };
      setDisease({
        ...disease,
        symptoms: [...disease.symptoms, newSymptom],
      });
    }
  };

  return (
    <div>
      <h4 className="card-title text-body">Triệu chứng đã có:</h4>
      <div className="row pt-3 pb-3">
        {dbSymps.map((symptom) => {
          return (
            <Symptom
              symptom={symptom}
              onCheck={() => onCheck(symptom.id, symptom.name)}
              isChecked={chosenSymps.includes(symptom.id)}
              key={symptom.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DiseaseSymptoms;
