import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ApptChart from "components/DataChart/ApptChart";
import ServiceChart from "components/DataChart/ServiceChart";
import GenderChart from "components/DataChart/GenderChart";
import FormatDate from "utilities/FormatDate";
import "components/Widget/Widget.scss";

const ApptChartWidget = () => {
  const [appt, setAppt] = useState([]);
  const [need, setNeed] = useState([]);
  const [gender, setGender] = useState([]);

  // Count the amount of appointments each day
  const getNumberOfAppt = useCallback((appointments) => {
    const weekDates = getCurrentWeekDates();
    const countsPerDay = weekDates.reduce(
      (acc, date) => ({ ...acc, [date]: 0 }),
      {}
    );
    appointments.forEach((appointment) => {
      const date = new Date(appointment.createdAt).toISOString().split("T")[0];
      if (date in countsPerDay) {
        countsPerDay[date] += 1;
      }
    });
    return countsPerDay;
  }, []);

  // Count the amount of need (services) request by users
  const getNumberOfNeed = useCallback((appointments) => {
    const weekDates = getCurrentWeekDates(); // Returns dates of the current week
    const startOfWeek = new Date(weekDates[0]);
    const endOfWeek = new Date(weekDates[weekDates.length - 1]);
    endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the last day

    const needsCount = {
      Imaging: 0,
      "General check-ups": 0,
      "Primary care": 0,
      "Senior care": 0,
      "Specialty care": 0,
    };

    // Filter appointments to include only those within the current week
    const currentWeekAppointments = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.createdAt);
      return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
    });

    currentWeekAppointments.forEach((appointment) => {
      if (appointment.need in needsCount) {
        needsCount[appointment.need] += 1;
      }
    });

    return Object.entries(needsCount).map(([label, value], id) => ({
      id,
      value,
      label,
    }));
  }, []);

  // Count the amount of gender
  const getNumberOfGender = useCallback((appointments) => {
    const weekDates = getCurrentWeekDates();
    const startOfWeek = new Date(weekDates[0]);
    const endOfWeek = new Date(weekDates[weekDates.length - 1]);
    endOfWeek.setHours(23, 59, 59, 999); // Set to the end of the last day

    // Initialize counts
    const genderCounts = {
      Male: 0,
      Female: 0,
    };

    // Filter appointments to include only those within the current week
    const currentWeekAppointments = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.createdAt);
      return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
    });

    // Count genders
    currentWeekAppointments.forEach((appointment) => {
      if (appointment.gender === "Male" || appointment.gender === "Female") {
        genderCounts[appointment.gender] += 1;
      }
    });

    return genderCounts;
  }, []);

  // Fetch data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/appointment`)
      .then((res) => {
        const apptsData = getNumberOfAppt(res.data);
        const needsData = getNumberOfNeed(res.data);
        const gendersData = getNumberOfGender(res.data);
        setAppt(apptsData);
        setNeed(needsData);
        setGender(gendersData);
      })
      .catch((err) => console.log(err));
  }, [getNumberOfAppt, getNumberOfNeed, getNumberOfGender]);

  // Get the number of dates in week (from Monday to Friday)
  const getCurrentWeekDates = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize the time to the start of the day to avoid timezone issues
    const dayOfWeek = now.getDay();
    const differenceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const firstDayOfWeek = new Date(now);
    firstDayOfWeek.setDate(now.getDate() + differenceToMonday);

    const weekDates = Array.from({ length: 5 }).map((_, i) => {
      const date = new Date(firstDayOfWeek);
      date.setDate(date.getDate() + i);
      return date.toISOString().split("T")[0];
    });
    return weekDates;
  };

  // First and last day of the current week
  const Monday = getCurrentWeekDates()[0];
  const Friday = getCurrentWeekDates()[4];

  return (
    <>
      <div className="appt__widget">
        <div className="appt__widget-wrapper">
          <div className="appt__widget-chart">
            <div className="appt-chart">
              <div>
                <h4>
                  Requested appointments{" "}
                  <span>
                    (
                    <FormatDate date3={Monday} /> -{" "}
                    <FormatDate date3={Friday} />)
                  </span>
                </h4>
                <Link to="/appointment-table">View all</Link>
              </div>
              <div>
                <ApptChart data={appt} />
              </div>
            </div>
            <div className="service-chart">
              <div>
                <h4>
                  Services requested by patients{" "}
                  <span>
                    (
                    <FormatDate date3={Monday} /> -{" "}
                    <FormatDate date3={Friday} />)
                  </span>
                </h4>
              </div>
              <div>
                <ServiceChart data={need} />
              </div>
            </div>
            <div className="gender-chart">
              <div>
                <h4>
                  Patients by gender{" "}
                  <span>
                    (
                    <FormatDate date3={Monday} /> -{" "}
                    <FormatDate date3={Friday} />)
                  </span>
                </h4>
              </div>
              <div>
                <GenderChart data={gender} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApptChartWidget;
