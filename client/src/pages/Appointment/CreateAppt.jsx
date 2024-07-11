import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import ApptForm from "components/Appt/ApptForm";
import ApptSuccessMsg from "components/Appt/ApptSuccessMsg";
import Footer from "components/HomePage/Footer/Footer";
import ApptOtp from "components/Appt/ApptOtp";
import "components/Appt/Appt.scss";

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
        `https://bayside-render-server.onrender.com/appointment/add`,
        updatedAppt
      )
      .then((res) => {
        if (res.data && res.data.message === "Phone number spamming") {
          throw new Error(
            toast.error(
              "The phone number has been marked as spam. If this is a mistake, please contact our customer service to resolve the issue"
            )
          );
        }
        if (res.data && res.data.message === "Phone number pending") {
          throw new Error(
            toast.error(
              "The phone number has requested an appointment. Please wait for our customer service to contact you for confirmation"
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
  }

  // Check for existed phone number
  async function checkPhoneNumber() {
    const phoneNumber = appt.phoneNumber;
    await axios
      .post(`https://bayside-render-server.onrender.com/check-phone-number`, {
        phoneNumber,
      })
      .then((res) => {
        if (res.data && res.data.message === "Phone number spamming") {
          throw new Error(
            toast.error(
              "The phone number has been marked as spam. If this is a mistake, please contact our customer service to resolve the issue"
            )
          );
        }
        if (res.data && res.data.message === "Phone number pending") {
          throw new Error(
            toast.error(
              "The phone number has requested an appointment. Please wait for our customer service to contact you for confirmation"
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
