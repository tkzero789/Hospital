import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import { useAuth } from "AuthContext";
import axios from "axios";
import BaySideLogo from "assets/logo/BaySide-logo-1.svg";
import "pages/account/account.css";

export default function SigninStaff() {
  // User
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    role: "patient",
  });
  const { login } = useAuth();

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

  // Confirm Sign In
  async function confirmSignin(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/signin", user)
      .then((res) => {
        console.log("Signed in");
        console.log(res.data);
        setUser({
          email: "",
          phoneNumber: "",
          password: "",
          role: "patient",
        });
        const token = res.data.token;
        login(token);
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          toast.error("Wrong username or password. Please try again");
        } else {
          const message = `Error: ${err}`;
          window.alert(message);
        }
        return;
      });
  }

  // Check for empty input
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const checkInputEmpty = () => {
    const isEmpty = (!user.email && !user.phoneNumber) || !user.password;
    setIsInputEmpty(isEmpty);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Login</title>
        </Helmet>
      </HelmetProvider>

      <div className="signin-bg">
        <div className="signin">
          <NavLink to="/home">
            <img src={BaySideLogo} alt="hospital logo"></img>
          </NavLink>
          <div className="shape r-shape"></div>
          <div className="shape l-shape"></div>
          <div className="signin-wrapper zi">
            <div className="content-container">
              <div className="signin-box">
                <div className="c-6 m-12 signin-left">
                  <div className="signin-left-container">
                    <div className="signin-left-header">
                      <span>Features:</span>
                    </div>
                    <div className="signin-left-body">
                      <span>
                        By creating an account, you will be able to:
                        <br />
                      </span>
                      <ul className="signin-left-list">
                        <li>
                          Use our online diagnostic services anytime, anywhere.
                        </li>
                        <li>
                          Review your diagnostic results easily and quickly.
                        </li>
                        <li>
                          Receive updates and support from our team of experts.
                        </li>
                      </ul>
                    </div>
                    <div className="signin-left-btn">
                      <NavLink to="/signup">
                        <button type="button">Register account</button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="c-6 md-12 signin-right">
                  <div className="signin-right-container">
                    <div className="signin-right-header">
                      <span>Login</span>
                    </div>
                    <div className="signin-right-form">
                      <form>
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          required
                          onChange={(e) => updateEmailOrPhoneField(e)}
                          className={`${
                            !user.email && !user.phoneNumber && isInputEmpty
                              ? "empty"
                              : ""
                          }`}
                        ></input>
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          required
                          onChange={(e) => updatePasswordField(e)}
                          className={`${
                            !user.password && isInputEmpty ? "empty" : ""
                          }`}
                        ></input>
                      </form>
                    </div>
                    <div className="signin-right-btn">
                      <Toaster
                        toastOptions={{
                          className: "toast-noti-3",
                        }}
                        position="top-center"
                        richColors
                      />
                      <form>
                        <button
                          type="button"
                          onClick={(e) => {
                            checkInputEmpty();
                            if (!isInputEmpty) {
                              confirmSignin(e);
                            }
                          }}
                        >
                          Login
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="signin-footer zi text-center">
            <span className="text-white">
              Copyright © 2024 BKC. All rights reserved.
            </span>
            <div>
              <NavLink className="text-decoration-none ">
                <span>Privacy Policy</span>
              </NavLink>
              <NavLink className="text-decoration-none ">
                <span>Terms of Use</span>
              </NavLink>
              <NavLink className="text-decoration-none ">
                <span>Supports</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
