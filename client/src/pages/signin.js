import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

import AdminNavBar from "../components/AdminNavBar";
import SignupLogo from "../assets/signup-logo.png";

export default function Signin() {
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    role: "patient",
  });

  const updateEmailOrPhoneField = (event) => {
    let _user = { ...user };
    const inputValue = event.target.value.trim();
    if (inputValue.includes("@")) {
      _user["email"] = event.target.value;
    } else {
      _user["phoneNumber"] = event.target.value;
    }
    setUser(_user);
  };

  const updatePasswordField = (event) => {
    let _user = { ...user };
    _user[event.target.name] = event.target.value;
    setUser(_user);
  };

  const navigate = useNavigate();

  async function confirmSignin(e) {
    e.preventDefault();
    const newUser = { ...user };
    console.log(newUser);
    axios
      .post(
        "https://symptom-checker-with-mern-backend.onrender.com/signin",
        user
      )
      .then((res) => {
        console.log("Signed in");
        console.log(res.data);
        setUser({
          email: "",
          phoneNumber: "",
          password: "",
          role: "patient",
        });
        navigate("/signin");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // Invalid login credentials
          window.alert("Thông tin đăng nhập không chính xác. Vui lòng thử lại");
        } else {
          const message = `An error occurred: ${err}`;
          window.alert(message);
        }
        return;
      });
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <AdminNavBar />
      <div className="row">
        <div className="col-4 d-flex justify-content-center align-items-center pt-5">
          <img style={{ width: 75 + "%" }} src={SignupLogo}></img>
        </div>
        <div className="col-8">
          <h3 className="container text-center text-danger pt-5">ĐĂNG NHẬP</h3>
          <div className="container p-5">
            <div className="card border-danger-subtle p-3 pt-4">
              <form className="needs-validation" noValidate>
                <div className="row pb-3">
                  <h6 className="col-3 d-flex justify-content-end align-items-center">
                    Email/Số điện thoại:
                  </h6>
                  <div className="col-9">
                    <input
                      type="text"
                      className="form-control border-danger-subtle px-2"
                      id="inputEmailOrPhone"
                      name=""
                      required
                      onChange={(e) => updateEmailOrPhoneField(e)}
                    />
                  </div>
                </div>
                <div className="row pb-3">
                  <h6 className="col-3 d-flex justify-content-end align-items-center">
                    Mật khẩu
                  </h6>
                  <div className="col-9">
                    <input
                      type="password"
                      className="form-control border-danger-subtle px-2"
                      id="inputPassword"
                      name="password"
                      minlength="8"
                      required
                      onChange={(e) => updatePasswordField(e)}
                    />
                  </div>
                </div>

                <div className="row pt-3 pb-3 justify-content-center">
                  <div className="col-3 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={(e) => confirmSignin(e)}
                    >
                      ĐĂNG NHẬP
                    </button>
                  </div>
                </div>
                <div className="row pb-3 justify-content-center">
                  <div className="col-4 d-flex justify-content-center">
                    Bạn chưa có tài khoản? &nbsp;
                    <NavLink
                      className="text-danger text-decoration-underline"
                      to="/signup"
                    >
                      Đăng ký ngay
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
