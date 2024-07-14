import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { MuiOtpInput } from "mui-one-time-password-input";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "components/Appointment/Appt.scss";

const ApptOtp = ({ show, setShow, confirmSetAppt, isSubmit }) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (newValue) => {
    if (/^\d*$/.test(newValue) && newValue.length <= 6) {
      setOtp(newValue);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={true}
        backdrop="static"
        centered
      >
        <Modal.Header className="d-block text-center border border-bottom-0">
          <Modal.Title>
            <div className="text-blue-1 fs-56">
              <i className="bi bi-send-check"></i>
            </div>
            Verify your code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="otp-input pt-0">
          <div className="text-center pb-4 text-secondary-1">
            A code has been sent to your phone number
          </div>
          <MuiOtpInput
            type="number"
            value={otp}
            onChange={handleOtpChange}
            TextFieldsProps={{ size: "medium" }}
            length={6}
            gap={2}
          />
        </Modal.Body>
        <Modal.Footer className="border-top-0 pb-3">
          <Button
            className={`btn w-75 mx-auto ${
              otp.length === 6 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={confirmSetAppt}
            disabled={otp.length < 6 || isSubmit}
          >
            {isSubmit ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={24} style={{ color: "white" }} />
              </Box>
            ) : (
              "Verify OTP"
            )}
          </Button>
          <div className="mx-auto pt-3 pb-2 text-secondary-1">
            Didn't get the code?{" "}
            <span className="text-blue-4 fw-med">Resend</span>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApptOtp;
