import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const PatientFormDetails = ({ patientForm, setPatientForm }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  useEffect(() => {
    axios
      .get(`https://symptom-checker-with-mern-backend.onrender.com/symptom/`)
      .then((res) => {
        const symptoms = res.data;
        const selected = symptoms.filter((symptom) =>
          patientForm.patientSymptoms.some(
            (patientFormSymptom) => patientFormSymptom._id === symptom._id
          )
        );
        setSelectedSymptoms(selected);
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }, [selectedSymptoms]);

  const [selectedDetails, setSelectedDetails] = useState([]);
  useEffect(() => {
    function updateForm() {
      if (patientForm.patientSymptoms.length > 0) {
        const symptomList = patientForm.patientSymptoms;
        const categoryList = symptomList.flatMap(
          (symptom) => symptom.categories
        );
        const descriptionList = categoryList.map(
          (category) => category.descriptions
        );
        const selectedBeforeDetails = descriptionList.flatMap((sublist) =>
          sublist.map((item) => item.descriptionDetail)
        );
        setSelectedDetails(selectedBeforeDetails);
      } else return;
    }
    updateForm();
    return;
  }, [selectedDetails.length]);

  const onCheck = (symptomId, categoryName, descriptionDetail) => {
    if (selectedDetails.includes(descriptionDetail)) {
      setSelectedDetails(
        selectedDetails.filter(
          (selectedDetail) => selectedDetail !== descriptionDetail
        )
      );
      const _patientForm = patientForm;
      const symptomIndex = _patientForm.patientSymptoms.findIndex(
        (symptom) => symptom._id === symptomId
      );
      if (symptomIndex !== -1) {
        const categoryIndex = _patientForm.patientSymptoms[
          symptomIndex
        ].categories.findIndex(
          (category) => category.categoryName === categoryName
        );
        if (categoryIndex !== -1) {
          _patientForm.patientSymptoms[symptomIndex].categories[
            categoryIndex
          ].descriptions = _patientForm.patientSymptoms[
            symptomIndex
          ].categories[categoryIndex].descriptions.filter(
            (description) => description.descriptionDetail !== descriptionDetail
          );
          _patientForm.patientSymptoms[symptomIndex].categories =
            _patientForm.patientSymptoms[symptomIndex].categories.filter(
              (category) => category.descriptions.length > 0
            );
        }
        setPatientForm(_patientForm);
      }
    } else {
      setSelectedDetails([...selectedDetails, descriptionDetail]);
      const _patientForm = patientForm;
      const symptomIndex = _patientForm.patientSymptoms.findIndex(
        (symptom) => symptom._id === symptomId
      );
      const categoryIndex = patientForm.patientSymptoms[
        symptomIndex
      ].categories.findIndex(
        (category) => category.categoryName === categoryName
      );
      if (categoryIndex === -1) {
        _patientForm.patientSymptoms[symptomIndex].categories.push({
          index: uuidv4(),
          categoryName: categoryName,
          descriptions: [
            {
              index: uuidv4(),
              descriptionDetail: descriptionDetail,
            },
          ],
        });
        setPatientForm(_patientForm);
      } else {
        _patientForm.patientSymptoms[symptomIndex].categories[
          categoryIndex
        ].descriptions.push({
          index: uuidv4(),
          descriptionDetail: descriptionDetail,
        });
        setPatientForm(_patientForm);
      }
    }
  };

  const Symptom = (props) => {
    return (
      <div>
        <div className="form-group row pb-4">
          <h4 className="card-title text-danger text-uppercase">
            MÔ TẢ CHI TIẾT TRIỆU CHỨNG {props.symptom.name}
          </h4>
        </div>
        {props.symptom.categories.map((category) => {
          return (
            <div key={category.index}>
              <div className="form row pt-3 pb-3">
                <h4 className="card-title text-danger col-12 text-uppercase">
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
                      checked={selectedDetails.includes(
                        description.descriptionDetail
                      )}
                      style={{ marginRight: "5px" }}
                      onChange={() =>
                        onCheck(
                          props.symptom._id,
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
        <hr className="pb-4" style={{ color: "red" }} />
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

export default PatientFormDetails;
