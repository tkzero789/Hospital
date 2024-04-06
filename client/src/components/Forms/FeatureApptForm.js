import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

export default function FeatureApptForm() {
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
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [showCalendar, setShowCalendar] = useState(false); // State for calendar visibility
  const calendarRef = useRef(null);

  const handleCalendarChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Hide calendar after selection
  };

  // Format the selected date for display (optional)
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : appt.date;

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

  const updateApptField = (event) => {
    let _appt = { ...appt };
    _appt[event.target.name] = event.target.value;
    setAppt(_appt);
  };

  const navigate = useNavigate();

  async function confirmSetAppt(e) {
    const inputFullName = document.getElementById("inputFullName");
    const inputPhoneNumber = document.getElementById("inputPhoneNumber");
    const inputEmail = document.getElementById("inputEmail");
    const inputDob = document.getElementById("inputDob");
    if (!inputFullName.checkValidity()) {
      alert("Thiếu Họ và tên");
    } else if (appt.phoneNumber === "") {
      alert("Số điện thoại không hợp lệ");
    } else if (!inputPhoneNumber.checkValidity()) {
      alert("Số điện thoại không hợp lệ");
    } else if (!inputEmail.checkValidity()) {
      alert("Email không hợp lệ");
    } else if (!inputDob.checkValidity()) {
      alert("Ngày sinh theo dạng ngày/tháng/năm");
    } else if (appt.gender === "") {
      alert("Vui lòng chọn giới tính");
    } else if (appt.need === "") {
      alert("Vui lòng chọn Nhu cầu khám");
    } else {
      e.preventDefault();
      setAppt((appt) => ({ ...appt, createdAt: Date.now() }));
      const newAppt = { ...appt };
      axios
        .post(
          "https://symptom-checker-with-mern-backend.onrender.com/appointment/add",
          newAppt
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

  // DOB
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
    { value: "", label: "Month" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const disabledDates = (date) =>
    month && year && date > getDaysInMonth(month - 1, year);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setMonth(""); // Reset month and year on date change
    setYear("");
  };

  return (
    <section className="appt w-100">
      <div className="content-container">
        <div className="appt-wrapper">
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
                    <option value="">Date</option>
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
                    <option value="">Year</option>
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
                    value={formattedDate || ""}
                    readOnly // Make the input read-only
                    onClick={handleCalendarClick} // Toggle calendar on click
                    placeholder="Đặt lịch (không bắt buộc)"
                    id="iputDate"
                    name="date"
                    required
                    onChange={(e) => updateApptField(e)}
                  />
                  <div className="app-date-icon">
                    <i class="bi bi-calendar"></i>
                  </div>
                </div>

                {showCalendar && (
                  <div ref={calendarRef} className="calendar-box">
                    <Calendar
                      onChange={handleCalendarChange}
                      value={selectedDate}
                      locale="vi-VN"
                      minDate={new Date()}
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
            <button className="appt-btn" onClick={confirmSetAppt}>
              Đặt lịch khám
            </button>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}
