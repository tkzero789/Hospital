import ApptIMG from "assets/img/appt-request.jpg";
import { Link } from "react-router-dom";
import ConfirmIcon from "assets/icons/confirm-icon.svg";
import "components/Appointment/Appt.scss";

const ApptSuccessMsg = () => {
  return (
    <>
      {/* Appointment Request Hero Image */}
      <div className="appt-img">
        <img src={ApptIMG} alt="Appointment" />
      </div>
      <div className="appt w-100">
        <div className="content-container">
          <div className="appt-success">
            <div className="appt-success-wrapper">
              <div className="appt-success-header">Thank you</div>
              <div className="appt-success-info">
                <div className="appt-success-icon">
                  <img src={ConfirmIcon} alt="Success icon" />
                </div>
                <p>
                  BaySide's call center will contact you as soon as possible to
                  confirm your appointment.<br />
                  Thank you for choosing BaySide Hospital.
                </p>

                <Link to="/news/page-1">
                  Read latest news about health and hospital's activities
                </Link>
                <Link to="/symptom-checker">Give it a try - Health check</Link>
                <Link to="/appt-detail-guest">
                  Check your appointment status
                </Link>
              </div>
              <hr />
              <div className="back-to-home">
                <Link to="/home" className="text-decoration-none">
                  Back to home page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApptSuccessMsg;
