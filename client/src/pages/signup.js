import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

import AdminNavBar from "../components/AdminNavBar";
import SignupLogo from "../assets/signup-logo.png";

export default function Signup() {
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    role: "patient",
    userInfos: {
      firstName: "",
      lastName: "",
      gender: "Nam",
      ageRange: "",
    },
  });

  const updateLastNameField = (event) => {
    let _user = { ...user };
    _user.userInfos[event.target.name] = event.target.value;
    setUser(_user);
  };

  const updateFirstNameField = (event) => {
    let _user = { ...user };
    _user.userInfos[event.target.name] = event.target.value;
    setUser(_user);
  };

  const updateGenderField = (event) => {
    let _user = { ...user };
    _user.userInfos[event.target.name] = event.target.value;
    setUser(_user);
  };

  const updateAgeRangeField = (event) => {
    let _user = { ...user };
    _user.userInfos[event.target.name] = event.target.value;
    setUser(_user);
  };

  const updateEmailField = (event) => {
    let _user = { ...user };
    _user[event.target.name] = event.target.value;
    setUser(_user);
  };

  const updatePhoneNumberField = (event) => {
    let _user = { ...user };
    _user[event.target.name] = event.target.value;
    setUser(_user);
  };

  const updatePasswordField = (event) => {
    let _user = { ...user };
    _user[event.target.name] = event.target.value;
    setUser(_user);
  };

  const navigate = useNavigate();

  async function confirmSignup(e) {
    const inputEmail = document.getElementById("inputEmail");
    const inputPassword = document.getElementById("inputPassword");
    const inputLastName = document.getElementById("inputLastName");
    const inputFirstName = document.getElementById("inputFirstName");
    const inputPhoneNumber = document.getElementById("inputPhoneNumber");
    if (!inputEmail.checkValidity()) {
      alert("Email không hợp lệ");
    } else if (!inputPassword.checkValidity()) {
      alert("Mật khẩu phải có ít nhất 8 ký tự");
    } else if (!inputLastName.checkValidity()) {
      alert("Họ không hợp lệ");
    } else if (!inputFirstName.checkValidity()) {
      alert("Tên không hợp lệ");
    } else if (!inputPhoneNumber.checkValidity()) {
      alert("Số điện thoại không hợp lệ");
    } else {
      e.preventDefault();
      const newUser = { ...user };
      console.log(newUser);
      axios
        .post(
          "https://symptom-checker-with-mern-backend.onrender.com/signup",
          newUser
        )
        .then((res) => {
          console.log("User created");
          console.log(res.data);
          setUser({
            email: "",
            phoneNumber: "",
            password: "",
            role: "patient",
            userInfos: {
              firstName: "",
              lastName: "",
              gender: "Nam",
              ageRange: "",
            },
          });
          navigate("/signup");
        })
        .catch((err) => {
          const message = `An error occurred: ${err}`;
          window.alert(message);
          return;
        });
    }
  }

  // This following section will display the form that takes the input from the user.
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
              <div className="col-6 p-0">
                <div className="row pb-5">
                  <h6 className="col-3 d-flex justify-content-end align-items-center">
                    Họ:
                  </h6>
                  <div className="col-9">
                    <input
                      type="text"
                      className="form-control border-danger-subtle px-2"
                      id="inputLastName"
                      name="lastName"
                      value={user.userInfos.lastName}
                      pattern="[A-Za-z]+"
                      required
                      onChange={(e) => updateLastNameField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-3 d-flex justify-content-end align-items-center">
                    Tên:
                  </h6>
                  <div className="col-9">
                    <input
                      type="text"
                      className="form-control border-danger-subtle px-2"
                      id="inputFirstName"
                      name="firstName"
                      value={user.userInfos.firstName}
                      pattern="[A-Za-z]+"
                      required
                      onChange={(e) => updateFirstNameField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-3 d-flex justify-content-end align-items-center">
                    Giới tính:
                  </h6>
                  <div className="col-9">
                    <select
                      type="text"
                      className="form-control border-danger-subtle px-2"
                      name="gender"
                      defaultValue={"Nam"}
                      onChange={(e) => updateGenderField(e)}
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-3 d-flex justify-content-end align-items-center">
                    Độ tuổi:
                  </h6>
                  <div className="col-9">
                    <select
                      type="text"
                      className="form-control border-danger-subtle px-2"
                      name="ageRange"
                      defaultValue={"Dưới 1 tháng"}
                      onChange={(e) => updateAgeRangeField(e)}
                    >
                      <option value="Dưới 1 tháng">Dưới 1 tháng</option>
                      <option value="1 tuổi - 6 tuổi">1 tuổi - 6 tuổi</option>
                      <option value="6 tuổi - 12 tuổi">6 tuổi - 12 tuổi</option>
                      <option value="12 tuổi - 18 tuổi">
                        12 tuổi - 18 tuổi
                      </option>
                      <option value="18 tuổi - 30 tuổi">
                        18 tuổi - 30 tuổi
                      </option>
                      <option value="30 tuổi - 60 tuổi">
                        30 tuổi - 60 tuổi
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-6 p-0">
                <div className="row pb-5">
                  <h6 className="col-3 d-flex justify-content-end align-items-center">
                    Email:
                  </h6>
                  <div className="col-9">
                    <input
                      type="email"
                      className="form-control border-danger-subtle px-2"
                      id="inputEmail"
                      name="email"
                      placeholder="abc@gmail.com"
                      required
                      onChange={(e) => updateEmailField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-3 d-flex justify-content-end align-items-center">
                    Số điện thoại:
                  </h6>
                  <div className="col-9">
                    <input
                      type="tel"
                      className="form-control border-danger-subtle px-2"
                      id="inputPhoneNumber"
                      name="phoneNumber"
                      pattern="[0-9]{10}"
                      required
                      onChange={(e) => updatePhoneNumberField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-5">
                  <h6 className="col-3 d-flex justify-content-end align-items-center">
                    Mật khẩu:
                  </h6>
                  <div className="col-9">
                    <input
                      type="password"
                      className="form-control border-danger-subtle px-2"
                      id="inputPassword"
                      name="password"
                      minlength="8"
                      placeholder="Ít nhất 8 ký tự"
                      required
                      onChange={(e) => updatePasswordField(e)}
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
              <div className="col-4 d-flex justify-content-center">
                Bạn đã có tài khoản? &nbsp;
                <NavLink
                  className="text-danger text-decoration-underline"
                  to="/signin"
                >
                  Đăng nhập ngay
                </NavLink>
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center pt-5">
          <img style={{ width: 25 + "%" }} src={SignupLogo}></img>
        </div>
      </div>
    </div>
  );
}
