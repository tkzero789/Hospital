import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ConfirmModal from "components/UI/ConfirmModal";

export default function ViewAppt() {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const { apptId } = useParams();

  const navigate = useNavigate();
  // Edit
  const [isEditable, setIsEditable] = useState(false);
  const [disableEdit, setDisableEdit] = useState(false);

  // State for pop-up modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [actionType, setActionType] = useState(null);
  const [statusType, setStatusType] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  // Show modal
  const handleShowModal = (event, actionType, statusType, title, body) => {
    event.preventDefault();
    setActionType(actionType);
    setStatusType(statusType);
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
      action = deleteAppt;
      break;
    case "accept":
      action = () => updateStatus(statusType);
      break;
    case "spam":
      action = () => updateStatus(statusType);
      break;
    case "decline":
      action = () => updateStatus(statusType);
      break;
    default:
      action = null;
  }

  // Text color based on status
  const [statusText, setStatusText] = useState(null);

  // Form
  const [formInputs, setFormInputs] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    need: "",
    date: "",
    reason: "",
    createdAt: null,
    status: "",
  });

  // Fetch data
  useEffect(() => {
    console.log(apptId);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/appointment/${apptId}`)
      .then((res) => {
        const formData = res.data;
        setFormInputs(formData);
        if (formData.status === "Accepted") {
          setStatusText("text-success");
        } else if (formData.status === "Reviewing") {
          setStatusText("text-primary");
        } else if (
          formData.status === "Declined" ||
          formData.status === "Spam"
        ) {
          setStatusText("text-danger");
        }
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [apptId, formInputs.status]);

  // Handle input change
  const handleInputChange = (event) => {
    let value = event.target.value;
    if (event.target.name === "dob") {
      value = formatDate(value);
    }
    setFormInputs({ ...formInputs, [event.target.name]: value });
  };

  // Uppdate appointment status
  function updateStatus(newStatus) {
    console.log(newStatus);
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/appointment/update/${apptId}`,
        {
          status: newStatus,
        },
        apiConfig
      )
      .then(() => {
        setIsClicked(true);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
    setFormInputs({ ...formInputs, status: newStatus });
    setTimeout(() => {
      if (newStatus === "Accepted") {
        toast.success("Accepted appointment!");
      } else if (newStatus === "Spam") {
        toast.error("Mark as Spam");
      } else {
        toast.error("Declined!");
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, 500);
  }

  // Edit appointment info
  function updateApptInfo(event) {
    event.preventDefault();
    setIsEditable((prevIsEditable) => {
      if (prevIsEditable) {
        axios
          .post(
            `${process.env.REACT_APP_API_BASE_URL}/appointment/edit/${apptId}`,
            formInputs,
            apiConfig
          )
          .then(() => {
            setDisableEdit(true);
            setTimeout(() => setDisableEdit(false), 1000);

            // Fetch the updated data
            axios
              .get(
                `${process.env.REACT_APP_API_BASE_URL}/appointment/${apptId}`
              )
              .then((res) => {
                setFormInputs(res.data);
              })
              .catch((err) => {
                const message = `Error: ${err}`;
                window.alert(message);
              });
          })
          .catch((err) => {
            const message = `Error: ${err}`;
            window.alert(message);
          });
      }
      return !prevIsEditable;
    });
    setTimeout(() => toast.success("Edited successfully!"), 1000);
  }

  // Format DOB
  function formatDate(dateString) {
    if (!dateString) {
      return "";
    }
    const [day, month, year] = dateString.split("/");
    if (day && month && year) {
      const formattedDay = day.padStart(2, "0");
      const formattedMonth = month.padStart(2, "0");
      return `${formattedDay}/${formattedMonth}/${year}`;
    } else {
      return dateString;
    }
  }

  // Delete Appointment
  async function deleteAppt() {
    axios
      .delete(
        `${process.env.REACT_APP_API_BASE_URL}/appointment/${apptId}`,
        apiConfig
      )
      .then(() => {
        setIsClicked(true);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
    setTimeout(() => {
      toast.success("Deleted successfully!");
      setTimeout(() => {
        navigate("/appointment-table");
      }, 1200);
    }, 500);
  }

  return (
    <div>
      <h3 className="container text-center text-dark-header pt-5">
        Appointment Detail
      </h3>
      <div className="container text-center pt-2">
        Status:{" "}
        <span className={`${statusText} fw-bold`}>{formInputs.status}</span>
      </div>
      <div className="container p-5">
        <div className="card border-0 box-shadow-6 p-5">
          <form>
            <div>
              <div className="form-group row pb-5">
                <h5 className="text-dark-header col-3">Name</h5>
                <input
                  type="text"
                  className="form-control border-secondary-subtle col"
                  name="fullName"
                  value={formInputs.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h5 className="text-dark-header col-3">Phone number</h5>
                <input
                  type="text"
                  className="form-control border-secondary-subtle col"
                  name="phoneNumber"
                  value={formInputs.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h5 className="text-dark-header col-3">Email</h5>
                <input
                  type="text"
                  className="form-control border-secondary-subtle col"
                  name="email"
                  value={formInputs.email}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h5 className="text-dark-header col-3">Date of birth</h5>
                <input
                  type="text"
                  className="form-control border-secondary-subtle col"
                  name="dob"
                  value={formatDate(formInputs.dob)}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h5 className="text-dark-header col-3">Gender</h5>
                <input
                  type="text"
                  className="form-control border-secondary-subtle col"
                  name="gender"
                  value={formInputs.gender}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h5 className="text-dark-header col-3">Service</h5>
                <select
                  className="form-control border-secondary-subtle col"
                  name="need"
                  value={formInputs.need}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                >
                  <option value="Primary care">Primary care</option>
                  <option value="Imaging">Imaging</option>
                  <option value="Senior care">Senior care</option>
                </select>
              </div>
              <div className="form-group row pb-5">
                <h5 className="text-dark-header col-3">Appointment date</h5>
                <input
                  type="text"
                  className="form-control border-secondary-subtle col"
                  name="date"
                  value={formInputs.date}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h5 className="text-dark-header col-3">Requested on</h5>
                <input
                  type="text"
                  className="form-control border-secondary-subtle col"
                  name="createdAt"
                  value={formInputs.createdAt}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h5 className="text-dark-header col-3">
                  Health issue description
                </h5>
                <textarea
                  className="form-control border-secondary-subtle col"
                  rows={5}
                  name="reason"
                  value={formInputs.reason}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
            </div>
            <div className="row py-3 justify-content-end">
              <div className="c-1 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={formInputs.status === "Declined"}
                  onClick={(event) =>
                    handleShowModal(
                      event,
                      "decline",
                      "Declined",
                      "Confirm action",
                      "Are you sure you want to decline this appointment?"
                    )
                  }
                >
                  Decline
                </button>
              </div>
              <div className="c-1 d-grid gap-2 me-auto">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={formInputs.status === "Spam"}
                  onClick={(event) =>
                    handleShowModal(
                      event,
                      "spam",
                      "Spam",
                      "Confirm action",
                      "Are you sure you want to mark this appointment as SPAM?"
                    )
                  }
                >
                  Spam
                </button>
              </div>
              {(formInputs.status === "Spam" ||
                formInputs.status === "Declined") && (
                <div className="c-2 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "delete",
                        null,
                        "Confirm delete",
                        "Are you sure you want to delete this appointment?"
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
              <div className="c-1 d-grid gap-2">
                <button
                  type="button"
                  className={`btn ${
                    isEditable ? "btn-outline-secondary" : "btn-warning"
                  }`}
                  disabled={isEditable || disableEdit}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditable(true);
                  }}
                >
                  Edit
                </button>
              </div>
              <div className="c-2 d-grid gap-2">
                <button
                  type="button"
                  className={`btn ${
                    !isEditable ? "btn-outline-secondary" : "btn-warning"
                  }`}
                  disabled={!isEditable || disableEdit}
                  onClick={(event) => updateApptInfo(event)}
                >
                  {disableEdit ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
              <div className="c-2 d-grid gap-2">
                <button
                  type="button"
                  className={`btn btn-success ${
                    isEditable === true || formInputs.status === "Accepted"
                      ? "hidden"
                      : ""
                  }`}
                  disabled={disableEdit}
                  onClick={(event) =>
                    handleShowModal(
                      event,
                      "accept",
                      "Accepted",
                      "Confirm acceptance",
                      "Are you sure you want to accept this appointment?"
                    )
                  }
                >
                  Accept
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
