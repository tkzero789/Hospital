import { useState, useEffect } from "react";
import ApptIMG from "../../assets/appt/apptReq.jpg";
import ApptByPhoneDetail from "./ApptByPhoneDetail";
import ApptFilter from "./ApptFilter";

const ApptByPhone = ({ appointments, setIsPhoneNum }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [sortedAppointments, setSortedAppointments] = useState([]);

  const handleClick = (appointment, e) => {
    e.preventDefault();
    setIsClicked(true);
    setSelectedAppointment(appointment);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setIsPhoneNum(false);
  };

  const options = [
    {
      value: "descCreated",
      label: "Ngày đăng ký gần nhất",
    },
    {
      value: "ascCreated",
      label: "Ngày đăng ký đầu tiên",
    },
    {
      value: "desc",
      label: "Ngày hẹn khám gần nhất",
    },
    {
      value: "asc",
      label: "Ngày hẹn khám đầu tiên",
    },
  ];

  // Function to handle filter change
  const [filter, setFilter] = useState(options[0]);

  const handleFilterChange = (option) => {
    setFilter(option);
  };

  // Filter
  useEffect(() => {
    const sorted = [...appointments].sort((a, b) => {
      // Convert dates from "dd/mm/yyyy" to "mm/dd/yyyy"
      const aDate = a.date.split("/").reverse().join("/");
      const bDate = b.date.split("/").reverse().join("/");
      const aCreated = a.createdAt.split("/").reverse().join("/");
      const bCreated = b.createdAt.split("/").reverse().join("/");

      // Sort by status first
      if (a.status === "Pending" && b.status !== "Pending") {
        return -1;
      } else if (b.status === "Pending" && a.status !== "Pending") {
        return 1;
      }
      // If status is the same, sort by date or created date
      else {
        if (filter.value === "asc") {
          return new Date(aDate) - new Date(bDate);
        } else if (filter.value === "desc") {
          return new Date(bDate) - new Date(aDate);
        } else if (filter.value === "ascCreated") {
          return new Date(aCreated) - new Date(bCreated);
        } else {
          // filter.value === "descCreated"
          return new Date(bCreated) - new Date(aCreated);
        }
      }
    });

    setSortedAppointments(sorted);
  }, [filter, appointments]);

  return (
    <>
      {isClicked && selectedAppointment ? (
        <ApptByPhoneDetail
          setIsClicked={setIsClicked}
          setSelectedAppointment={setSelectedAppointment}
          fullName={selectedAppointment.fullName}
          phoneNumber={selectedAppointment.phoneNumber}
          email={selectedAppointment.email}
          dob={selectedAppointment.dob}
          gender={selectedAppointment.gender}
          need={selectedAppointment.need}
          date={selectedAppointment.date}
          reason={selectedAppointment.reason}
        />
      ) : (
        <>
          {/* Appointment Request Hero Image */}
          <div className="appt-img">
            <img src={ApptIMG} alt="Appointment" />
          </div>
          <div className="appt">
            <div className="content-container">
              <div className="appt-detail">
                <div className="appt-detail-wrapper">
                  <div className="appt-detail-header">
                    Tất cả thông tin lịch hẹn
                  </div>
                  <div className="appt-detail-filter">
                    <div>Sắp xếp theo:</div>
                    <ApptFilter
                      options={options}
                      value={filter}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="app-detail-info">
                    <div className="app-detail-info-wrapper">
                      {sortedAppointments.map((appointment, index) => (
                        <div className="appt-detail-item" key={index}>
                          <div className="appt-detail-item-wrapper">
                            <div className="appt-individual">
                              <p>Tên</p>
                              <p>{appointment.fullName}</p>
                            </div>
                            <div className="appt-individual">
                              <p>Nhu cầu</p>
                              <p>{appointment.need}</p>
                            </div>
                            <div className="appt-individual">
                              <p>Ngày hẹn khám</p>
                              <p>
                                {appointment.date
                                  ? appointment.date
                                  : "Chưa có"}
                              </p>
                            </div>
                            <div className="appt-individual">
                              <p>Ngày đăng ký</p>
                              <p>{appointment.createdAt}</p>
                            </div>
                            <div className="appt-individual">
                              <p>Trạng thái</p>
                              <p
                                className={`${
                                  appointment.status === "Pending"
                                    ? "appt-status-pending"
                                    : "appt-status-accepted"
                                }`}
                              >
                                {appointment.status === "Pending"
                                  ? "Đang xét duyệt"
                                  : appointment.status === "Accepted"
                                  ? "Đã chấp nhận"
                                  : appointment.status}
                              </p>
                            </div>
                            <div className="appt-individual-btn">
                              <button
                                onClick={(e) => handleClick(appointment, e)}
                              >
                                Xem
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
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
      )}
    </>
  );
};

export default ApptByPhone;
