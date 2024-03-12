import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TestApptForm() {
  const [startDate, setStartDate] = useState(new Date());
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
                  Giới tính <span>*</span>
                </label>
                <select
                  id="appt-date"
                  name="appt-date"
                  className="dropdown-field"
                >
                  <option value="Chọn giới tính">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              {/* Symptom Description */}
              <div className="reason-textarea">
                <label for="reason">Mô tả vấn đề sức khoẻ</label>
                <textarea placeholder="Nhập mô tả vấn đề sức khoẻ (không bắt buộc)" />
              </div>
            </div>
          </form>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          {/* Submit Button */}
          <div className="text-center">
            <button className="appt-btn">Đặt lịch khám</button>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}
