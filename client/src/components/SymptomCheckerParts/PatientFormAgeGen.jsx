import React from "react";

export default function PatientFormAgeGen({ patientForm, setPatientForm }) {
  function updateField(event) {
    setPatientForm({
      ...patientForm,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div>
      <div className="text-center">
        <h4 className="text-blue-1 fw-med">Please enter your info</h4>
        <p className="fw-light">This tool does not provide medical advice</p>
      </div>
      <div className="steps-info-section">
        <div className="form-group pb-5">
          <h5 className="fw-med text-blue-2">Age</h5>
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
        <div className="form-group pb-5">
          <h5 className="fw-med text-blue-2">Gender</h5>
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
