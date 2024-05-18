import { Helmet, HelmetProvider } from "react-helmet-async";
import ApptIMG from "../../assets/appt/apptReq.jpg";
import SearchApptDetail from "../../assets/appt/searchApptDetailSVG.svg";
import Footer from "../ForPages/Footer";
import React, { useState, useEffect } from "react";
import ApptByPhone from "./ApptByPhone";
import axios from "axios";

const ApptDetailGuest = () => {
  const [isPhoneNum, setIsPhoneNum] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleBtnClick = (e) => {
    e.preventDefault();
    setIsPhoneNum(true);
    if (phoneNumber) {
      axios
        .get(`http://localhost:5000/appointment/${e.target.value}`)
        .then((response) => {
          console.log("API response:", response.data);
          setAppointments(
            response.data.filter(
              (appointment) => appointment.phoneNumber === phoneNumber
            )
          );
          console.log("Filter response:", response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    console.log("Phone number:", phoneNumber);
  };

  console.log("Appointments:", appointments);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Kiểm tra lịch hẹn</title>
        </Helmet>
      </HelmetProvider>
      <div className="appt-detail-body">
        {isPhoneNum ? (
          <ApptByPhone
            appointments={appointments}
            setIsPhoneNum={setIsPhoneNum}
          />
        ) : (
          <>
            {/* Appointment Request Hero Image */}
            <div className="appt-img">
              <img src={ApptIMG} alt="Appointment" />
            </div>
            <div className="appt w-100">
              <div className="content-container">
                <div className="appt-detail">
                  <div className="appt-detail-wrapper">
                    <div className="appt-detail-header">Kiểm tra lịch hẹn</div>
                    <div className="appt-detail-info">
                      <div className="appt-detail-icon">
                        <img src={SearchApptDetail} alt="Search icon" />
                      </div>
                      <div className="phone-number-field">
                        <label htmlFor="phone-number">
                          Nhập số điện thoại được dùng để đăng ký khám
                        </label>
                        <input
                          type="text"
                          name="phone-number"
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                        />
                      </div>
                    </div>
                    <div className="appt-detail-btn">
                      <button onClick={handleBtnClick}>Tiếp theo</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default ApptDetailGuest;