import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import SymptomForm from "components/SymptomChecker/SymptomForm/SymptomForm";
import ConfirmModal from "components/UI/ConfirmModal/ConfirmModal";

export default function ApproveSymptom({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  const { symptomId } = useParams();

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
    case "delete":
      action = confirmDelete;
      break;
    case "edit":
      action = requestEdit;
      break;
    case "approve":
      action = confirmApprove;
      break;
    default:
      action = null;
  }

  const navigate = useNavigate();

  const [symptom, setSymptom] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/symptom/${symptomId}`).then((res) => {
      setSymptom(res.data);
    });
  }, [symptomId]);

  // Approve
  async function confirmApprove() {
    setIsClicked(true);
    if (
      symptom.status === "Pending Create" ||
      symptom.status === "Pending Update" ||
      symptom.status === "Request Edit"
    ) {
      try {
        // Update status symptom
        await axios
          .put(
            `http://localhost:5000/symptom/update/${symptomId}`,
            {
              status: "Approved",
            },
            apiConfig
          )
          .then((res) => {
            if (res.data && res.data.message === "Symptom already exists") {
              throw new Error("Duplicated symptom!");
            }
            console.log("Symptom created", res.data);
          });
      } catch (err) {
        const message = `Error: ${err}`;
        window.alert(message);
      }
    }
    setTimeout(() => {
      toast.success("Approved!");
      setTimeout(() => {
        navigate("/symptom-table");
      }, 1200);
    }, 500);
  }

  // Request edit
  async function requestEdit() {
    setIsClicked(true);
    try {
      axios.put(
        `http://localhost:5000/symptom/update/${symptomId}`,
        {
          status: "Request Edit",
        },
        apiConfig
      );
    } catch (err) {
      console.log(`${err}`);
    }
    setTimeout(() => {
      toast.success("Request edit successfully");
      setTimeout(() => {
        navigate("/symptom-table");
      }, 1200);
    }, 500);
  }

  // Delete
  async function confirmDelete() {
    setIsClicked(true);
    try {
      await axios.delete(
        `http://localhost:5000/symptom/delete/${symptomId}`,
        apiConfig
      );
    } catch (err) {
      console.log(`${err}`);
    }
    setTimeout(() => {
      toast.success("Delete successfully");
      setTimeout(() => {
        navigate("/symptom-table");
      }, 1200);
    }, 500);
  }

  return (
    <div>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                mode="view"
                origCats={[]}
                origDescs={[]}
              />
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              {(userRole === "admin" ||
                userInfos.doctorID === symptom.createInfos.doctorID) && (
                <div className="c-2 d-grid gap-2 me-auto">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "delete",
                        "Confirm delete",
                        "Are you sure you want to delete?"
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
              <div className="c-2 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </button>
              </div>
              {userRole === "admin" && symptom.status !== "Request Edit" && (
                <div className="c-2 d-grid gap-2">
                  <button
                    className="btn btn-warning"
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "edit",
                        "Confirm request edit",
                        "Are you sure you want to request edit?"
                      )
                    }
                  >
                    Request edit
                  </button>
                </div>
              )}
              {userRole === "admin" && (
                <div className="c-2 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "approve",
                        "Confirm approve",
                        "Are you sure you want to approve this symptom?"
                      )
                    }
                  >
                    Approve
                  </button>
                </div>
              )}
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
