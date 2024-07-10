import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { MuiOtpInput } from "mui-one-time-password-input";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "components/Appt/Appt.scss";

const ApptOtp = ({ show, setShow, confirmSetAppt, isSubmit }) => {
  const [otp, setOtp] = useState("");

  const handleClose = () => {
    setShow(false);
  };

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
        <Modal.Header closeButton className="border border-bottom-0">
          <Modal.Title>Enter your One-time password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="otp-input">
          <MuiOtpInput
            type="number"
            value={otp}
            onChange={handleOtpChange}
            TextFieldsProps={{ size: "medium" }}
            length={6}
            gap={2}
          />
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            disabled={isSubmit}
          >
            Cancel
          </Button>
          <Button
            className={`btn ${
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
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApptOtp;
