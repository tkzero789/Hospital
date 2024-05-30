import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import DiseaseAgeGen from "../../components/DiseaseParts/DiseaseAgeGen";
import DiseaseSymps from "../../components/DiseaseParts/DiseaseSymps";
import DiseaseDescs from "../../components/DiseaseParts/DiseaseDescs";
import DiseaseName from "../../components/DiseaseParts/DiseaseName";

export default function CreateDisease({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [disease, setDisease] = useState({
    id: uuidv4(),
    idTemp: uuidv4(),
    name: "",
    ageRanges: [],
    genders: [],
    symptomIds: [],
    descIds: [],
    medSpecialty: userInfos.medSpecialty,
    relatedArticles: [],
    createInfos: {
      doctorCreated: userInfos.fullName,
      doctorID: userInfos.doctorID,
      timeCreated: formattedTime,
      timeEdited: null,
    },
    status: "Pending Create",
    doctorReqID: userInfos.doctorReqID,
  });
  const [dbSymps, setDbSymps] = useState([]);
  const [chosenSymps, setChosenSymps] = useState([]);
  // set form steps
  const [step, setStep] = useState(1);
  const [finalStep, setFinalStep] = useState(3);
  const navigate = useNavigate();

  // get symptoms from db
  useEffect(() => {
    axios
      .get("http://localhost:5000/symptom")
      .then((res) => {
        setDbSymps(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, []);

  useEffect(() => {
    setChosenSymps(
      dbSymps.filter((symptom) => disease.symptomIds.includes(symptom.id))
    );
  }, [dbSymps, disease.symptomIds]);

  useEffect(() => {
    setFinalStep(3 + chosenSymps.length);
  }, [chosenSymps]);

  // display components step by step
  function StepDisplay() {
    if (step === 1) {
      return <DiseaseAgeGen disease={disease} setDisease={setDisease} />;
    } else if (step === 2) {
      return (
        <DiseaseSymps
          disease={disease}
          setDisease={setDisease}
          dbSymps={dbSymps}
          mode="create"
        />
      );
    } else if (step > 2 && step < finalStep) {
      return (
        <DiseaseDescs
          disease={disease}
          setDisease={setDisease}
          chosenSymp={chosenSymps[step - 3]}
          mode="create"
        />
      );
    } else {
      return (
        <DiseaseName
          disease={disease}
          setDisease={setDisease}
          dbSymps={dbSymps}
          mode="create"
        />
      );
    }
  }

  // handle next and prev button
  function handlePrev() {
    setStep((step) => step - 1);
  }
  function handleNext() {
    setStep((step) => step + 1);
  }

  function checkStep() {
    if (step === 1) {
      if (disease.ageRanges.length === 0) {
        window.alert("Please select age");
        return;
      }
      if (disease.genders.length === 0) {
        window.alert("Please select gender");
        return;
      }
    } else if (step === 2) {
      if (disease.symptomIds.length === 0) {
        window.alert("Please select at least 1 symptom");
        return;
      }
    } else if (step > 2 && step < finalStep) {
      const symptomId = disease.symptomIds[step - 3];
      if (!disease.descIds.some((desc) => desc.symptomId === symptomId)) {
        window.alert("Please add symptom's description");
        return;
      }
    }
    handleNext();
  }

  function confirmCancle(e) {
    if (window.confirm("Cancel creating symptom?")) {
      setDisease((prev) => ({
        ...prev,
        name: "",
        ageRanges: [],
        genders: [],
        symptomIds: [],
        descIds: [],
      }));
      navigate(-1);
    }
  }

  async function confirmCreate(e) {
    e.preventDefault();
    if (disease.name === "") {
      window.alert("Please enter disease name");
      return;
    } else if (disease.ageRanges.length === 0) {
      window.alert("Please select age");
      return;
    } else if (disease.genders.length === 0) {
      window.alert("Please select gender");
      return;
    } else if (disease.symptomIds.length === 0) {
      window.alert("Please select symptom");
      return;
    } else if (disease.descIds.length === 0) {
      window.alert("Please add symptom's description");
      return;
    }
    try {
      // Create disease
      await axios
        .post("http://localhost:5000/disease-temp/add", disease, apiConfig)
        .then((res) => {
          if (res.data && res.data.message === "Disease already exists") {
            throw new Error("Căn bệnh cùng tên đang được người khác thêm vào!");
          }
          console.log("Disease created", res.data);
        });
      // Create notification to admin
      const notif = {
        id: uuidv4(),
        fromInfos: {
          name: userInfos.fullName,
          role: userRole,
          medSpecialty: userInfos.medSpecialty,
          doctorID: userInfos.doctorID,
        },
        toDoctorID: ["ADMIN"],
        content: {
          type: "Tạo căn bệnh",
          detail: `Bác sĩ trưởng Khoa ${userInfos.medSpecialty} đã tạo căn bệnh ${disease.name}`,
          link: `/disease-temp/${disease.idTemp}/approve`,
        },
        timeSent: formattedTime,
        status: "Chưa xem",
      };
      await axios
        .post("http://localhost:5000/notification/add", notif, apiConfig)
        .then((res) => {
          console.log("Notification created", res.data);
        });
      // Set default and navigate
      setDisease((prev) => ({
        ...prev,
        name: "",
        ageRanges: [],
        genders: [],
        symptomIds: [],
        descIds: [],
      }));
      navigate(`/disease-table`);
    } catch (err) {
      const message = `Có lỗi xảy ra: ${err}`;
      window.alert(message);
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">Create disease</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>{StepDisplay()}</div>

            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                {step === 1 ? (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={(e) => confirmCancle(e)}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handlePrev}
                  >
                    Back
                  </button>
                )}
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    if (step === finalStep) {
                      confirmCreate(e);
                    } else {
                      checkStep(step);
                    }
                  }}
                >
                  {step === finalStep ? "Create" : "Next"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
