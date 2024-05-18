import ApptIMG from "../../assets/appt/apptReq.jpg";

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
              <div className="appt-modal-header">All detail</div>
              <div className="appt-modal-info">
                <div className="appt-modal-data">
                  <span>Họ tên:</span>
                  <p>{fullName}</p>
                </div>
                <div className="appt-modal-data">
                  <span>Số điện thoại:</span>
                  <p>{phoneNumber}</p>
                </div>
                <div className={`appt-modal-data ${!email ? "hidden" : ""}`}>
                  {email ? (
                    <>
                      <span>Email:</span>
                      <p>{email}</p>
                    </>
                  ) : null}
                </div>
                <div className="appt-modal-data">
                  <span>Ngày sinh:</span>
                  <p>{dob}</p>
                </div>
                <div className="appt-modal-data">
                  <span>Giới tính:</span>
                  <p>{gender}</p>
                </div>
                <div className="appt-modal-data">
                  <span>Nhu cầu khám:</span>
                  <p>{need}</p>
                </div>
                <div className="appt-modal-data">
                  <span>Ngày hẹn khám:</span>
                  <p>
                    {date ? (
                      date
                    ) : (
                      <b>
                        Hiện chưa có ngày khám - Tổng đài BKCare sẽ liên hệ Quý
                        khách trong thời gian sớm nhất để xác nhận lịch hẹn.
                      </b>
                    )}
                  </p>
                </div>
                <div className={`appt-modal-data ${!reason ? "hidden" : ""}`}>
                  {reason ? (
                    <>
                      <span>Mô tả vấn đề sức khoẻ:</span>
                      <p>{reason}</p>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="appt-detail-btn-2">
                <button onClick={(e) => handleBack(e)}>Quay lại</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApptByPhoneDetail;
