import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PatientFormAgeGen from "../../components/SymptomCheckerParts/PatientFormAgeGen";
import PatientFormSymptoms from "../../components/SymptomCheckerParts/PatientFormSymptoms";
import PatientFormDes from "../../components/SymptomCheckerParts/PatientFormDes";
import PatientFormResult from "../../components/SymptomCheckerParts/PatientFormResult";
import axios from "axios";
import { Toaster, toast } from "sonner";
import Footer from "../../components/ForPages/Footer";

export default function SymptomChecker() {
  const [patientForm, setPatientForm] = useState({
    age: "",
    gender: "",
    chosenSymps: [],
    chosenCats: [],
    chosenDes: [],
  });
  const [feedback, setFeedback] = useState({
    stars: 0,
    comment: "",
    isSent: false,
  });
  // get all symptoms from DB
  const [dbSymps, setDbSymps] = useState([]);
  // keep patient result updated every step, contain disease objects from dbDiseases
  const [patientResult, setPatientResult] = useState([]);
  // set step and previous step in the process
  const [prevStep, setPrevStep] = useState(1);
  const [step, setStep] = useState(1);
  const stepNames = [
    { number: 0, name: "Điền thông tin" },
    { number: 1, name: "Chọn triệu chứng" },
    { number: 2, name: "Mô tả chi tiết" },
    { number: 3, name: "Kết quả chẩn đoán" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/disease")
      .then((res) => {
        setPatientResult(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/symptom")
      .then((res) => {
        setDbSymps(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
        return;
      });
  }, []);

  useEffect(() => {
    if (prevStep === 1) {
      const age = patientForm.age;
      if (age !== "") {
        if (age <= 1) {
          age = "Dưới 1 tuổi";
        } else if (age <= 5) {
          age = "1 tuổi - 5 tuổi";
        } else if (age <= 12) {
          age = "6 tuổi - 12 tuổi";
        } else if (age <= 16) {
          age = "13 tuổi - 16 tuổi";
        } else if (age <= 29) {
          age = "17 tuổi - 29 tuổi";
        } else if (age <= 39) {
          age = "30 tuổi - 39 tuổi";
        } else if (age <= 49) {
          age = "40 tuổi - 49 tuổi";
        } else if (age <= 64) {
          age = "50 tuổi - 64 tuổi";
        } else {
          age = "Trên 65 tuổi";
        }
      }
      const gender = patientForm.gender;
      const _patientResult = patientResult.filter((disease) => {
        return (
          (age === "" ||
            disease.ageRanges.includes(age) ||
            disease.ageRanges.includes("Mọi độ tuổi")) &&
          (gender === "" ||
            disease.genders.includes(gender) ||
            disease.ageRanges.includes("Cả nam và nữ"))
        );
      });
      setPatientResult(_patientResult);
    } else if (prevStep === 2) {
      const _patientResult = patientResult.map((disease) => ({
        ...disease,
        sympMatched:
          disease.symptoms.filter((symp) =>
            patientForm.chosenSymps.includes(symp.id)
          ).length * 5,
      }));
      const sortedPatientResult = _patientResult
        .filter((disease) => disease.sympMatched > 0)
        .sort((a, b) => b.sympMatched - a.sympMatched);
      setPatientResult(sortedPatientResult);
    } else if (prevStep === 3) {
      const _patientResult = patientResult.map((disease) => {
        const matchedScore = disease.symptoms.reduce(
          (sum, symptom) =>
            sum +
            symptom.categories
              .filter((cat) =>
                patientForm.chosenCats.some(
                  (chosenCat) => chosenCat.catId === cat.id
                )
              )
              .flatMap((cat) => cat.descriptions)
              .filter((des) =>
                patientForm.chosenDes.some(
                  (chosenDes) => chosenDes.desId === des.id
                )
              ).length,
          disease.sympMatched || 0
        );
        return {
          ...disease,
          matchedScore,
        };
      });
      const sortedPatientResult = _patientResult.sort(
        (a, b) => b.matchedScore - a.matchedScore
      );
      setPatientResult(sortedPatientResult);
    }
  }, [
    prevStep,
    patientForm.age,
    patientForm.gender,
    patientForm.chosenSymps,
    patientForm.chosenDes,
    patientForm.chosenCats,
  ]);

  const StepDisplay = () => {
    if (step === 1) {
      return (
        <PatientFormAgeGen
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    } else if (step === 2) {
      return (
        <PatientFormSymptoms
          dbSymps={dbSymps}
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    } else if (step === 3) {
      return (
        <PatientFormDes
          dbSymps={dbSymps}
          patientForm={patientForm}
          setPatientForm={setPatientForm}
        />
      );
    } else {
      return (
        <PatientFormResult
          patientResult={patientResult}
          feedback={feedback}
          setFeedback={setFeedback}
        />
      );
    }
  };

  const handleNext = () => {
    setPrevStep(step);
    setStep((step) => step + 1);
    window.scrollTo({ top: 100, left: 0, behavior: "instant" });
  };

  const checkHandleNext = () => {
    if (step === 2) {
      console.log(patientForm.chosenSymps);
      if (patientForm.chosenSymps.length === 0) {
        toast.error("Hãy chọn ít nhất 1 triệu chứng");
        return;
      } else {
        return handleNext();
      }
    } else if (step === 3) {
      if (patientForm.chosenDes.length === 0) {
        toast.error("Hãy chọn ít nhất 1 mô tả");
        return;
      } else {
        return handleNext();
      }
    }
    handleNext();
  };

  const handlePrev = () => {
    setPrevStep(step);
    setStep((step) => step - 1);
    window.scrollTo({ top: 100, left: 0, behavior: "instant" });
  };

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
            "fw-med text-center " +
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
          key={stepName.number}
          number={stepName.number}
          currStep={step}
          name={stepName.name}
        />
      );
    });
  };

  return (
    <>
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
            <h5>
              LƯU Ý: Kết quả chỉ mang tính chất tham khảo. Để tìm hiểu chính xác
              nhất về tình trạng của bản thân, vui lòng đến các cơ sở y tế hoặc
              đặt lịch khám tại bệnh viện chúng tôi để được chẩn đoán chính xác
              nhất.
            </h5>
          </div>
          <div className="symp-checker-board">
            <div className="card">
              <div className="progress-bar-step border rounded">
                {ProcessBar()}
              </div>
              <form>
                <div>{StepDisplay()}</div>

                <div className="steps-button-wrapper">
                  <div className="steps-back-button">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      disabled={step === 1}
                      onClick={() => {
                        if (step === 2) {
                          window.location.reload();
                        } else {
                          handlePrev();
                        }
                      }}
                    >
                      Quay lại
                    </button>
                  </div>
                  <div className="steps-next-button">
                    {step === 4 ? (
                      <Link
                        type="button"
                        className="btn btn-outline-primary"
                        to={`/appt-request`}
                      >
                        ĐẶT LỊCH KHÁM
                      </Link>
                    ) : (
                      <>
                        <Toaster
                          toastOptions={{
                            className: "toast-noti",
                          }}
                          position="top-center"
                          richColors
                        />
                        <button
                          type="button"
                          className="btn btn-primary"
                          disabled={
                            step === 1 &&
                            (!patientForm.patientAge ||
                              !patientForm.patientGender)
                          }
                          onClick={checkHandleNext}
                        >
                          {step === 3 ? "Xem kết quả" : "Tiếp theo"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
