import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import SymptomForm from "components/SymptomChecker/SymptomForm/SymptomForm";
import ConfirmModal from "components/UI/ConfirmModal";

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
    axios
      .get(`${process.env.REACT_APP_API_URL}/symptom/${symptomId}`)
      .then((res) => {
        setSymptom(res.data);
      });
  }, [symptomId]);

  // Approve
  async function confirmApprove() {
    setIsClicked(true);
    if (
      symptom.status === "Awaiting Review" ||
      symptom.status === "Updated Revision" ||
      symptom.status === "Edit Requested"
    ) {
      try {
        // Update status symptom
        await axios
          .put(
            `${process.env.REACT_APP_API_URL}/symptom/update/${symptomId}`,
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
        `${process.env.REACT_APP_API_URL}/symptom/update/${symptomId}`,
        {
          status: "Edit Requested",
        },
        apiConfig
      );
    } catch (err) {
      console.log(`${err}`);
    }
    setTimeout(() => {
      toast.success("Requested successfully!");
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
        `${process.env.REACT_APP_API_URL}/symptom/delete/${symptomId}`,
        apiConfig
      );
    } catch (err) {
      console.log(`${err}`);
    }
    setTimeout(() => {
      toast.success("Deleted successfully!");
      setTimeout(() => {
        navigate("/symptom-table");
      }, 1200);
    }, 500);
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">Symptom approval</h3>
      <div className="container p-5">
        <div className="card border-0 box-shadow-6 p-5">
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
                        "Delete symptom",
                        "This action will permanently delete the symptom from the database. Would you like to proceed?"
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
              {userRole === "admin" && symptom.status !== "Edit Requested" && (
                <div className="c-2 d-grid gap-2">
                  <button
                    className="btn btn-warning"
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "edit",
                        "Request changes",
                        "Would you like to request content revisions for this symptom?"
                      )
                    }
                  >
                    Request changes
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
                        "Approval confirmation",
                        "The approved symptom will be added into the database. Would you like to perform this action?"
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
