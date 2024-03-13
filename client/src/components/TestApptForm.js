import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function TestApptForm() {
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [showCalendar, setShowCalendar] = useState(false); // State for calendar visibility

  const handleChange = (date) => {
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
    : "";

  const handleClick = () => {
    setShowCalendar(!showCalendar); // Toggle calendar visibility
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
                />
              </div>
              {/* Email */}
              <div className="email-form">
                <label for="email">Email</label>
                <input
                  className="appt-input"
                  type="text"
                  placeholder="Email (không bắt buộc)"
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
                />
              </div>
              {/* Gender */}
              <div className="gender">
                <label for="gender">
                  Giới tính <span>*</span>
                </label>
                <select id="gender" name="gender" className="dropdown-field">
                  <option value="Chọn giới tính">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              {/* Specialties */}
              <div className="specialty">
                <label for="specialty">
                  Nhu cầu khám <span>*</span>
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  className="dropdown-field"
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
                <label for="appt-date">
                  Đặt lịch khám <span>*</span>
                </label>
                <input
                  className="appt-date-input"
                  type="text"
                  value={formattedDate || ""}
                  readOnly // Make the input read-only
                  onClick={handleClick} // Toggle calendar on click
                ></input>
                {showCalendar && ( // Conditionally render the calendar
                  <Calendar
                    className="calendar-box"
                    onChange={handleChange}
                    value={selectedDate}
                    locale="vi-VN"
                    minDate={new Date()}
                    tileClassName={({ date }) =>
                      date.getDay() === 0 || date.getDay() === 6
                        ? "disabled-weekend"
                        : ""
                    }
                  />
                )}
              </div>
              {/* Symptom Description */}
              <div className="reason-textarea">
                <label for="reason">Mô tả vấn đề sức khoẻ</label>
                <textarea placeholder="Nhập mô tả vấn đề sức khoẻ (không bắt buộc)" />
              </div>
            </div>
          </form>

          {/* Submit Button */}
          <div className="text-center">
            <button className="appt-btn">Đặt lịch khám</button>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}
