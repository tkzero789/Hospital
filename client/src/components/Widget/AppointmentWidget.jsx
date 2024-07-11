import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TodayIcon from "@mui/icons-material/Today";
import "components/Widget/Widget.scss";

const AppointmentWidget = () => {
  const [appointments, setAppointments] = useState(0);

  useEffect(() => {
    try {
      axios
        .get(`https://bayside-render-server.onrender.com/appointmentCurrent`)
        .then((res) => {
          setAppointments(res.data.totalAppointmentsThisWeek);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <div className="widget">
        <div className="widget__wrapper">
          <div className="widget__icon-appt">
            <TodayIcon className="icon-appt" />
          </div>
          <div>
            <span>{appointments}</span>
            <h4>Total appts</h4>
          </div>
          <Link to="/appointment-table">View</Link>
        </div>
      </div>
    </>
  );
};

export default AppointmentWidget;
