import React from "react";
import "components/SymptomChecker/SymptomChecker.scss";

export default function PatientFormAgeGen({ patientForm, setPatientForm }) {
  function updateField(event) {
    // If the value is not a whole number, prevent updating the state for the 'age' field
    if (
      event.target.name === "age" &&
      !Number.isInteger(+event.target.value) &&
      event.target.value !== ""
    ) {
      return;
    }
    setPatientForm({
      ...patientForm,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div>
      <div className="text-center">
        <h4 className="text-dark-header fw-med pb-1">Please enter your info</h4>
        <p className="fw-light">This tool does not provide medical advice</p>
      </div>
      <div className="steps-info-section">
        <div className="form-group pb-4 pb-md-2">
          <h5 className="fw-med text-dark-1">
            {parseInt(patientForm.age, 10) < 1 ||
            parseInt(patientForm.age, 10) > 125 ? (
              <span>
                Invalid age <i className="bi bi-exclamation-circle-fill"></i>
              </span>
            ) : (
              "Age"
            )}
          </h5>
          <div className="select-age">
            <input
              type="number"
              className="form-control fw-reg"
              name="age"
              placeholder="Enter age"
              value={patientForm.age}
              onChange={(e) => updateField(e)}
            />
          </div>
        </div>
        <div className="form-group pb-2">
          <h5 className="fw-med text-dark-1">Gender</h5>
          <div className="select-gender">
            <select
              name="gender"
              value={patientForm.gender}
              className="form-select fw-reg"
              onChange={(e) => updateField(e)}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
