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
        <h4>Vui lòng cung cấp thông tin của bạn</h4>
      </div>
      <div className="px-5">
        <div className="form-group row pb-5">
          <h5 className="text-black col-2">Độ tuổi</h5>
          <div className="col-3">
            <select
              name="patientAgeRange"
              value={patientForm.patientAgeRange}
              className="form-select blue-border-1 col-12"
              onChange={(e) => updatePatientAgeRangeField(e)}
            >
              <option value="">Chọn độ tuổi</option>
              <option value="Mọi độ tuổi">Mọi độ tuổi</option>
              <option value="Dưới 1 tháng">Dưới 1 tháng</option>
              <option value="1 tuổi - 6 tuổi">1 tuổi - 6 tuổi</option>
              <option value="6 tuổi - 12 tuổi">6 tuổi - 12 tuổi</option>
              <option value="12 tuổi - 18 tuổi">12 tuổi - 18 tuổi</option>
              <option value="18 tuổi - 30 tuổi">18 tuổi - 30 tuổi</option>
              <option value="30 tuổi - 60 tuổi">30 tuổi - 60 tuổi</option>
            </select>
          </div>
        </div>
        <div className="form-group row pb-5">
          <h5 className="text-black col-2">Giới tính</h5>
          <div className="col-3">
            <select
              name="patientGender"
              value={patientForm.patientGender}
              className="form-select blue-border-1 col-12"
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
