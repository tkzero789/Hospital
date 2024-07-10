import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Signup({ userRole, userInfos }) {
  const [user, setUser] = useState({
    id: uuidv4(),
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
    status: "Normal",
  });

  const updateUserField = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const updateInfoField = (event) => {
    setUser({
      ...user,
      userInfos: {
        ...user.userInfos,
        [event.target.name]: event.target.value,
      },
    });
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
      alert("Invalid email");
      return;
    } else if (!inputPhoneNumber.checkValidity()) {
      alert("Invalid phone number");
      return;
    } else if (!inputPassword.checkValidity()) {
      alert("Invalid password");
      return;
    } else if (
      !inputFullName.checkValidity() ||
      !inputGender.checkValidity() ||
      !inputDob.checkValidity() ||
      !inputDoctorID.checkValidity() ||
      !inputMedSpecialty.checkValidity() ||
      !inputRole.checkValidity()
    ) {
      alert("Invalid info");
      return;
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
          navigate("/user-table");
        })
        .catch((err) => {
          const message = `Error: ${err}`;
          window.alert(message);
          return;
        });
    }
  }

  return (
    <div className="vh-100 bg-gray-1">
      <h3 className="content-container text-center text-blue-2 pt-5">
        Account registration
      </h3>
      <div className="content-container pt-5">
        <div className="border rounded  ">
          <form className="d-flex px-6 py-5 bg-white box-shadow-6 border-radius-1">
            {/* Left box */}
            <div className="c-6 d-flex flex-column pe-8">
              {/* Full name */}
              <div className="pb-4">
                <h6 className="pb-2">Full name:</h6>
                <input
                  type="text"
                  className="form-control border-secondary"
                  id="inputFullName"
                  name="fullName"
                  value={user.userInfos.fullName}
                  required
                  onChange={(e) => updateInfoField(e)}
                />
              </div>
              {/* Gender */}
              <div className="pb-4">
                <h6 className="pb-2">Gender:</h6>
                <select
                  type="text"
                  className="form-control border-secondary"
                  id="inputGender"
                  name="gender"
                  value={user.userInfos.gender}
                  required
                  onChange={(e) => updateInfoField(e)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              {/* DOB */}
              <div className="pb-4">
                <h6 className="pb-2">Date of birth:</h6>
                <input
                  type="text"
                  className="form-control border-secondary"
                  placeholder="mm/dd/yyyy"
                  id="inputDob"
                  name="dob"
                  value={user.userInfos.dob}
                  pattern="^\d{2}\/\d{2}\/\d{4}$"
                  required
                  onChange={(e) => updateInfoField(e)}
                />
              </div>
              {/* Email */}
              <div className="pb-4">
                <h6 className="pb-2">Email:</h6>
                <input
                  type="email"
                  className="form-control border-secondary"
                  id="inputEmail"
                  name="email"
                  value={user.email}
                  placeholder="abc###@gmail.com"
                  required
                  onChange={(e) => updateUserField(e)}
                />
              </div>
              {/* Password */}
              <div className="pb-4">
                <h6 className="pb-2">Password:</h6>
                <input
                  type="password"
                  className="form-control border-secondary"
                  id="inputPassword"
                  name="password"
                  value={user.password}
                  minLength="4"
                  placeholder="Enter password"
                  required
                  onChange={(e) => updateUserField(e)}
                />
              </div>
            </div>
            {/* Right box */}
            <div className="c-6 d-flex flex-column">
              {/* Doctor ID */}
              <div className="pb-4">
                <h6 className="pb-2">Doctor ID:</h6>
                <input
                  type="text"
                  className="form-control border-secondary"
                  id="inputDoctorID"
                  name="doctorID"
                  value={user.userInfos.ageRange}
                  required
                  onChange={(e) => updateInfoField(e)}
                />
              </div>
              {/* Specialty */}
              <div className="pb-4">
                <h6 className="pb-2">Specialty:</h6>
                <select
                  type="text"
                  className="form-control border-secondary"
                  id="inputMedSpecialty"
                  name="medSpecialty"
                  value={user.userInfos.medSpecialty}
                  required
                  onChange={(e) => updateInfoField(e)}
                >
                  <option value="">Select specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Women's care">Women's care</option>
                  <option value="Family Medicine">Family Medicine</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              {/* Role */}
              <div className="pb-4">
                <h6 className="pb-2">Role:</h6>
                <select
                  type="text"
                  className="form-control border-secondary"
                  id="inputRole"
                  name="role"
                  value={user.role}
                  required
                  onChange={(e) => updateUserField(e)}
                >
                  <option value="">Select role</option>
                  <option value="doctor">Doctor</option>
                  <option value="head-doctor">Head doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {/* Phone number */}
              <div className="pb-5">
                <h6 className="pb-2">Phone number:</h6>
                <input
                  type="tel"
                  className="form-control border-secondary"
                  id="inputPhoneNumber"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  pattern="[0-9]{10}"
                  required
                  onChange={(e) => updateUserField(e)}
                />
              </div>
              {/* Buttons */}
              <div className="d-flex justify-content-end pt-2">
                <Link
                  className="btn btn-outline-secondary px-5 me-3"
                  to="/user-table"
                >
                  Back
                </Link>
                <button
                  type="button"
                  className="btn btn-primary px-5"
                  onClick={confirmSignup}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
