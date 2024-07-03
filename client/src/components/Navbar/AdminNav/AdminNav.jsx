import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";
import { useAuth } from "auth/AuthContext";
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

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/appointmentNoti"
        );
        setAppointments(response.data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="admin-navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">!</div>
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
                          New appointment: <span>{appointment.fullName}</span>
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
