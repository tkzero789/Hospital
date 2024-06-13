import { useState, useEffect, useRef } from "react";
import ApptIMG from "assets/img/apptReq.jpg";
import ApptByPhoneDetail from "components/Appt/ApptByPhoneDetail";
import ApptFilter from "components/Appt//ApptFilter";
import { Skeleton } from "@mui/material";
import "components/Appt/appt.css";

const ApptByPhone = ({ appointments, setIsPhoneNum }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [sortedAppointments, setSortedAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (appointment, e) => {
    e.preventDefault();
    setIsClicked(true);
    setSelectedAppointment(appointment);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  const handleBack = (e) => {
    e.preventDefault();
    setIsPhoneNum(false);
  };

  const options = [
    {
      value: "descCreated",
      label: "Most recent",
    },
    {
      value: "ascCreated",
      label: "First appointment",
    },
    {
      value: "desc",
      label: "Appointment date (descending)",
    },
    {
      value: "asc",
      label: "Appointment date (ascending)",
    },
  ];

  // Function to handle filter change
  const [filter, setFilter] = useState(options[0]);

  const handleFilterChange = (option) => {
    setFilter(option);
  };

  // Delay
  const sortTimeout = useRef(null);
  // Filter
  useEffect(() => {
    setIsLoading(true);
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

    // Clear any existing timeout
    if (sortTimeout.current) clearTimeout(sortTimeout.current);

    // Set a new timeout
    sortTimeout.current = setTimeout(() => {
      setSortedAppointments(sorted);
      setIsLoading(false);
    }, 500);

    // Clear the timeout when the component unmounts or when the dependencies change
    return () => clearTimeout(sortTimeout.current);
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
                    All appointment details
                  </div>
                  <div className="appt-detail-filter">
                    <div>
                      <b>Filter:</b>
                    </div>
                    <ApptFilter
                      options={options}
                      value={filter}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="app-detail-info">
                    <div className="app-detail-info-wrapper">
                      {isLoading
                        ? Array(7)
                            .fill()
                            .map((_, index) => (
                              <Skeleton
                                key={index}
                                variant="text"
                                animation="wave"
                                sx={{ fontSize: "2rem" }}
                                style={{ margin: "0 10px" }}
                              />
                            ))
                        : sortedAppointments.map((appointment, index) => (
                            <div className="appt-detail-item" key={index}>
                              <div className="appt-detail-item-wrapper">
                                <div className="appt-individual">
                                  <p>Name</p>
                                  <p>{appointment.fullName}</p>
                                </div>
                                <div className="appt-individual">
                                  <p>Service</p>
                                  <p>{appointment.need}</p>
                                </div>
                                <div className="appt-individual">
                                  <p>Appointment date</p>
                                  <p>
                                    {appointment.date
                                      ? appointment.date
                                      : "Waiting"}
                                  </p>
                                </div>
                                <div className="appt-individual">
                                  <p>Requested on</p>
                                  <p>{appointment.createdAt}</p>
                                </div>
                                <div className="appt-individual">
                                  <p>Status</p>
                                  <p
                                    className={`${
                                      appointment.status === "Reviewing"
                                        ? "appt-status-reviewing"
                                        : "appt-status-accepted"
                                    }`}
                                  >
                                    {appointment.status === "Pending"
                                      ? "Pending"
                                      : appointment.status === "Accepted"
                                      ? "Accepted"
                                      : appointment.status}
                                  </p>
                                </div>
                                <div className="appt-individual-btn">
                                  <button
                                    onClick={(e) => handleClick(appointment, e)}
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
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
      )}
    </>
  );
};

export default ApptByPhone;
