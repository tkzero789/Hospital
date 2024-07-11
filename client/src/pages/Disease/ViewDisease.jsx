import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import DiseaseName from "components/Disease/DiseaseName";
import ConfirmModal from "components/UI/ConfirmModal";

export default function ViewDisease({ userRole, userInfos }) {
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
    case "approve":
      action = confirmApprove;
      break;
    case "edit":
      action = requestEdit;
      break;
    case "delete":
      action = confirmDelete;
      break;
    default:
      action = null;
  }

  const [disease, setDisease] = useState([]);
  const [dbSymps, setDbSymps] = useState([]);
  const { diseaseId } = useParams();
  const navigate = useNavigate();

  // get disease from DB by diseaseId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/${diseaseId}`)
      .then((res) => {
        console.log(res.data);
        const dbdisease = res.data;
        setDisease(dbdisease);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [diseaseId, navigate]);

  // get symptoms from DB
  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom`)
      .then((res) => {
        setDbSymps(res.data);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  // Approve
  async function confirmApprove() {
    setIsClicked(true);
    if (
      disease.status === "Awaiting Review" ||
      disease.status === "Updated Revision" ||
      disease.status === "Edit Requested"
    ) {
      try {
        // Update status symptom
        await axios
          .put(
            `http://localhost:5000/disease/update/${diseaseId}`,
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
        navigate("/disease-table");
      }, 1200);
    }, 500);
  }

  // Request edit
  async function requestEdit() {
    setIsClicked(true);
    try {
      axios.put(
        `http://localhost:5000/disease/update/${diseaseId}`,
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
        navigate("/disease-table");
      }, 1200);
    }, 500);
  }

  // delete disease
  async function confirmDelete() {
    setIsClicked(true);
    try {
      await axios.delete(
        `http://localhost:5000/disease/delete/${diseaseId}`,
        apiConfig
      );
    } catch (err) {
      console.log(`${err}`);
    }
    setTimeout(() => {
      toast.success("Deleted disease successfully!");
      setTimeout(() => {
        navigate("/disease-table");
      }, 1200);
    }, 500);
  }

  return (
    <div className="bg-gray-1">
      <h3 className="content-container text-center text-dark-header pt-5">
        View disease
      </h3>
      <div className="content-container py-5">
        <div className="card border-0 box-shadow-6 p-5">
          <form>
            <div>
              {
                <DiseaseName
                  disease={disease}
                  setDisease={setDisease}
                  dbSymps={dbSymps}
                  mode="view"
                />
              }
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              {userRole === "admin" && (
                <div className="c-2 d-grid gap-2 me-auto">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "delete",
                        "Delete disease",
                        "This action will permanently delete the disease from the database. Would you like to proceed?"
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
              <div className="c-2 d-grid gap-2">
                <NavLink
                  className="btn btn-primary"
                  to={`/disease/${diseaseId}/article-table`}
                >
                  Articles
                </NavLink>
              </div>
              {userInfos.doctorID === disease?.createInfos?.doctorID &&
                disease.status === "Edit Requested" && (
                  <div className="c-2 d-grid gap-2">
                    <NavLink
                      className="btn btn-warning"
                      to={`/disease/${diseaseId}/edit`}
                    >
                      Edit
                    </NavLink>
                  </div>
                )}
              {userRole === "admin" && disease.status !== "Edit Requested" && (
                <div className="c-2 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "edit",
                        "Request changes",
                        "Would you like to request content revisions for this disease?"
                      )
                    }
                  >
                    Request changes
                  </button>
                </div>
              )}
              {userRole === "admin" &&
                (disease.status === "Awaiting Review" ||
                  disease.status === "Updated Revision") && (
                  <div className="c-2 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={(event) =>
                        handleShowModal(
                          event,
                          "approve",
                          "Approval confirmation",
                          "The approved disease will be added into the database. Would you like to perform this action?"
                        )
                      }
                    >
                      Approve
                    </button>
                  </div>
                )}
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
