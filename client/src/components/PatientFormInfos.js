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
        <h4>HÃY CHO CHÚNG TÔI BIẾT THÔNG TIN VỀ BỆNH NHÂN</h4>
      </div>
      <div className="form-group row pb-5">
        <h4 className="text-danger col-2">ĐỘ TUỔI</h4>
        <div className="col-3">
          <select
            name="patientAgeRange"
            value={patientForm.patientAgeRange}
            className="form-select border-danger-subtle col-12"
            onChange={(e) => updatePatientAgeRangeField(e)}
          >
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
        <h4 className="text-danger col-2">GIỚI TÍNH</h4>
        <div className="col-3">
          <select
            name="patientGender"
            value={patientForm.patientGender}
            className="form-select border-danger-subtle col-3"
            onChange={(e) => updatePatientGenderField(e)}
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PatientFormInfos;
