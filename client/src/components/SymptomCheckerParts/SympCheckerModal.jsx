import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function SympCheckerModal() {
  const [show, setShow] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleClose = () => setShow(false);
  const handleCheck = () => setIsChecked(!isChecked);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header className="text-center">
        <Modal.Title className="w-100">Terms and Conditions of Use</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <p>
          By using this <b>online diagnosis function</b> you agree to abide by
          the following terms:
        </p>
        <ul className="ps-4 py-3">
          <li className="py-2">
            <p>
              <strong>Information Security:</strong>
            </p>
            <p>
              We protect your personal information and use it only for the
              purposes specified in our Privacy Policy. You agree to provide
              accurate and complete information.
            </p>
          </li>
          <li className="py-2">
            <p>
              <strong>Responsibility:</strong>
            </p>
            <p>
              You may not use the service to violate the law or harm others. You
              are fully responsible for all activities under your name.
            </p>
          </li>
          <li className="py-2">
            <p>
              <strong>Liability:</strong>
            </p>
            <p>
              We are not liable for any damages arising from the use of our
              services.
            </p>
          </li>
        </ul>
        <Form>
          {["checkbox"].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check id={`default-${type}`}>
                <Form.Check.Input
                  type={type}
                  onChange={handleCheck}
                  className="border border-secondary"
                />
                <Form.Check.Label>
                  I agree to the{" "}
                  <Link className="text-decoration-none">
                    Terms and Conditions of Use
                  </Link>
                </Form.Check.Label>
              </Form.Check>
            </div>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/home" className="btn btn-outline-secondary me-3">
          Back
        </Link>
        <Button
          //   className="btn btn-primary px-4"
          className={`${
            !isChecked ? "btn btn-outline-primary" : "btn btn-primary"
          } px-4`}
          onClick={handleClose}
          disabled={!isChecked}
        >
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SympCheckerModal;
