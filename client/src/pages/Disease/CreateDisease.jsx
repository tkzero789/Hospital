import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "sonner";
import axios from "axios";
import DiseaseAgeGen from "components/Disease/DiseaseAgeGen";
import DiseaseSymps from "components/Disease/DiseaseSymps";
import DiseaseDescs from "components/Disease/DiseaseDescs";
import DiseaseName from "components/Disease/DiseaseName";
import ConfirmModal from "components/UI/ConfirmModal";

export default function CreateDisease({ userRole, userInfos }) {
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
    case "create":
      action = confirmCreate;
      break;
    case "cancel":
      action = confirmCancel;
      break;
    default:
      action = null;
  }

  // Format date
  const now = new Date();

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
      timeCreated: now,
      timeEdited: null,
    },
    status: "Awaiting Review",
    doctorReqID: userInfos.doctorReqID,
  });
  const [dbSymps, setDbSymps] = useState([]);
  const [chosenSymps, setChosenSymps] = useState([]);
  // Set form steps
  const [step, setStep] = useState(1);
  const [finalStep, setFinalStep] = useState(3);
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    axios
      .get(`https://bayside-render-server.onrender.com/symptom`)
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
  }, [checkedSymptoms, dbSymps]);

  // Set step
  useEffect(() => {
    setFinalStep(3 + chosenSymps.length);
  }, [chosenSymps]);

  // Display components step by step
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
          checkedSymptoms={checkedSymptoms}
          mode="create"
        />
      );
    }
  }

  // Handle next and prev button
  function handlePrev() {
    setStep((step) => step - 1);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
  function handleNext() {
    setStep((step) => step + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  // Check
  function checkStep() {
    if (step === 1) {
      if (disease.ageRanges.length === 0) {
        toast.error("Please select age");
        return;
      }
      if (disease.genders.length === 0) {
        toast.error("Please select gender");
        return;
      }
    } else if (step === 2) {
      if (disease.symptomIds.length === 0) {
        toast.error("Please select at least one symptom");
        return;
      }
    } else if (step > 2 && step < finalStep) {
      const symptomId = disease.symptomIds[step - 3];
      if (!disease.descIds.some((desc) => desc.symptomId === symptomId)) {
        toast.error("Please select at least one description");
        return;
      }
    }
    handleNext();
  }

  // Cancel
  function confirmCancel() {
    navigate("/disease-table");
  }

  // Create disease
  async function confirmCreate() {
    let isSuccessful = false;

    if (disease.name === "") {
      toast.error("Please enter disease name");
      return;
    } else if (disease.ageRanges.length === 0) {
      toast.error("Please select age");
      return;
    } else if (disease.genders.length === 0) {
      toast.error("Please select gender");
      return;
    } else if (disease.symptomIds.length === 0) {
      toast.error("Please select symptom");
      return;
    } else if (disease.descIds.length === 0) {
      toast.error("Please add symptom's description");
      return;
    }
    try {
      // Create disease
      await axios
        .post(
          `https://bayside-render-server.onrender.com/disease/add`,
          disease,
          apiConfig
        )
        .then((res) => {
          if (res.data && res.data.message === "Disease already exists") {
            throw new Error("Duplicated disease!");
          }
          console.log("Disease created", res.data);
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
        toast.success("Created successfully!");
        setTimeout(() => {
          navigate("/disease-table");
        }, 1200);
      }, 500);
    }
  }

  return (
    <div>
      <h3 className="container text-center text-dark-header pt-5">
        Create disease
      </h3>
      <div className="container p-5">
        <div className="card border-0 box-shadow-6 p-5">
          <form>
            <div>{StepDisplay()}</div>

            <div className="row pt-3 pb-3 justify-content-end">
              <div className="c-2 d-grid gap-2">
                {step === 1 ? (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "cancel",
                        "Cancel disease creation",
                        "Would you like to perform this action?"
                      )
                    }
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
                        "create",
                        "Create new disease",
                        "Once confirmed, your submission will go through a review process. Would you like to perform this action?"
                      );
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
