import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import DiseaseAgeGen from "components/Disease/DiseaseAgeGen";
import DiseaseSymps from "components/Disease/DiseaseSymps";
import DiseaseDescs from "components/Disease/DiseaseDescs";
import DiseaseName from "components/Disease/DiseaseName";
import ConfirmModal from "components/UI/ConfirmModal";

export default function EditDisease({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  // State to keep track of checked symptoms
  const [checkedSymptoms, setCheckedSymptoms] = useState([]);

  // Function to update checked symptoms
  const updateCheckedSymptoms = (symptomId, isChecked) => {
    setCheckedSymptoms((prev) => {
      if (isChecked) {
        // Add symptomId if it's being checked and not already in the array
        return prev.includes(symptomId) ? prev : [...prev, symptomId];
      } else {
        // Remove symptomId if it's being unchecked
        return prev.filter((id) => id !== symptomId);
      }
    });
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
      timeEdited: formattedTime,
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
        setCheckedSymptoms(dbDisease.symptomIds);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [diseaseId, navigate]);

  // Fetch data
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

  // Chosen symptoms
  useEffect(() => {
    // Map over checkedSymptoms to preserve the order
    const orderedChosenSymps = checkedSymptoms
      .map((symptomId) => dbSymps.find((symptom) => symptom.id === symptomId))
      .filter((symptom) => symptom !== undefined); // Filter out any undefined values in case a symptomId doesn't match

    setChosenSymps(orderedChosenSymps);
    console.log(orderedChosenSymps);
  }, [checkedSymptoms, dbSymps]);

  // Set step
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
          updateCheckedSymptoms={updateCheckedSymptoms}
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
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };
  const handleNext = () => {
    setStep((step) => step + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
    let isSuccessful = false;

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
          isSuccessful = true;
        });
    } catch (err) {
      const message = `Error: ${err}`;
      window.alert(message);
      return;
    }

    if (isSuccessful) {
      setIsClicked(true);
      setTimeout(() => {
        toast.success("Edited successfully!");
        setTimeout(() => {
          navigate("/disease-table");
        }, 1200);
      }, 500);
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">Edit disease</h3>
      <div className="container p-5">
        <div className="card p-5">
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
