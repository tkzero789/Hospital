import ApptIMG from "assets/img/appt-request.jpg";
import "components/Appt/Appt.scss";

const ApptByPhoneDetail = ({
  setIsClicked,
  fullName,
  phoneNumber,
  email,
  dob,
  gender,
  need,
  date,
  reason,
}) => {
  const handleBack = (e) => {
    e.preventDefault();
    setIsClicked(false);
  };

  const formatDate = (dob) => {
    const [month, day, year] = dob.split("/");
    const paddedDay = day.padStart(2, "0");
    return `${month}/${paddedDay}/${year}`;
  };
  return (
    <>
      {/* Appointment Request Hero Image */}
      <div className="appt-img">
        <img src={ApptIMG} alt="Appointment" />
      </div>
      <div className="appt">
        <div className="content-container">
          <div className="appt-modal">
            <div className="appt-modal-wrapper">
              <div className="appt-modal-header">Appointment details</div>
              <div className="appt-modal-info">
                <div className="appt-modal-data">
                  <span>Name:</span>
                  <p>{fullName}</p>
                </div>
                <div className="appt-modal-data">
                  <span>Phone number:</span>
                  <p>{phoneNumber}</p>
                </div>
                <div className="appt-modal-data">
                  <span>Email:</span>
                  {email ? <p>{email}</p> : <p>Did not provided (optional)</p>}
                </div>
                <div className="appt-modal-data">
                  <span>Date of birth:</span>
                  <p>{formatDate(dob)}</p>
                </div>
                <div className="appt-modal-data">
                  <span>Gender:</span>
                  <p>{gender}</p>
                </div>
                <div className="appt-modal-data">
                  <span>Service:</span>
                  <p>{need}</p>
                </div>
                <div className="appt-modal-data">
                  <span>Appointment date:</span>
                  <p>
                    {date ? (
                      date
                    ) : (
                      <b>
                        There is currently no scheduled appointment. BaySide's
                        call center will contact you as soon as possible to
                        confirm your appointment.
                      </b>
                    )}
                  </p>
                </div>
                <div className="appt-modal-data">
                  <span>Describe your health issue:</span>
                  {reason ? (
                    <p>{reason}</p>
                  ) : (
                    <p>Did not provided (optional)</p>
                  )}
                </div>
              </div>
              <div className="appt-detail-btn-2">
                <button onClick={(e) => handleBack(e)}>Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApptByPhoneDetail;
