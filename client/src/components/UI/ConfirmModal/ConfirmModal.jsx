import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function ConfirmModal({ title, body, show, hide, action, isClicked }) {
  return (
    <>
      <Modal
        centered
        show={show}
        onHide={hide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton={!isClicked}
          className="border border-bottom-0"
        >
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer closeButton={!isClicked} className="bg-light">
          <Button
            variant="outline-secondary"
            onClick={hide}
            disabled={isClicked}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={action} disabled={isClicked}>
            {isClicked ? (
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
}

export default ConfirmModal;
