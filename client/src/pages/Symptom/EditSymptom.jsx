import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import ConfirmModal from "components/UI/ConfirmModal";
import SymptomForm from "components/SymptomChecker/SymptomForm/SymptomForm";

export default function EditSymptom({ userRole, userInfos }) {
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
    case "cancel":
      action = confirmCancel;
      break;
    default:
      action = null;
  }
  const now = new Date();

  const [symptom, setSymptom] = useState({
    id: "",
    name: "",
    categories: [
      {
        id: "",
        categoryName: "",
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
      doctorId: "",
      timeCreated: "",
      timeEdited: now,
    },
    status: "",
  });

  const { symptomId } = useParams();
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/symptom/${symptomId}`)
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

  // Confirm edit
  async function confirmEdit() {
    setIsClicked(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/symptom/edit/${symptom.id}`,
        { ...symptom, status: "Updated Revision" },
        apiConfig
      );
      if (response.data.message === "Symptom updated successfully!") {
        setTimeout(() => {
          toast.success("Submitted revisions successfully!");
          setTimeout(() => {
            navigate("/symptom-table");
          }, 1200);
        }, 500);
      }
    } catch (err) {
      window.alert(`Error: ${err}`);
    }
  }

  // Cancel
  function confirmCancel() {
    navigate("/symptom-table");
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">Edit symptom</h3>
      <div className="container p-5">
        <div className="card border-0 box-shadow-6 p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                setSymptom={setSymptom}
                mode="doctor edit"
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
                      "Cancel symptom editing",
                      "Would you like to perform this action?"
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
                      "edit",
                      "Review and submit revisions",
                      "Once confirmed, your revisions will be submitted and will go through a review process. Would you like to proceed?"
                    )
                  }
                >
                  Submit revisions
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
