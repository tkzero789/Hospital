import React, { useEffect, useState } from "react";

const PatientFormDes = ({ dbSymps, patientForm, setPatientForm }) => {
  const [chosenSympsDB, setChosenSympsDB] = useState([]);
  useEffect(() => {
    setChosenSympsDB(
      dbSymps.filter((symptom) => patientForm.chosenSymps.includes(symptom.id))
    );
  }, [patientForm]);

  const onCheck = (symptomId, categoryId, descriptionId) => {
    console.log(patientForm.chosenDes);
    console.log(descriptionId);
    if (
      patientForm.chosenDes.some(
        (chosenDes) => chosenDes.desId === descriptionId
      )
    ) {
      if (
        patientForm.chosenDes.filter(
          (chosenDes) => chosenDes.catId === categoryId
        ).length > 1
      ) {
        setPatientForm({
          ...patientForm,
          chosenDes: patientForm.chosenDes.filter(
            (chosenDes) => chosenDes.desId !== descriptionId
          ),
        });
      } else {
        setPatientForm({
          ...patientForm,
          chosenCats: patientForm.chosenCats.filter(
            (chosenCats) => chosenCats.catId !== categoryId
          ),
          chosenDes: patientForm.chosenDes.filter(
            (chosenDes) => chosenDes.desId !== descriptionId
          ),
        });
      }
    } else {
      if (
        patientForm.chosenCats.some(
          (chosenCat) => chosenCat.catId === categoryId
        )
      ) {
        setPatientForm({
          ...patientForm,
          chosenDes: [
            ...patientForm.chosenDes,
            { sympId: symptomId, catId: categoryId, desId: descriptionId },
          ],
        });
      } else {
        setPatientForm({
          ...patientForm,
          chosenCats: [
            ...patientForm.chosenCats,
            { sympId: symptomId, catId: categoryId },
          ],
          chosenDes: [
            ...patientForm.chosenDes,
            { sympId: symptomId, catId: categoryId, desId: descriptionId },
          ],
        });
      }
    }
  };

  const Symptom = ({ symptom, key }) => {
    return (
      <div key={key}>
        <div className="form-group row pb-4">
          <h4 className="card-title text-blue-1 fw-med text-center text-underline">
            Mô tả chi tiết triệu chứng {symptom.name}
          </h4>
        </div>
        {symptom.categories.map((category) => {
          return (
            <div key={category.id}>
              <div className="form row pt-3 pb-3">
                <h5 className="card-title text-blue-2 col-12 fw-med">
                  {category.categoryName}
                </h5>
              </div>
              <div className="row">
                {category.descriptions.map((description) => (
                  <div
                    key={description.id}
                    className="form-group pb-3 col-4"
                    style={{ display: "flex" }}
                  >
                    <label className="d-flex">
                      <input
                        type="checkbox"
                        checked={patientForm.chosenDes.some(
                          (chosenDes) => chosenDes.desId === description.id
                        )}
                        style={{ marginRight: "5px" }}
                        onChange={() =>
                          onCheck(symptom.id, category.id, description.id)
                        }
                      />
                      <h5
                        className="fw-reg fs-18"
                        style={{ marginBottom: "0px" }}
                      >
                        {description.descriptionDetail}
                      </h5>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <hr className="pb-4" style={{ color: "#002c77" }} />
      </div>
    );
  };

  return (
    <div className="row pt-3 pb-3">
      {chosenSympsDB.map((symptom) => (
        <Symptom symptom={symptom} key={symptom.id} />
      ))}
    </div>
  );
};

export default PatientFormDes;
