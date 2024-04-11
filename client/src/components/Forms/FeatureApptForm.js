import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import ApptIMG from "../../assets/appt/apptReq.jpg";

export default function FeatureApptForm() {
  // --- DOB: Start ---
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const hasThirtyOneDays = (month, year) => {
    const months31Days = [0, 2, 4, 6, 7, 9, 11]; // Months with 31 days (0-based indexing)
    return months31Days.includes(month - 1); // Subtract 1 from the month to get the zero-based index
  };

  const months = [
    { value: "", label: "Tháng" },
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

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setMonth("");
    setYear("");
    setAppt((apptObject) => ({
      ...apptObject,
      dob: `${selectedDate}/${month}/${year}`,
    }));
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    if (selectedMonth === "02") {
      setYear("");
    }
    const formattedMonth = selectedMonth.padStart(2, "0");
    setMonth(formattedMonth);
    setAppt((apptObject) => ({
      ...apptObject,
      dob: `${date}/${formattedMonth}/${year}`,
    }));
  };

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    setAppt((apptObject) => ({
      ...apptObject,
      dob: `${date}/${month}/${selectedYear}`,
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
  const formattedCalendarDate = calendarDate
    ? calendarDate.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  const handleCalendarChange = (date) => {
    setCalendarDate(date);
    const formattedDate = date.toLocaleDateString("vi-VN", {
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
    } else if (!date) {
      alert("Vui lòng chọn ngày");
    } else if (!month) {
      alert("Vui lòng chọn tháng");
    } else if (!year) {
      alert("Vui lòng chọn năm");
    } else if (appt.gender === "") {
      alert("Vui lòng chọn giới tính");
    } else if (appt.need === "") {
      alert("Vui lòng chọn Nhu cầu khám");
    } else {
      displayModal();
      console.log(appt);
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

  const formatDateForModal = (date) => {
    return date.padStart(2, "0");
  };

  useEffect(() => {
    if (showModal) {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  }, [showModal]);

  // --- Modal: End ---

  return (
    <>
      <div className="appt-img">
        <img src={ApptIMG} alt="Appointment" />
      </div>

      {/* APPOINTMENT FORM */}
      <section className="appt w-100">
        <div className="content-container">
          <div className={`appt-wrapper ${showModal ? "hidden" : ""}`}>
            <div className="appt-title">
              <div className="appt-title-text">Đăng ký khám bệnh</div>
            </div>
            <form className="appt-form">
              <div className="c-4 m-12">
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
              <div className="c-4 m-12">
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
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                    <select
                      id="monthSelect"
                      value={month}
                      onChange={handleMonthChange}
                      disabled={!date}
                    >
                      {months.map(({ value, label }) => (
                        <option
                          key={value}
                          value={value}
                          disabled={
                            (value === "02" &&
                              date !== "" &&
                              parseInt(date, 10) > 29) ||
                            (date === "31" &&
                              !hasThirtyOneDays(
                                parseInt(value, 10),
                                parseInt(year, 10)
                              ))
                          }
                        >
                          {label}
                        </option>
                      ))}
                    </select>
                    <select
                      id="yearSelect"
                      value={year}
                      onChange={handleYearChange}
                      disabled={!month}
                    >
                      <option value="">Năm</option>
                      {years.map((year) => (
                        <option
                          key={year}
                          value={year}
                          disabled={
                            month === "02" && date === "29" && !isLeapYear(year)
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
              <div className="c-4 m-12">
                {/* Appt Date */}
                <div className="appt-date">
                  <label for="appt-date">Đặt lịch khám</label>
                  <div className="appt-date-container d-flex">
                    <input
                      className="appt-date-input"
                      type="text"
                      value={formattedCalendarDate}
                      readOnly // Make the input read-only
                      onClick={handleCalendarClick} // Toggle calendar on click
                      placeholder="Đặt lịch (không bắt buộc)"
                      id="inputDate"
                      name="date"
                      required
                    />
                    <div className="appt-date-icon">
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
              <hr />
              <span>
                <b>Lưu ý:</b> Thời gian{" "}
                <b style={{ fontWeight: "var(--roboto-medium-weight)" }}>
                  đặt lịch khám
                </b>{" "}
                trên chỉ là thời gian dự kiến, tổng đài sẽ liên hệ xác nhận thời
                gian khám chính xác tới quý khách sau khi quý khách đặt hẹn.
              </span>
              <div className="appt-btn">
                <button onClick={validateInput}>Tiếp tục</button>
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
                    {appt.email ? (
                      <>
                        <span>Email:</span>
                        <p>{appt.email}</p>
                      </>
                    ) : null}
                  </div>
                  <div className="appt-modal-data">
                    <span>Ngày sinh:</span>
                    <p>
                      {formatDateForModal(date)}/{month}/{year}
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
                    {appt.date ? (
                      <>
                        <span>Ngày đặt khám:</span>
                        <p>{appt.date}</p>
                      </>
                    ) : null}
                  </div>
                  <div className="appt-modal-data">
                    {appt.reason ? (
                      <>
                        <span>Mô tả vấn đề sức khoẻ:</span>
                        <p>{appt.reason}</p>
                      </>
                    ) : null}
                  </div>
                  <hr style={{ marginTop: "4rem" }} />
                  <div className="attention-text">
                    <p>
                      Tổng đài BKCare sẽ liên hệ Quý khách trong thời gian sớm
                      nhất để xác nhận lịch hẹn. Cảm ơn Quý khách đã lựa chọn
                      dịch vụ của BKCare.
                    </p>
                  </div>
                </div>
                <div className="appt-modal-btn">
                  <button type="button" onClick={closeModal}>
                    Quay lại
                  </button>
                  <button type="button" onClick={confirmSetAppt}>
                    Đăng ký khám
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
