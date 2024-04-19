import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminNavBar from "../components/Navbar/AdminNavBar";
import SignupLogo from "../assets/logo/signup-logo.png";

export default function Signup() {
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    userInfos: {
      fullName: "",
      gender: "",
      dob: "",
      doctorID: null,
      medSpecialty: null,
    },
  });

  const updateUserField = (event) => {
    let _user = { ...user };
    _user[event.target.name] = event.target.value;
    setUser(_user);
  };

  const updateInfoField = (event) => {
    let _user = { ...user };
    _user.userInfos[event.target.name] = event.target.value;
    setUser(_user);
  };

  const navigate = useNavigate();

  async function confirmSignup(e) {
    const inputFullName = document.getElementById("inputFullName");
    const inputGender = document.getElementById("inputGender");
    const inputDob = document.getElementById("inputDob");
    const inputDoctorID = document.getElementById("inputDoctorID");
    const inputMedSpecialty = document.getElementById("inputMedSpecialty");
    const inputRole = document.getElementById("inputRole");
    const inputEmail = document.getElementById("inputEmail");
    const inputPhoneNumber = document.getElementById("inputPhoneNumber");
    const inputPassword = document.getElementById("inputPassword");
    if (!inputEmail.checkValidity()) {
      alert("Email không hợp lệ");
    } else if (!inputPhoneNumber.checkValidity()) {
      alert("Số điện thoại không hợp lệ");
    } else if (!inputPassword.checkValidity()) {
      alert("Mật khẩu phải có ít nhất 8 ký tự");
    } else if (
      !inputFullName.checkValidity() &&
      !inputGender.checkValidity() &&
      !inputDob.checkValidity() &&
      !inputDoctorID.checkValidity() &&
      !inputMedSpecialty.checkValidity() &&
      !inputRole.checkValidity()
    ) {
      alert("Thông tin cá nhân không hợp lệ");
    } else {
      e.preventDefault();
      const newUser = { ...user };
      console.log(newUser);
      axios
        .post("http://localhost:5000/signup", newUser)
        .then((res) => {
          console.log("User created");
          console.log(res.data);
          setUser({
            email: "",
            phoneNumber: "",
            password: "",
            role: "",
            userInfos: {
              fullName: "",
              gender: "",
              dob: "",
              doctorID: null,
              medSpecialty: null,
            },
          });
          navigate("/signin");
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
          return;
        });
    }
  }

  return (
    <div>
      <AdminNavBar />
      <h3 className="container text-center text-danger pt-5">
        ĐĂNG KÝ TÀI KHOẢN
      </h3>
      <div className="container p-5">
        <div className="card border-danger-subtle p-5">
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-12 p-0">
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Họ và tên:
                  </h6>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control border-danger-subtle px-2"
                      id="inputFullName"
                      name="fullName"
                      value={user.userInfos.fullName}
                      required
                      onChange={(e) => updateInfoField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Giới tính:
                  </h6>
                  <div className="col-10">
                    <select
                      type="text"
                      className="form-control border-danger-subtle px-2"
                      id="inputGender"
                      name="gender"
                      value={user.userInfos.gender}
                      required
                      onChange={(e) => updateInfoField(e)}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Ngày sinh:
                  </h6>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control border-danger-subtle px-2"
                      placeholder="dd/mm/yyyy"
                      id="inputDob"
                      name="dob"
                      value={user.userInfos.dob}
                      pattern="^\d{2}\/\d{2}\/\d{4}$"
                      required
                      onChange={(e) => updateInfoField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Mã số bác sĩ:
                  </h6>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control border-danger-subtle px-2"
                      id="inputDoctorID"
                      name="doctorID"
                      value={user.userInfos.ageRange}
                      required
                      onChange={(e) => updateInfoField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Chuyên khoa:
                  </h6>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control border-danger-subtle px-2"
                      id="inputMedSpecialty"
                      name="medSpecialty"
                      value={user.userInfos.medSpecialty}
                      required
                      onChange={(e) => updateInfoField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Chức danh:
                  </h6>
                  <div className="col-10">
                    <select
                      type="text"
                      className="form-control border-danger-subtle px-2"
                      id="inputRole"
                      name="role"
                      value={user.role}
                      required
                      onChange={(e) => updateUserField(e)}
                    >
                      <option value="">Chọn chức danh</option>
                      <option value="doctor">Bác sĩ</option>
                      <option value="head-doctor">Bác sĩ trưởng khoa</option>
                      <option value="admin">Quản trị viên</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-12 p-0">
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Email:
                  </h6>
                  <div className="col-10">
                    <input
                      type="email"
                      className="form-control border-danger-subtle px-2"
                      id="inputEmail"
                      name="email"
                      value={user.email}
                      placeholder="abc@gmail.com"
                      required
                      onChange={(e) => updateUserField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Số điện thoại:
                  </h6>
                  <div className="col-10">
                    <input
                      type="tel"
                      className="form-control border-danger-subtle px-2"
                      id="inputPhoneNumber"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      pattern="[0-9]{10}"
                      required
                      onChange={(e) => updateUserField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-2 d-flex justify-content-end align-items-center">
                    Mật khẩu:
                  </h6>
                  <div className="col-10">
                    <input
                      type="password"
                      className="form-control border-danger-subtle px-2"
                      id="inputPassword"
                      name="password"
                      value={user.password}
                      minLength="8"
                      placeholder="Ít nhất 8 ký tự"
                      required
                      onChange={(e) => updateUserField(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row pt-3 pb-3 justify-content-center">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={confirmSignup}
                >
                  XÁC NHẬN ĐĂNG KÝ
                </button>
              </div>
            </div>
            <div className="row pb-3 justify-content-center">
              <div className="col-12 pb-3 d-flex justify-content-center">
                Bạn đã có tài khoản? &nbsp;
                <NavLink
                  className="text-danger text-decoration-underline"
                  to="/signin"
                >
                  Đăng nhập ngay
                </NavLink>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <NavLink
                  className="text-danger text-decoration-underline"
                  to="/signup-doctor"
                >
                  Đăng ký tài khoản bác sĩ
                </NavLink>
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center pt-5">
          <img alt="" style={{ width: 25 + "%" }} src={SignupLogo}></img>
        </div>
      </div>
    </div>
  );
}
