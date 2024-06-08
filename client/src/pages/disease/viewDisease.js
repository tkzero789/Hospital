import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import DiseaseName from "../../components/DiseaseParts/DiseaseName";
import { Toaster, toast } from "sonner";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

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
      .get("http://localhost:5000/symptom")
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
      disease.status === "Pending Create" ||
      disease.status === "Pending Update" ||
      disease.status === "Request Edit"
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
      toast.success("Delete disease successfully");
      setTimeout(() => {
        navigate("/disease-table");
      }, 1200);
    }, 500);
  }

  return (
    <div>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
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
                        "Confirm delete",
                        "Are you sure you want to delete this disease?"
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
                  className="btn btn-outline-primary"
                  to={`/disease/${diseaseId}/article-table`}
                >
                  Articles
                </NavLink>
              </div>
              {userInfos.doctorID === disease?.createInfos?.doctorID &&
                disease.status === "Request Edit" && (
                  <div className="c-2 d-grid gap-2">
                    <NavLink
                      className="btn btn-warning"
                      to={`/disease/${diseaseId}/edit`}
                    >
                      Edit
                    </NavLink>
                  </div>
                )}
              {userRole === "admin" && disease.status !== "Request Edit" && (
                <div className="c-2 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "edit",
                        "Confirm request edit",
                        "Are you sure you want to request edit this disease?"
                      )
                    }
                  >
                    Request edit
                  </button>
                </div>
              )}
              {userRole === "admin" &&
                (disease.status === "Pending Create" ||
                  disease.status === "Pending Update") && (
                  <div className="c-2 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={(event) =>
                        handleShowModal(
                          event,
                          "approve",
                          "Confirm approve",
                          "Are you sure you want to approve this disease?"
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
