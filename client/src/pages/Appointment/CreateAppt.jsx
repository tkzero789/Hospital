import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import ApptForm from "components/Appointment/ApptForm";
import ApptSuccessMsg from "components/Appointment/ApptSuccessMsg";
import Footer from "components/HomePage/Footer/Footer";
import ApptOtp from "components/Appointment/ApptOtp";
import "components/Appointment/Appt.scss";

export default function CreateAppt() {
  const [isOtpConfirmed, setIsOtpConfirmed] = useState(false);
  const [show, setShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

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
    status: "Reviewing",
  });
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);

  function sendOTP(e) {
    e.preventDefault();
    // Mock sending OTP
    console.log("OTP sent");
  }

  // Add the appointment
  async function confirmSetAppt(e) {
    e.preventDefault();
    setIsSubmit(true);
    const updatedAppt = {
      ...appt,
      createdAt: new Date(),
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/appointment/add`,
        updatedAppt
      )
      .then((res) => {
        if (res.data && res.data.message === "Phone number spamming") {
          throw new Error(
            toast.error(
              "The phone number has been marked as spam. Please contact our customer service to resolve the issue"
            )
          );
        }
        if (res.data && res.data.message === "Phone number pending") {
          throw new Error(
            toast.error(
              "This number has an appointment pending. Confirmation call coming"
            )
          );
        }
        setAppt(updatedAppt);
        setTimeout(() => {
          setShow(false);
          setIsOtpConfirmed(true);
        }, 1500);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        console.log(message);
      });
    window.scrollTo({ top: 0, left: 0 });
  }

  // Check for existed phone number
  async function checkPhoneNumber() {
    const phoneNumber = appt.phoneNumber;
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/check-phone-number`, {
        phoneNumber,
      })
      .then((res) => {
        if (res.data && res.data.message === "Phone number spamming") {
          throw new Error(
            toast.error(
              "The phone number has been marked as spam. Please contact our customer service to resolve the issue"
            )
          );
        }
        if (res.data && res.data.message === "Phone number pending") {
          throw new Error(
            toast.error(
              "This number has an appointment pending. Confirmation call coming"
            )
          );
        }
        setShow(true);
      })
      .catch((err) => {
        const message = `Error occurred: ${err}`;
        console.log(message);
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
          otp={otp}
          setOtp={setOtp}
          sendOTP={sendOTP}
          checkPhoneNumber={checkPhoneNumber}
        />
      )}

      {show && (
        <ApptOtp
          show={show}
          setShow={setShow}
          confirmSetAppt={confirmSetAppt}
          isSubmit={isSubmit}
        />
      )}

      {isOtpConfirmed && <ApptSuccessMsg />}

      <Footer />
    </div>
  );
}
