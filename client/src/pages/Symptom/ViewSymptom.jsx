import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import SymptomForm from "components/SymptomChecker/SymptomForm/SymptomForm";
import ConfirmModal from "components/UI/ConfirmModal";

export default function ViewSymptom({ userRole, userInfos }) {
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
    case "delete":
      action = confirmDelete;
      break;
    case "edit":
      action = requestEdit;
      break;
    default:
      action = null;
  }

  const [symptom, setSymptom] = useState({
    id: "",
    name: "",
    categories: [
      {
        id: "",
        categoryName: "Position",
        descriptions: [
          {
            id: "",
            descriptionDetail: "",
          },
        ],
      },
    ],
    diseaseUsedIds: [],
    createInfos: {
      doctorCreated: "",
      doctorID: "",
      timeCreated: "",
      timeEdited: "",
    },
    status: "",
  });
  const { symptomId } = useParams();
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom/${symptomId}`)
      .then((res) => {
        const dbsymptom = res.data;
        console.log(dbsymptom);
        if (!dbsymptom) {
          const id = symptomId;
          window.alert(`Symptom with id ${id} not found`);
          navigate("/symptom-table");
          return;
        }
        setSymptom(dbsymptom);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [symptomId, navigate]);

  // Request edit
  async function requestEdit() {
    setIsClicked(true);
    try {
      axios.put(
        `http://localhost:5000/symptom/update/${symptomId}`,
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
        `http://localhost:5000/symptom/delete/${symptomId}`,
        apiConfig
      );
    } catch (err) {
      console.log(`${err}`);
    }
    setTimeout(() => {
      toast.success("Deleted symptom successfully!");
      setTimeout(() => {
        navigate("/symptom-table");
      }, 1200);
    }, 500);
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">View symptom</h3>
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
              {userRole === "admin" && (
                <div className="c-2 d-grid gap-2 me-auto">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "delete",
                        "Delete symptom",
                        "This action will permanently delete the symptom from the database. Would you like to perform this action?"
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
              {userRole === "admin" && symptom.status === "Approved" && (
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
              {userRole === "head-doctor" &&
                userInfos.doctorID === symptom?.createInfos?.doctorID &&
                symptom.status === "Edit Requested" && (
                  <div className="c-2 d-grid gap-2">
                    <NavLink
                      className="btn btn-warning"
                      to={`/symptom/${symptomId}/edit`}
                    >
                      Edit
                    </NavLink>
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
