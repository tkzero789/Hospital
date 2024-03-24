import React, { useState } from "react";
import { useNavigate } from "react-router";
import PatientFormInfos from "../components/PatientFormInfos";
import PatientFormSymptoms from "../components/PatientFormSymptoms";
import PatientFormDetails from "../components/PatientFormDetails";
import PatientFormResult from "../components/PatientFormResult";
import MainNav from "../components/MainNav";
import LowNav from "../components/LowNav";
import Footer from "../components/Footer";

export default function SymptomChecker() {
  const [patientForm, setPatientForm] = useState({
    patientAgeRange: "",
    patientGender: "",
    patientSymptoms: [],
  });

  const [step, setStep] = useState(1);

  const StepDisplay = () => {
    if (step === 1) {
      return (
        <PatientFormInfos
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    } else if (step === 2) {
      return (
        <PatientFormSymptoms
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    } else if (step === 3) {
      return (
        <PatientFormDetails
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    } else {
      return (
        <PatientFormResult
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    }
  };

  const handlePrev = () => {
    setStep((step) => step - 1);
  };
  const handleNext = () => {
    setStep((step) => step + 1);
  };

  const stepNames = [
    { number: 0, name: "Điền thông tin" },
    { number: 1, name: "Chọn triệu chứng" },
    { number: 2, name: "Mô tả chi tiết" },
    { number: 3, name: "Kết quả chẩn đoán" },
  ];

  const StepName = (props) => {
    return (
      <div
        className={
          "p-2 col-3 " +
          (props.number === 0
            ? "blue-bg-1 border rounded-start border-secondary"
            : "") +
          (props.number < props.currStep
            ? "blue-bg-1 border-end border-top border-bottom border-secondary"
            : "bg-white border-end border-top border-bottom border-secondary") +
          (props.number === 3 ? " rounded-end" : "")
        }
      >
        <h5
          className={
            "text-center " +
            (props.number < props.currStep ? "text-white" : "text-black")
          }
          style={{ marginBottom: "1px" }}
        >
          {props.name}
        </h5>
      </div>
    );
  };

  const ProcessBar = () => {
    return stepNames.map((stepName) => {
      return (
        <StepName
          number={stepName.number}
          currStep={step}
          name={stepName.name}
        />
      );
    });
  };

  const navigate = useNavigate();

  async function confirmCreate(e) {
    if (patientForm.title === "") {
      alert("Thiếu tên bài viết");
    } else if (patientForm.diseaseName === "") {
      alert("Thiếu tên căn bệnh");
    } else if (patientForm.diseaseAgeRanges.length < 1) {
      alert("Thiếu độ tuổi bệnh nhân");
    } else if (patientForm.diseaseGenders.length < 1) {
      alert("Thiếu giới tính bệnh nhân");
    } else if (patientForm.diseaseSymptoms.length < 1) {
      alert("Thiếu triệu chứng bệnh");
    } else if (
      patientForm.diseaseInfos.filter((info) => info.detail === "").length > 0
    ) {
      alert("Thiếu thông tin bệnh");
    } else if (
      patientForm.diseaseTreatments.filter(
        (treatment) => treatment.detail === ""
      ).length > 0
    ) {
      alert("Thiếu phương pháp chữa trị");
    } else {
      e.preventDefault();
      const newpatientForm = { ...patientForm };
      console.log(newpatientForm);
      await fetch(
        "https://symptom-checker-with-mern-backend.onrender.com/patientForm/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newpatientForm),
        }
      ).catch((error) => {
        window.alert(error);
        return;
      });
      console.log("patientForm created");
      console.log(patientForm);
      setPatientForm({
        title: "",
        author: "BS Anh Kiet",
        diseaseName: "",
        diseaseAgeRanges: [],
        diseaseGenders: [],
        diseaseSymptoms: [],
        diseaseInfos: [],
        diseaseTreatments: [],
      });
      setStep(1);
      navigate("/create-patientForm");
    }
  }

  return (
    <div>
      <MainNav />
      <LowNav />
      {/* Symptom Checker Section */}
      <div className="symp-checker w-100">
        <div className="content-container">
          <h3 className="text-center">
            CHÀO MỪNG BẠN ĐẾN VỚI TÍNH NĂNG GỢI Ý CHẨN ĐOÁN BỆNH
          </h3>
          <div className="symp-checker-steps">
            <h5>CÁC BƯỚC SỬ DỤNG</h5>
            <p>Bước 1: Điền thông tin về giới tính, tuổi tác của bạn</p>
            <p>
              Bước 2: Chọn một hoặc nhiều triệu chứng bệnh từ danh sách có sẵn
              hoặc từ bản đồ cơ thể
            </p>
            <p>
              Bước 3: Chọn một hoặc nhiều các mô tả chi tiết của triệu chứng phù
              hợp với tình trạng cơ thể
            </p>
            <p>Bước 4: Chọn căn bệnh được hệ thống chẩn đoán</p>
            <p>Bước 5: Chọn bài viết về căn bệnh để biết thông tin chi tiết</p>
            <p>Bước 6: Chọn phương pháp điều trị</p>
          </div>
          <div className="symp-checker-board">
            <div className="card p-5">
              <div className="row border rounded">{ProcessBar()}</div>
              <form className="pt-4">
                <div>{StepDisplay()}</div>

                <div className="row pt-3 pb-3 justify-content-end">
                  <div className="col-3 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      disabled={step === 1}
                      onClick={handlePrev}
                    >
                      Quay lại
                    </button>
                  </div>
                  <div className="col-3 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={(e) => {
                        if (step === 4) {
                          confirmCreate(e);
                        } else {
                          handleNext();
                        }
                      }}
                    >
                      {step === 3 ? "Xem kết quả" : "Tiếp theo"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
