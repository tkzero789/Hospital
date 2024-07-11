import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster, toast } from "sonner";
import axios from "axios";
import ApptByPhone from "components/Appt/ApptByPhone";
import SearchApptDetail from "assets/icons/search-appt-detail-icon.svg";
import Footer from "components/HomePage/Footer/Footer";
import ApptIMG from "assets/img/appt-request.jpg";

const ApptDetailGuest = () => {
  const [isPhoneNum, setIsPhoneNum] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleBtnClick = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      axios
        .get(`http://localhost:5000/appointment/${e.target.value}`)
        .then((response) => {
          console.log("API response:", response.data);
          const filteredAppointments = response.data.filter(
            (appointment) => appointment.phoneNumber === phoneNumber
          );
          if (filteredAppointments.length > 0) {
            setAppointments(filteredAppointments);
            setIsPhoneNum(true);
          } else {
            toast.error("Invalid phone number");
          }
          console.log("Filter response:", response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    console.log("Phone number:", phoneNumber);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Check appointment status</title>
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
                    <div className="appt-detail-header">
                      Check appointment status
                    </div>
                    <div className="appt-detail-info">
                      <div className="appt-detail-icon">
                        <img src={SearchApptDetail} alt="Search icon" />
                      </div>
                      <div className="phone-number-field">
                        <label htmlFor="phone-number">
                          Enter the phone number used to schedule the
                          appointment
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
                      <button onClick={handleBtnClick}>
                        <Toaster
                          toastOptions={{
                            className: "toast-noti",
                          }}
                          position="top-center"
                          richColors
                        />
                        Next
                      </button>
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
