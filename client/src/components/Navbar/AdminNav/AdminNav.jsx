import React, { useState, useEffect } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";
import { useAuth } from "auth/AuthContext";
import AdminSearch from "./AdminSearch";
import "components/Navbar/AdminNav/AdminNav.scss";

const AdminNav = () => {
  const { getUserInfos } = useAuth();
  const userInfos = getUserInfos();
  const fullName = userInfos ? userInfos.fullName : null;
  const [appointments, setAppointments] = useState([]);
  const [isClicked, setIsClicked] = useState(true);

  // Handle when clicking on the link
  const handleClick = () => {
    setIsClicked(false);

    setTimeout(() => {
      setIsClicked(true);
    }, 100);
  };

  // Appointment notifications
  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/appointmentNoti`
    );

    eventSource.onmessage = (event) => {
      const newAppointments = JSON.parse(event.data);
      setAppointments(newAppointments);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  appointments.map((item) => {
    return console.log(item.id);
  });

  return (
    <div className="admin-navbar">
      <div className="wrapper">
        <div className="search-bar">
          <AdminSearch />
        </div>
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">{appointments.length}</div>
            {isClicked && (
              <div className="noti-list">
                <div>
                  <span>Notifications</span>
                  <Link onClick={handleClick} to="appointment-table">
                    View all
                  </Link>
                </div>
                <ul>
                  {appointments.map((appointment, index) => (
                    <li key={index} onClick={handleClick}>
                      <Link to={`appointment/${appointment.id}/view`}>
                        <p>
                          {" "}
                          New appointment:{" "}
                          <span className="fw-med">{appointment.fullName}</span>
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="item">
            <span>{fullName}</span>
            <img
              src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
