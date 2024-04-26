import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import ApptForm from "../../components/ApptParts/ApptForm";
import Footer from "../../components/ForPages/Footer";

export default function CreateAppt() {
  const [appt, setAppt] = useState({
    id: uuidv4(),
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    need: "",
    date: "",
    reason: "",
    createdAt: null,
    status: "Pending",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  async function confirmSetAppt(e) {
    const inputFullName = document.getElementById("inputFullName");
    const inputPhoneNumber = document.getElementById("inputPhoneNumber");
    const inputEmail = document.getElementById("inputEmail");
    if (!inputFullName.checkValidity()) {
      alert("Thiếu Họ và tên");
    } else if (appt.phoneNumber === "") {
      alert("Số điện thoại không hợp lệ");
    } else if (!inputPhoneNumber.checkValidity()) {
      alert("Số điện thoại không hợp lệ");
    } else if (!inputEmail.checkValidity()) {
      alert("Email không hợp lệ");
    } else if (appt.gender === "") {
      alert("Vui lòng chọn giới tính");
    } else if (appt.need === "") {
      alert("Vui lòng chọn Nhu cầu khám");
    } else {
      e.preventDefault();
      const updatedAppt = {
        ...appt,
        createdAt: new Date().toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      };

      axios
        .post("http://localhost:5000/appointment/add", updatedAppt)
        .then((res) => {
          console.log("Appointment set", res.data);
          setAppt({
            fullName: "",
            phoneNumber: "",
            email: "",
            dob: "",
            gender: "",
            need: "",
            date: "",
            reason: "",
            createdAt: null,
          });
          navigate("/");
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="appt-req-body">
      <ApptForm
        appt={appt}
        setAppt={setAppt}
        showModal={showModal}
        setShowModal={setShowModal}
        editMode={true}
      />
      <div className="appt-modal-btn">
        <button type="button" onClick={closeModal}>
          Quay lại
        </button>
        <button type="button" onClick={confirmSetAppt}>
          Đăng ký khám
        </button>{" "}
      </div>
      <Footer />
    </div>
  );
}
