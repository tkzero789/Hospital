import React from "react";

const PatientFormAgeGen = ({ patientForm, setPatientForm }) => {
  const updateAgeField = (event) => {
    let _patientForm = { ...patientForm };
    _patientForm[event.target.name] = event.target.value;
    setPatientForm(_patientForm);
  };

  const updateGenField = (event) => {
    let _patientForm = { ...patientForm };
    _patientForm[event.target.name] = event.target.value;
    setPatientForm(_patientForm);
  };

  return (
    <div>
      <div className="pb-5 text-center">
        <h4 className="text-blue-1 fw-med">
          Vui lòng cung cấp thông tin của bạn
        </h4>
      </div>
      <div className="px-5">
        <div className="form-group row pb-5">
          <h5 className="col-2 fw-med text-blue-2">Tuổi tác</h5>
          <div className="col-3">
            <input
              type="number"
              className="form-control blue-border-1 col-12 fw-reg"
              name="patientAge"
              value={patientForm.patientAge}
              onChange={(e) => updateAgeField(e)}
            />
          </div>
        </div>
        <div className="form-group row pb-5">
          <h5 className="col-2 fw-med text-blue-2">Giới tính</h5>
          <div className="col-3">
            <select
              name="patientGender"
              value={patientForm.patientGender}
              className="form-select blue-border-1 col-12 fw-reg"
              onChange={(e) => updateGenField(e)}
            >
              <option value=""></option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFormAgeGen;
