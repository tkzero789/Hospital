import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ExistedDetails = ({ form, setForm }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  useEffect(() => {
    async function getSymptoms() {
      const response = await fetch(`http://localhost:5000/symptom/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const symptoms = await response.json();
      const selected = symptoms.filter((symptom) =>
        form.some((formSymptom) => formSymptom._id === symptom._id)
      );
      setSelectedSymptoms(selected);
    }
    getSymptoms();
    console.log(selectedSymptoms);
  }, []);

  const [selectedDetails, setSelectedDetails] = useState([]);

  const onCheck = (symptomId, categoryName, descriptionDetail) => {
    if (selectedDetails.includes(descriptionDetail)) {
      setSelectedDetails(
        selectedDetails.filter(
          (selectedDetail) => selectedDetail !== descriptionDetail
        )
      );
      const _form = form.flatMap((symptom) =>
        symptom.categories.flatMap((category) =>
          category.descriptions.filter(
            (description) => description.descriptionDetail !== descriptionDetail
          )
        )
      );
      setForm(_form);
    } else {
      setSelectedDetails([...selectedDetails, descriptionDetail]);
      let _form = form;
      const symptomIndex = form.findIndex(
        (symptom) => symptom._id === symptomId
      );
      console.log(form);
      _form[symptomIndex].categories.push({
        index: uuidv4(),
        categoryName: categoryName,
        descriptions: [
          {
            index: uuidv4(),
            descriptionDetail: descriptionDetail,
          },
        ],
      });
      setForm(_form);
    }
  };

  const Symptom = (props) => {
    return (
      <div>
        <div className="form-group row pb-5">
          <h4 className="card-title text-danger text-uppercase">
            MÔ TẢ CHI TIẾT TRIỆU CHỨNG {props.symptom.name}
          </h4>
        </div>
        {props.symptom.categories.map((category) => {
          return (
            <div key={category.index}>
              <div className="form row pb-3">
                <h4 className="card-title text-danger col-3 text-uppercase">
                  {category.categoryName}
                </h4>
              </div>
              <div className="row">
                {category.descriptions.map((description) => (
                  <div
                    className="form-group pb-3 col-4"
                    style={{ display: "flex" }}
                  >
                    <input
                      type="checkbox"
                      style={{ marginRight: "5px" }}
                      onClick={(e) =>
                        onCheck(
                          props.key,
                          category.categoryName,
                          description.descriptionDetail
                        )
                      }
                    />
                    <h5 style={{ marginBottom: "0px" }}>
                      {description.descriptionDetail}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <hr style={{ color: "red" }} />
      </div>
    );
  };

  return (
    <div className="row pt-3 pb-3">
      {selectedSymptoms.map((symptom) => (
        <Symptom symptom={symptom} key={symptom._id} />
      ))}
    </div>
  );
};

export default ExistedDetails;
