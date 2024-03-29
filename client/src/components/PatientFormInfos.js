import React from "react";

const PatientFormInfos = ({ patientForm, setPatientForm }) => {
  const updatePatientAgeRangeField = (event) => {
    let _patientForm = { ...patientForm };
    _patientForm[event.target.name] = event.target.value;
    return setPatientForm(_patientForm);
  };

  const updatePatientGenderField = (event) => {
    let _patientForm = { ...patientForm };
    _patientForm[event.target.name] = event.target.value;
    return setPatientForm(_patientForm);
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
          <h5 className="col-2 fw-med text-blue-2">Độ tuổi</h5>
          <div className="col-3">
            <select
              name="patientAgeRange"
              value={patientForm.patientAgeRange}
              className="form-select blue-border-1 col-12 fw-reg"
              onChange={(e) => updatePatientAgeRangeField(e)}
            >
              <option value="">Chọn độ tuổi</option>
              <option value="Dưới 1 tháng">Dưới 1 tháng</option>
              <option value="1 tháng - 1 tuổi">1 tháng - 1 tuổi</option>
              <option value="1 tuổi - 5 tuổi">1 tuổi - 5 tuổi</option>
              <option value="6 tuổi - 12 tuổi">6 tuổi - 12 tuổi</option>
              <option value="13 tuổi - 16 tuổi">13 tuổi - 16 tuổi</option>
              <option value="17 tuổi - 29 tuổi">17 tuổi - 29 tuổi</option>
              <option value="30 tuổi - 39 tuổi">30 tuổi - 39 tuổi</option>
              <option value="40 tuổi - 49 tuổi">40 tuổi - 49 tuổi</option>
              <option value="50 tuổi - 64 tuổi">50 tuổi - 64 tuổi</option>
              <option value="Trên 65 tuổi">Trên 65 tuổi</option>
            </select>
          </div>
        </div>
        <div className="form-group row pb-5">
          <h5 className="col-2 fw-med text-blue-2">Giới tính</h5>
          <div className="col-3">
            <select
              name="patientGender"
              value={patientForm.patientGender}
              className="form-select blue-border-1 col-12 fw-reg"
              onChange={(e) => updatePatientGenderField(e)}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientFormInfos;
