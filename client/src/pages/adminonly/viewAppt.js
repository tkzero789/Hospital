import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function ViewAppt() {
  const [isEditable, setIsEditable] = useState(false);
  const [disableEdit, setDisableEdit] = useState(false);

  const { apptId } = useParams();

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

  useEffect(() => {
    console.log(apptId);
    axios
      .get(`http://localhost:5000/appointment/${apptId}`)
      .then((res) => {
        setFormInputs(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [apptId]);

  // Handle input change
  const handleInputChange = (event) => {
    let value = event.target.value;
    if (event.target.name === "dob") {
      value = formatDate(value);
    }
    setFormInputs({ ...formInputs, [event.target.name]: value });
  };

  // Handle DOB change

  // Uppdate appointment status
  function updateStatus(newStatus) {
    console.log(newStatus);
    axios
      .post(`http://localhost:5000/appointment/update/${apptId}`, {
        status: newStatus,
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    setFormInputs({ ...formInputs, status: newStatus });
  }

  // Edit appointment info
  function updateApptInfo(event) {
    event.preventDefault();
    setIsEditable((prevIsEditable) => {
      if (prevIsEditable) {
        axios
          .post(`http://localhost:5000/appointment/edit/${apptId}`, formInputs)
          .then((res) => {
            console.log(res);
            setDisableEdit(true);
            setTimeout(() => setDisableEdit(false), 2500); // Enable the button after 2.5 seconds

            // Fetch the updated data
            axios
              .get(`http://localhost:5000/appointment/${apptId}`)
              .then((res) => {
                setFormInputs(res.data);
              })
              .catch((err) => {
                const message = `Có lỗi xảy ra: ${err}`;
                window.alert(message);
              });
          })
          .catch((err) => {
            const message = `Có lỗi xảy ra: ${err}`;
            window.alert(message);
          });
      }
      return !prevIsEditable;
    });
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

  return (
    <div>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Họ tên</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="fullName"
                  value={formInputs.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">SĐT</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="phoneNumber"
                  value={formInputs.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Email</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="email"
                  value={formInputs.email}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Ngày sinh</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="dob"
                  value={formatDate(formInputs.dob)}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Giới tính</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="gender"
                  value={formInputs.gender}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Nhu cầu khám</h4>
                <select
                  className="form-control border-primary-subtle col"
                  name="need"
                  value={formInputs.need}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                >
                  <option value="Khám chuyên khoa">Khám chuyên khoa</option>
                  <option value="Kiểm tra sức khoẻ tổng quát">
                    Kiểm tra sức khoẻ tổng quát
                  </option>
                  <option value="Xét nghiệm, chẩn đoán hình ảnh">
                    Xét nghiệm, chẩn đoán hình ảnh
                  </option>
                </select>
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Ngày hẹn khám</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="date"
                  value={formInputs.date}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Ngày khởi tạo</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="createdAt"
                  value={formInputs.createdAt}
                  readOnly
                />
              </div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">Mô tả vấn đề</h4>
                <textarea
                  className="form-control border-primary-subtle col"
                  rows={5}
                  name="reason"
                  value={formInputs.reason}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  readOnly={!isEditable}
                />
              </div>
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="c-2 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-secondary"
                  to={`/appointment-table`}
                >
                  Quay lại
                </NavLink>
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
                  onClick={() => updateStatus("Accepted")}
                >
                  Chấp nhận
                </button>
              </div>
              <div className="c-2 d-grid gap-2">
                <button
                  type="button"
                  className={`btn ${
                    isEditable ? "btn-outline-warning" : "btn-warning"
                  }`}
                  disabled={isEditable || disableEdit}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditable(true);
                  }}
                >
                  Chỉnh sửa
                </button>
              </div>
              <div className="c-2 d-grid gap-2">
                <button
                  type="button"
                  className={`btn ${
                    !isEditable ? "btn-outline-warning" : "btn-warning"
                  }`}
                  disabled={!isEditable || disableEdit}
                  onClick={(event) => updateApptInfo(event)}
                >
                  {disableEdit ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    "Xác nhận chỉnh sửa"
                  )}
                </button>
              </div>
              <div className="c-2 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={formInputs.status === "Declined"}
                  onClick={() => updateStatus("Declined")}
                >
                  Từ chối
                </button>
              </div>
              <div className="c-2 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={formInputs.status === "Spam"}
                  onClick={() => updateStatus("Spam")}
                >
                  Đánh dấu spam
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
