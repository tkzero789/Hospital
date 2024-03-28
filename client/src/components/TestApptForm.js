import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

export default function TestApptForm() {
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

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar); // Toggle calendar visibility
  };

  const handleCalendarClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false); // Hide calendar on outside click
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
    const inputGender = document.getElementById("inputGender");
    const inputNeed = document.getElementById("inputNeed");
    const iputDate = document.getElementById("iputDate");
    if (!inputFullName.checkValidity()) {
      alert("Thiếu Họ và tên");
    } else if (!inputPhoneNumber.checkValidity()) {
      alert("Số điện thoại không hợp lệ");
    } else if (!inputEmail.checkValidity()) {
      alert("Email không hợp lệ");
    } else if (!inputDob.checkValidity()) {
      alert("Ngày sinh theo dạng ngày/tháng/năm");
    } else if (!inputGender.checkValidity()) {
      alert("Vui lòng chọn giới tính");
    } else if (!inputNeed.checkValidity()) {
      alert("Vui lòng chọn Nhu cầu khám");
    } else if (!iputDate.checkValidity()) {
      alert("Vui lòng chọn ngày đặt lịch khám");
    } else {
      e.preventDefault();
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
                  type="text"
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
                <label for="dob">
                  Ngày sinh <span>*</span>
                </label>
                <input
                  className="appt-input"
                  type="text"
                  placeholder="dd/mm/yyyy"
                  id="inputDob"
                  name="dob"
                  value={appt.dob}
                  required
                  onChange={(e) => updateApptField(e)}
                />
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
                  value={appt.need}
                  required
                  onChange={(e) => updateApptField(e)}
                >
                  <option value="Chọn nhu cầu">Chọn nhu cầu</option>
                  <option>Khám chuyên khoa</option>
                  <option>Kiểm tra sức khoẻ tổng quát</option>
                  <option>Xét nghiệm, chẩn đoán hình ảnh</option>
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
