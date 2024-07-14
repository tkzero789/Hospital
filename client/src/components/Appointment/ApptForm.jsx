import React, { useState, useEffect, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Calendar from "react-calendar";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import ApptIMG from "assets/img/appt-request.jpg";
import "react-calendar/dist/Calendar.css";
import "components/Appointment/Calendar.css";
import "components/Appointment/Appt.scss";

export default function ApptForm({
  appt,
  setAppt,
  showModal,
  setShowModal,
  editMode,
  closeModal,
  checkPhoneNumber,
}) {
  // --- DOB: Start ---
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const getDaysInMonth = (month, year) => {
    // February
    if (month === "02") {
      return 29;
    }
    // April, June, September, November
    if (["04", "06", "09", "11"].includes(month)) {
      return 30;
    }
    // January, March, May, July, August, October, December
    return 31;
  };

  const [days, setDays] = useState([]);

  useEffect(() => {
    if (month) {
      const daysInMonth = getDaysInMonth(month);
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    }
  }, [month]);

  const months = [
    { value: "", label: "Month" },
    { value: "01", label: "1" },
    { value: "02", label: "2" },
    { value: "03", label: "3" },
    { value: "04", label: "4" },
    { value: "05", label: "5" },
    { value: "06", label: "6" },
    { value: "07", label: "7" },
    { value: "08", label: "8" },
    { value: "09", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const years = Array.from({ length: 106 }, (_, i) => 1910 + i);

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setDate("");
    setYear("");
    const formattedMonth = selectedMonth.padStart(2, "0");
    setMonth(formattedMonth);
    setAppt((apptObject) => ({
      ...apptObject,
      dob: `${formattedMonth}/${date}/${year}`,
    }));
  };

  const handleDateChange = (e) => {
    const selectedDate = Number(e.target.value);
    if (selectedDate === 29 && month === "02") {
      setYear("");
    }
    setDate(selectedDate);
    setAppt((apptObject) => ({
      ...apptObject,
      dob: `${month}/${selectedDate}/${year}`,
    }));
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    setAppt((apptObject) => ({
      ...apptObject,
      dob: `${month}/${date}/${selectedYear}`,
    }));
  };
  // --- DOB: End ---

  // --- Calendar: Start ---
  const [calendarDate, setCalendarDate] = useState(null);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 75); // Set max date to 21 days from today
  const [showCalendar, setShowCalendar] = useState(false); // State for calendar visibility
  const calendarRef = useRef(null);

  // Format the selected date for display (optional)
  const formattedCalendarDate = calendarDate
    ? calendarDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  const handleCalendarChange = (date) => {
    setCalendarDate(date);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    setAppt((apptObject) => ({
      ...apptObject,
      date: formattedDate,
    }));

    setShowCalendar(false); // Hide calendar after selection
  };

  // Toggle calendar visibility
  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  // Hide calendar on outside click
  const handleCalendarClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCalendarClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleCalendarClickOutside);
    };
  }, []);
  // --- Calendar: End ---

  // --- Validate: Start ---

  const updateApptField = (e) => {
    setAppt({ ...appt, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    const inputFullName = document.getElementById("inputFullName");
    const inputPhoneNumber = document.getElementById("inputPhoneNumber");
    const inputEmail = document.getElementById("inputEmail");
    if (!inputFullName.checkValidity()) {
      toast.error("Please enter your name");
    } else if (!inputPhoneNumber.checkValidity()) {
      toast.error("Invalid phone number");
    } else if (!inputEmail.checkValidity()) {
      toast.error("Invalid email");
    } else if (!date) {
      toast.error("Please select date of birth");
    } else if (!month || month === "00") {
      toast.error("Please select month");
    } else if (!year) {
      toast.error("Please select year");
    } else if (appt.gender === "" || appt.gender === "Select gender") {
      toast.error("Please select gender");
    } else if (appt.need === "" || appt.need === "Select services") {
      toast.error("Please select a service");
    } else {
      displayModal();
    }
  };
  // --- Validate: End ---

  // --- Modal: Start ---

  const displayModal = () => {
    setShowModal(!showModal);
  };
  const formatDateForModal = (date) => {
    return String(date).padStart(2, "0");
  };

  useEffect(() => {
    if (showModal) {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  }, [showModal]);
  // --- Modal: End ---

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Appointment schedule</title>
        </Helmet>
      </HelmetProvider>

      {/* Appointment Request Hero Image */}
      <div className="appt-img">
        <img src={ApptIMG} alt="Appointment" />
      </div>

      {/* Appointment Form */}
      <section className="appt w-100">
        <div className="content-container">
          <div className={`appt-wrapper ${showModal ? "hidden" : ""}`}>
            <div className="appt-title">
              <div className="appt-title-text">Schedule an appointment</div>
            </div>
            <form className="appt-form">
              <div className="c-4 md-12">
                {/* Name */}
                <div className="name-form">
                  <label htmlFor="name">
                    Your name <span>*</span>
                  </label>
                  <input
                    className="appt-input"
                    type="text"
                    placeholder="Enter your name"
                    id="inputFullName"
                    name="fullName"
                    value={appt.fullName}
                    readOnly={!editMode}
                    required
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
                {/* Phone */}
                <div className="phone-form">
                  <label htmlFor="phone">
                    Phone number <span>*</span>
                  </label>
                  <input
                    className="appt-input"
                    type="text"
                    placeholder="Enter phone number"
                    id="inputPhoneNumber"
                    name="phoneNumber"
                    value={appt.phoneNumber}
                    pattern="^[2-9]{1}[0-9]{2}[2-9]{1}[0-9]{2}[0-9]{4}$"
                    readOnly={!editMode}
                    required
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
                {/* Email */}
                <div className="email-form">
                  <label htmlFor="email">Email</label>
                  <input
                    className="appt-input"
                    type="email"
                    placeholder="Email (optional)"
                    id="inputEmail"
                    name="email"
                    value={appt.email}
                    readOnly={!editMode}
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
              </div>
              <div className="c-4 md-12">
                {/* DOB */}
                <div className="dob-form">
                  <label htmlFor="dob">
                    {" "}
                    Date of birth <span>*</span>{" "}
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="monthSelect"
                      value={month}
                      readOnly={!editMode}
                      onChange={handleMonthChange}
                    >
                      {months.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <select
                      id="dateSelect"
                      value={date}
                      readOnly={!editMode}
                      onChange={handleDateChange}
                      disabled={!month}
                    >
                      <option value="">Date</option>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      id="yearSelect"
                      value={year}
                      readOnly={!editMode}
                      onChange={handleYearChange}
                      disabled={!date}
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option
                          key={year}
                          value={year}
                          disabled={
                            month === "02" && date === 29 && !isLeapYear(year)
                          }
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Gender */}
                <div className="gender">
                  <label htmlFor="gender">
                    Gender <span>*</span>
                  </label>
                  <select
                    id="inputGender"
                    name="gender"
                    className="dropdown-field"
                    type="text"
                    value={appt.gender}
                    readOnly={!editMode}
                    required
                    onChange={(e) => updateApptField(e)}
                  >
                    <option value="Select gender">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                {/* Specialties */}
                <div className="need">
                  <label htmlFor="need">
                    Services <span>*</span>
                  </label>
                  <select
                    id="inputNeed"
                    name="need"
                    className="dropdown-field"
                    type="text"
                    value={appt.need}
                    readOnly={!editMode}
                    required
                    onChange={(e) => updateApptField(e)}
                  >
                    <option value="Select services">Select services</option>
                    <option value="Imaging">Imaging</option>
                    <option value="General check-ups">General check-ups</option>
                    <option value="Primary care">Primary care</option>
                    <option value="Senior care">Senior care</option>
                    <option value="Specialty care">Specialty care</option>
                  </select>
                </div>
              </div>
              <div className="c-4 md-12">
                {/* Appt Date */}
                <div className="appt-date">
                  <label htmlFor="appt-date">Appointment date</label>
                  <div className="appt-date-container d-flex">
                    <input
                      className="appt-date-input"
                      type="text"
                      value={formattedCalendarDate}
                      readOnly // Make the input read-only
                      onClick={handleCalendarClick} // Toggle calendar on click
                      placeholder="Select a date (optional)"
                      id="inputDate"
                      name="date"
                      required
                    />
                    <div className="appt-date-icon">
                      <i className="bi bi-calendar"></i>
                    </div>
                  </div>

                  {showCalendar && (
                    <div ref={calendarRef} className="calendar-box">
                      <Calendar
                        onChange={handleCalendarChange}
                        value={calendarDate}
                        minDate={new Date()}
                        maxDate={maxDate}
                      />
                    </div>
                  )}
                </div>
                {/* Symptom Description */}
                <div className="reason-textarea">
                  <label htmlFor="reason">Describe your health issue</label>
                  <textarea
                    placeholder="Enter your health issue (optional)"
                    id="inputReason"
                    name="reason"
                    value={appt.reason}
                    readOnly={!editMode}
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
              </div>
            </form>
            {/* Submit Button */}
            <div className="text-center">
              <hr />
              <span>
                <b>Note:</b> The{" "}
                <b style={{ fontWeight: "var(--roboto-medium-weight)" }}>
                  appointment time
                </b>{" "}
                is only an estimate. Our call center will contact you to confirm
                the exact appointment time after you have booked.
              </span>
              <div className="appt-btn">
                <Toaster
                  toastOptions={{
                    className: "toast-noti-3",
                  }}
                  position="top-center"
                  richColors
                />
                <button onClick={validateInput}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Display Appointment Confirmation */}
      {showModal && (
        <div className="appt w-100">
          <div className="content-container">
            <div className="appt-modal">
              <div className="appt-modal-wrapper">
                <div className="appt-modal-header">Confirm appointment</div>
                <div className="appt-modal-info">
                  <div className="appt-modal-data">
                    <span>Name:</span>
                    <p>{appt.fullName}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Phone number:</span>
                    <p>{appt.phoneNumber}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Email:</span>
                    {appt.email ? (
                      <p>{appt.email}</p>
                    ) : (
                      <p>Did not provided (optional)</p>
                    )}
                  </div>
                  <div className="appt-modal-data">
                    <span>Date of birth:</span>
                    <p>
                      {month}/{formatDateForModal(date)}/{year}
                    </p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Gender:</span>
                    <p>{appt.gender}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Service:</span>
                    <p>{appt.need}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Appointment date:</span>
                    {appt.date ? (
                      <p>{appt.date}</p>
                    ) : (
                      <p>
                        <b>
                          BaySide's call center will contact you as soon as
                          possible to confirm your appointment.
                        </b>
                      </p>
                    )}
                  </div>
                  <div className="appt-modal-data">
                    <span>Describe your health issue:</span>
                    {appt.reason ? (
                      <p>{appt.reason}</p>
                    ) : (
                      <p>Did not provided (optional)</p>
                    )}
                  </div>
                  <hr style={{ marginTop: "3rem" }} />
                  <div className="attention-text">
                    <p>
                      By clicking <strong>“Confirm“</strong>, I confirm that I
                      have read and agree to the{" "}
                      <Link style={{ textDecoration: "none" }}>
                        Terms and Conditions of Use
                      </Link>{" "}
                      of the service.
                    </p>
                  </div>
                  <div className="appt-modal-btn">
                    <button type="button" onClick={closeModal}>
                      Back
                    </button>
                    <button type="button" onClick={checkPhoneNumber}>
                      <Toaster
                        toastOptions={{
                          className: "toast-noti-2",
                        }}
                        position="top-center"
                        richColors
                      />
                      Confirm
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
