import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

import DoctorNav from "../components/DoctorNav";
import AdminNavBar from "../components/AdminNavBar";
import DiseaseSymptoms from "../components/DiseaseSymptoms";
import DiseaseSympDes from "../components/DiseaseSympDes";
import DiseaseAgeGen from "../components/DiseaseAgeGen";
import DiseaseName from "../components/DiseaseName";

export default function CreateDisease() {
  const [disease, setDisease] = useState({
    name: "",
    ageRanges: [],
    genders: [],
    symptoms: [],
  });

  const [step, setStep] = useState(1);

  const StepDisplay = () => {
    if (step === 1) {
      return <DiseaseAgeGen disease={disease} setDisease={setDisease} />;
    } else if (step === 2) {
      return <DiseaseSymptoms disease={disease} setDisease={setDisease} />;
    } else if (step === 3) {
      return <DiseaseSympDes disease={disease} setDisease={setDisease} />;
    } else {
      return <DiseaseName disease={disease} setDisease={setDisease} />;
    }
  };

  const handlePrev = () => {
    setStep((step) => step - 1);
  };
  const handleNext = () => {
    setStep((step) => step + 1);
  };

  const navigate = useNavigate();

  async function confirmCreate(e) {
    if (disease.name === "") {
      alert("Thiếu tên căn bệnh");
    } else if (disease.ageRanges.length < 1) {
      alert("Thiếu độ tuổi");
    } else if (disease.genders.length < 1) {
      alert("Thiếu giới tính");
    } else if (disease.symptoms.length < 1) {
      alert("Thiếu triệu chứng bệnh");
    } else {
      e.preventDefault();
      const newDisease = { ...disease };
      axios
        .post(
          "https://symptom-checker-with-mern-backend.onrender.com/disease/add",
          newDisease
        )
        .then((res) => {
          console.log("Disease created");
          console.log(res.data);
          setDisease({
            name: "",
            ageRanges: [],
            genders: [],
            symptoms: [],
          });
          setStep(1);
          navigate("/diseases");
        })
        .catch((err) => {
          const message = `An error occurred: ${err}`;
          window.alert(message);
          return;
        });
    }
  }

  return (
    <div>
      <DoctorNav />
      <AdminNavBar />
      <h3 className="container text-center text-body pt-5">TẠO CĂN BỆNH</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>{StepDisplay()}</div>

            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled={step === 1}
                  onClick={handlePrev}
                >
                  QUAY LẠI
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
                  {step === 4 ? "XÁC NHẬN TẠO" : "TIẾP THEO"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
