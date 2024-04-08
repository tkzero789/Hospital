import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

export default function TestApptForm() {
  // --- DOB: Start ---
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const years = Array.from({ length: 106 }, (_, i) => 1910 + i);

  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: "", label: "Tháng" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const disabledDates = (date) =>
    month && year && date > getDaysInMonth(month - 1, year);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setDate(date);
    console.log(date);
    setMonth(""); // Reset month and year on date change
    setYear("");

    setAppt((apptObject) => ({
      ...apptObject,
      dob: date,
    }));
  };
  // --- DOB: End ---

  // --- Calendar: Start ---
  const [calendarDate, setCalendarDate] = useState(null);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 21); // Set max date to 21 days from today
  const [showCalendar, setShowCalendar] = useState(false); // State for calendar visibility
  const calendarRef = useRef(null);

  // Format the selected date for display (optional)
  const formattedDate = calendarDate
    ? calendarDate.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const handleCalendarChange = (date) => {
    setCalendarDate(date);

    const formattedDate = date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
  const [appt, setAppt] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    need: "",
    date: "",
    reason: "",
    createdAt: null,
  });

  const updateApptField = (e) => {
    let _appt = { ...appt };
    _appt[e.target.name] = e.target.value;
    setAppt(_appt);
  };

  const navigate = useNavigate();

  async function confirmSetAppt(e) {
    const inputFullName = document.getElementById("inputFullName");
    const inputPhoneNumber = document.getElementById("inputPhoneNumber");
    const inputEmail = document.getElementById("inputEmail");
    if (!inputFullName.checkValidity()) {
      alert("Thiếu Họ và tên");
    } else if (appt.phoneNumber === "") {
      alert("Số điện thoại không hợp lệ");
    } else if (!inputPhoneNumber.checkValidity()) {
      alert("Số điện thoại không hợp lệ");
    } else if (!inputEmail.checkValidity()) {
      alert("Email không hợp lệ");
    } else if (appt.gender === "") {
      alert("Vui lòng chọn giới tính");
    } else if (appt.need === "") {
      alert("Vui lòng chọn Nhu cầu khám");
    } else {
      e.preventDefault();
      const updatedAppt = {
        ...appt,
        createdAt: new Date().toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      axios
        .post(
          "https://symptom-checker-with-mern-backend.onrender.com/appointment/add",
          updatedAppt
        )
        .then((res) => {
          console.log("Appointment set");
          console.log(res.data);
          setAppt({
            fullName: "",
            phoneNumber: "",
            email: "",
            dob: "",
            gender: "",
            need: "",
            date: "",
            reason: "",
            createdAt: null,
          });
          navigate("/");
        })
        .catch((err) => {
          const message = `An error occurred: ${err}`;
          window.alert(message);
          return;
        });
    }
  }

  const validateInput = () => {
    const inputFullName = document.getElementById("inputFullName");
    const inputEmail = document.getElementById("inputEmail");
    if (!inputFullName.checkValidity()) {
      alert("Thiếu Họ và tên");
    } else if (appt.phoneNumber === "") {
      alert("Số điện thoại không hợp lệ");
    } else if (!inputEmail.checkValidity()) {
      alert("Email không hợp lệ");
    } else if (appt.gender === "") {
      alert("Vui lòng chọn giới tính");
    } else if (appt.need === "") {
      alert("Vui lòng chọn Nhu cầu khám");
    } else {
      displayModal();
    }
  };
  // --- Validate: End ---

  // --- Modal: Start ---
  const [showModal, setShowModal] = useState(false);

  const displayModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  // --- Modal: End ---

  return (
    <>
      <section className="appt w-100">
        <div className="content-container">
          <div className={`appt-wrapper ${showModal ? "hidden" : ""}`}>
            <div className="appt-title">
              <div className="appt-title-text">Đăng ký khám bệnh</div>
            </div>
            <form className="appt-form d-flex">
              <div className="c-4">
                {/* Name */}
                <div className="name-form">
                  <label for="name">
                    Họ và tên <span>*</span>
                  </label>
                  <input
                    className="appt-input"
                    type="text"
                    placeholder="Họ và tên"
                    id="inputFullName"
                    name="fullName"
                    value={appt.fullName}
                    required
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
                {/* Phone */}
                <div className="phone-form">
                  <label for="phone">
                    Số điện thoại <span>*</span>
                  </label>
                  <input
                    className="appt-input"
                    type="text"
                    placeholder="Số điện thoại"
                    id="inputPhoneNumber"
                    name="phoneNumber"
                    value={appt.phoneNumber}
                    pattern="[0-9]{10}"
                    required
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
                {/* Email */}
                <div className="email-form">
                  <label for="email">Email</label>
                  <input
                    className="appt-input"
                    type="email"
                    placeholder="Email (không bắt buộc)"
                    id="inputEmail"
                    name="email"
                    value={appt.email}
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
              </div>
              <div className="c-4">
                {/* DOB */}
                <div className="dob-form">
                  <label htmlFor="dob">
                    {" "}
                    Ngày sinh <span>*</span>{" "}
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="dateSelect"
                      value={date}
                      onChange={handleDateChange}
                    >
                      <option value="">Ngày</option>
                      {dates.map((date) => (
                        <option
                          key={date}
                          value={date}
                          disabled={disabledDates(date)}
                        >
                          {date}
                        </option>
                      ))}
                    </select>
                    <select
                      id="monthSelect"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      disabled={!date}
                    >
                      {months.map(({ value, label }) => (
                        <option
                          key={value}
                          value={value}
                          disabled={
                            value === "2" &&
                            date &&
                            ((!year && date > 29) ||
                              (year && !isLeapYear(year) && date > 29))
                          }
                        >
                          {label}
                        </option>
                      ))}
                    </select>
                    <select
                      id="yearSelect"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      disabled={!month}
                    >
                      <option value="">Năm</option>
                      {years.map((year) => (
                        <option
                          key={year}
                          value={year}
                          disabled={
                            month === "2" && date === "29" && !isLeapYear(year)
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
                  <label for="gender">
                    Giới tính <span>*</span>
                  </label>
                  <select
                    id="inputGender"
                    name="gender"
                    className="dropdown-field"
                    type="text"
                    value={appt.gender}
                    required
                    onChange={(e) => updateApptField(e)}
                  >
                    <option value="Chọn giới tính">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                {/* Specialties */}
                <div className="need">
                  <label for="need">
                    Nhu cầu khám <span>*</span>
                  </label>
                  <select
                    id="inputNeed"
                    name="need"
                    className="dropdown-field"
                    type="text"
                    value={appt.need}
                    required
                    onChange={(e) => updateApptField(e)}
                  >
                    <option value="Chọn nhu cầu">Chọn nhu cầu</option>
                    <option value="Khám chuyên khoa">Khám chuyên khoa</option>
                    <option value="Kiểm tra sức khoẻ tổng quát">
                      Kiểm tra sức khoẻ tổng quát
                    </option>
                    <option value="Xét nghiệm, chẩn đoán hình ảnh">
                      Xét nghiệm, chẩn đoán hình ảnh
                    </option>
                  </select>
                </div>
              </div>
              <div className="c-4">
                {/* Appt Date */}
                <div className="appt-date">
                  <label for="appt-date">Đặt lịch khám</label>
                  <div className="appt-date-container d-flex">
                    <input
                      className="appt-date-input"
                      type="text"
                      value={formattedDate.toString()}
                      readOnly // Make the input read-only
                      onClick={handleCalendarClick} // Toggle calendar on click
                      placeholder="Đặt lịch (không bắt buộc)"
                      id="inputDate"
                      name="date"
                      required
                    />
                    <div className="app-date-icon">
                      <i class="bi bi-calendar"></i>
                    </div>
                  </div>

                  {showCalendar && (
                    <div ref={calendarRef} className="calendar-box">
                      <Calendar
                        onChange={handleCalendarChange}
                        locale="vi-VN"
                        minDate={new Date()}
                        maxDate={maxDate}
                        tileClassName={({ date }) =>
                          date.getDay() === 0 || date.getDay() === 6
                            ? "disabled-weekend"
                            : ""
                        }
                      />
                    </div>
                  )}
                </div>
                {/* Symptom Description */}
                <div className="reason-textarea">
                  <label for="reason">Mô tả vấn đề sức khoẻ</label>
                  <textarea
                    placeholder="Nhập mô tả vấn đề sức khoẻ (không bắt buộc)"
                    id="inputReason"
                    name="reason"
                    value={appt.reason}
                    onChange={(e) => updateApptField(e)}
                  />
                </div>
              </div>
            </form>
            {/* Submit Button */}
            <div className="text-center">
              <button className="appt-btn" onClick={validateInput}>
                Đặt lịch khám
              </button>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="appt-modal">
          <div className="appt-modal-section">
            <div className="appt-modal-box">
              <div className="appt-modal-wrapper">
                <div className="appt-modal-header">
                  Xác nhận thông tin đặt lịch khám
                </div>
                <div className="appt-modal-info">
                  <div className="appt-modal-data">
                    <span>Họ và tên:</span>
                    <p>{appt.fullName}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Số điện thoại:</span>
                    <p>{appt.phoneNumber}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Email:</span>
                    <p>{appt.email}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Ngày sinh:</span>
                    <p>
                      {appt.dob}/{month}/{year}
                    </p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Giới tính:</span>
                    <p>{appt.gender}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Nhu cầu khám:</span>
                    <p>{appt.need}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Đặt lịch khám:</span>
                    <p>{appt.date}</p>
                  </div>
                  <div className="appt-modal-data">
                    <span>Mô tả vấn đề sức khoẻ:</span>
                    <p>{appt.reason}</p>
                  </div>
                  <hr />
                  <div className="attention-text">
                    <p>
                      <b>Lưu ý:</b> Tổng đài BKCare sẽ liên hệ Quý khách trong
                      thời gian sớm nhất để xác nhận lịch hẹn. Cảm ơn Quý khách
                      đã lựa chọn dịch vụ của BKCare.
                    </p>
                  </div>
                </div>
                <div className="appt-modal-btn">
                  <button type="button" onClick={closeModal}>
                    Quay lại
                  </button>
                  <button type="button" onClick={confirmSetAppt}>
                    Xác nhận đặt hẹn
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
