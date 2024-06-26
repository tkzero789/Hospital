import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "sonner";
import axios from "axios";
import SymptomForm from "components/SymptomChecker/SymptomForm/SymptomForm";
import ConfirmModal from "components/UI/ConfirmModal";

export default function CreateSymptom({ userRole, userInfos }) {
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
    case "create":
      action = confirmCreate;
      break;
    case "cancel":
      action = confirmCancel;
      break;
    default:
      action = null;
  }

  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getMonth() + 1).padStart(2, "0")}/${String(
    now.getDate()
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [symptom, setSymptom] = useState({
    id: uuidv4(),
    name: "",
    position: "Head",
    categories: [
      {
        id: uuidv4(),
        categoryName: "",
        descriptions: [
          {
            id: uuidv4(),
            descriptionDetail: "",
          },
        ],
      },
    ],
    createInfos: {
      doctorCreated: userInfos.fullName,
      doctorID: userInfos.doctorID,
      timeCreated: formattedTime,
      timeEdited: null,
    },
    status: "Pending Create",
    doctorReqID: userInfos.doctorID,
  });

  const navigate = useNavigate();

  // Cancel
  function confirmCancel() {
    navigate("/symptom-table");
  }

  // Create
  async function confirmCreate() {
    let isSuccessful = false;

    if (symptom.name === "") {
      toast.error("Please enter symptom name");
      return;
    } else if (symptom.categories.length === 0) {
      toast.error("Please enter symptom's property(ies)");
      return;
    } else
      for (const cat of symptom.categories) {
        for (const des of cat.descriptions) {
          if (des.descriptionDetail === "") {
            toast.error("Please add symptom's description(s)");
            return;
          }
        }
      }
    try {
      // Create new symptom
      const updatedSymptom = { ...symptom };
      await axios
        .post("http://localhost:5000/symptom/add", updatedSymptom, apiConfig)
        .then((res) => {
          if (res.data && res.data.message === "Symptom already exists") {
            throw new Error("Duplicated symptom!");
          }
          console.log("Symptom created", res.data);
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
        toast.success("Created symptom successfully!");
        setTimeout(() => {
          navigate("/symptom-table");
        }, 1200);
      }, 500);
    }
  }

  return (
    <div>
      <h3 className="container text-center text-dark-header pt-5">
        Create symptom
      </h3>
      <div className="container p-5">
        <div className="card   p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                setSymptom={setSymptom}
                mode="create"
                origCats={[]}
                origDescs={[]}
              />
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="c-2 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={(event) =>
                    handleShowModal(
                      event,
                      "cancel",
                      "Warning: cancel creating symtom",
                      "Are you sure you want to perform this action?"
                    )
                  }
                >
                  Cancel
                </button>
              </div>
              <div className="c-2 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(event) =>
                    handleShowModal(
                      event,
                      "create",
                      "Confirm create",
                      "Are you sure you want to create this symptom?"
                    )
                  }
                >
                  Create
                </button>
              </div>
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
          </form>
        </div>
      </div>
    </div>
  );
}
