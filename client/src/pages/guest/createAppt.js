import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ApptForm from "../../components/ApptParts/ApptForm";
import ApptSuccessMsg from "../../components/ApptParts/ApptSuccessMsg";
import Footer from "../../components/ForPages/Footer";
import ApptOtp from "../../components/ApptParts/ApptOtp";

export default function CreateAppt() {
  const [isOtpConfirmed, setIsOtpConfirmed] = useState(false);
  const [show, setShow] = useState(false);

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
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);

  function sendOTP(e) {
    e.preventDefault();
    // Mock sending OTP
    console.log("OTP sent");
    window.alert("Đã gửi mã xác thực, vui lòng kiểm tra tin nhắn");
  }

  async function confirmSetAppt(e) {
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
        setAppt(updatedAppt);
        setShow(true);
        console.log(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="appt-req-body">
      {!isOtpConfirmed && (
        <ApptForm
          appt={appt}
          setAppt={setAppt}
          showModal={showModal}
          setShowModal={setShowModal}
          editMode={true}
          closeModal={closeModal}
          confirmSetAppt={confirmSetAppt}
          otp={otp}
          setOtp={setOtp}
          sendOTP={sendOTP}
        />
      )}

      {show && (
        <ApptOtp
          setIsOtpConfirmed={setIsOtpConfirmed}
          show={show}
          setShow={setShow}
        />
      )}

      {isOtpConfirmed && <ApptSuccessMsg />}

      <Footer />
    </div>
  );
}
