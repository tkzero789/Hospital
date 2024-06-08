import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import DiseaseAgeGen from "../../components/DiseaseParts/DiseaseAgeGen";
import DiseaseSymps from "../../components/DiseaseParts/DiseaseSymps";
import DiseaseDescs from "../../components/DiseaseParts/DiseaseDescs";
import DiseaseName from "../../components/DiseaseParts/DiseaseName";
import { Toaster, toast } from "sonner";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

export default function EditDisease({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  // State for pop-up modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [actionType, setActionType] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  // Show modal
  const handleShowModal = (event, actionType, title, body) => {
    event.preventDefault();
    setActionType(actionType);
    setModalContent({ title, body });
    setShowModal(true);
  };

  // Hide modal
  const handleHideModal = () => {
    setActionType(null);
    setModalContent({ title: "", body: "" });
    setShowModal(false);
  };

  let action;
  switch (actionType) {
    case "edit":
      action = confirmEdit;
      break;
    default:
      action = null;
  }

  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [disease, setDisease] = useState({
    id: "",
    name: "",
    ageRanges: [],
    genders: [],
    symptomIds: [],
    descIds: [],
    medSpecialty: "",
    relatedArticles: [],
    createInfos: {
      doctorCreated: "",
      doctorId: "",
      timeCreated: "",
      timeEdited: "",
    },
    status: "",
  });
  const [dbSymps, setDbSymps] = useState([]);
  const [chosenSymps, setChosenSymps] = useState([]);
  // store original name to check duplicate if changing the name
  const [origName, setOrigName] = useState("");
  // set form steps
  const [step, setStep] = useState(1);
  const [finalStep, setFinalStep] = useState(3);
  const { diseaseId } = useParams();
  const navigate = useNavigate();

  // Fetch disease data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/${diseaseId}`)
      .then((res) => {
        const dbDisease = res.data;
        if (!dbDisease) {
          window.alert(`Can't find disease with this id ${diseaseId}`);
          navigate("/disease-table");
          return;
        }
        if (dbDisease.createInfos.doctorID !== userInfos.doctorID) {
          window.alert("Only doctor can edit disease");
          navigate("/disease-table");
          return;
        }
        setDisease({
          ...dbDisease,
          createInfos: {
            ...dbDisease.createInfos,
            timeEdited: formattedTime,
          },
          status: "Pending Update",
          doctorReqID: userInfos.doctorID,
        });
        setOrigName(dbDisease.name);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [diseaseId, navigate]);

  // Fetch symptoms data
  useEffect(() => {
    axios
      .get("http://localhost:5000/symptom")
      .then((res) => {
        setDbSymps(res.data);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  // Filter symptoms
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
          mode="edit"
        />
      );
    } else if (step > 2 && step < finalStep) {
      return (
        <DiseaseDescs
          disease={disease}
          setDisease={setDisease}
          chosenSymp={chosenSymps[step - 3]}
          mode="edit"
        />
      );
    } else {
      return (
        <DiseaseName
          disease={disease}
          setDisease={setDisease}
          dbSymps={dbSymps}
          mode="edit"
        />
      );
    }
  }

  // handle next and prev button
  const handlePrev = () => {
    setStep((step) => step - 1);
  };
  const handleNext = () => {
    setStep((step) => step + 1);
  };

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
        window.alert("Please select symptom");
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

  // Cancel
  function confirmCancel() {
    navigate("/disease-table");
  }

  // Confirm edit
  async function confirmEdit() {
    setIsClicked(true);
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
      if (origName !== disease.name) {
        await axios
          .get(`http://localhost:5000/disease/${disease.name}`)
          .then((res) => {
            if (res.data) {
              throw new Error("Duplicated disease name!");
            }
          });
      }
      // Edit disease
      await axios
        .put(
          `http://localhost:5000/disease/edit/${diseaseId}`,
          disease,
          apiConfig
        )
        .then((res) => {
          if (res.data && res.data.message === "Disease already exists") {
            throw new Error("Waiting for approval");
          }
          console.log("Symptom edited", res.data);
        });
    } catch (err) {
      const message = `Error: ${err}`;
      window.alert(message);
    }
    setTimeout(() => {
      toast.success("Edited successfully!");
      setTimeout(() => {
        navigate("/disease-table");
      }, 1200);
    }, 500);
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">Edit disease</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>{StepDisplay()}</div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="c-2 d-grid gap-2">
                {step === 1 ? (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={confirmCancel}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handlePrev}
                  >
                    Back
                  </button>
                )}
              </div>
              <div className="c-2 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(event) => {
                    if (step === finalStep) {
                      handleShowModal(
                        event,
                        "edit",
                        "Confirm edit",
                        "Are you sure you want to edit this disease?"
                      );
                    } else {
                      checkStep(step);
                    }
                  }}
                >
                  {step === finalStep ? "Confirm edit" : "Next"}
                </button>
              </div>
            </div>
          </form>
          <Toaster
            toastOptions={{
              className: "toast-noti",
            }}
            position="top-right"
            richColors
          />
          <ConfirmModal
            title={modalContent.title}
            body={modalContent.body}
            show={showModal}
            hide={handleHideModal}
            action={action}
            isClicked={isClicked}
          />
        </div>
      </div>
    </div>
  );
}
