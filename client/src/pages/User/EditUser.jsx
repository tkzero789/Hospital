import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserForm from "components/UserForm/UserForm";

export default function EditUser() {
  const [user, setUser] = useState({
    id: "",
    email: "",
    phoneNumber: "",
    role: "",
    userInfos: {
      fullName: "",
      gender: "",
      dob: "",
      doctorID: "",
      medSpecialty: "",
    },
    status: "",
  });
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://bayside-render-server.onrender.com/user/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [userId]);

  async function confirmEdit(e) {
    const inputFullName = document.getElementById("inputFullName");
    const inputGender = document.getElementById("inputGender");
    const inputDob = document.getElementById("inputDob");
    const inputEmail = document.getElementById("inputEmail");
    const inputPhoneNumber = document.getElementById("inputPhoneNumber");
    if (!inputEmail.checkValidity()) {
      alert("Invalid email");
      return;
    } else if (!inputPhoneNumber.checkValidity()) {
      alert("Invalid phone number");
      return;
    } else if (
      !inputFullName.checkValidity() ||
      !inputGender.checkValidity() ||
      !inputDob.checkValidity()
    ) {
      alert("Invalid information");
      return;
    } else {
      e.preventDefault();
      const updatedUser = { ...user };
      console.log(updatedUser);
      axios
        .post(
          `https://bayside-render-server.onrender.com/user/update/${userId}`,
          updatedUser
        )
        .then((res) => {
          setUser({
            id: "",
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
            status: "",
          });
          navigate(`/user/${userId}/view`);
        })
        .catch((err) => {
          const message = `Error: ${err}`;
          window.alert(message);
        });
    }
  }

  function updateStatus(newStatus) {
    axios
      .post(
        `https://bayside-render-server.onrender.com/user/update-status/${userId}`,
        {
          status: newStatus,
        }
      )
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
    setUser({ ...user, status: newStatus });
  }

  function confirmDelete() {
    if (window.confirm("Are you sure you want to delete this account?")) {
      axios
        .delete(`https://bayside-render-server.onrender.com/user/${userId}`)
        .catch((err) => {
          const message = `Error: ${err}`;
          window.alert(message);
        });
    }
  }

  return (
    <div>
      <div className="container p-5">
        <div className="card border-0 box-shadow-6 p-5">
          <form>
            <UserForm user={user} setUser={setUser} editMode={true} />
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="c-2 d-grid gap-2">
                {user.status === "Normal" && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    disabled={user.status === "Blocked"}
                    onClick={() => updateStatus("Blocked")}
                  >
                    Block
                  </button>
                )}
                {user.status === "Blocked" && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    disabled={user.status === "Normal"}
                    onClick={() => updateStatus("Normal")}
                  >
                    Un-block
                  </button>
                )}
              </div>
              <div className="c-2 d-grid gap-2 me-auto">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={user.status === "Spam"}
                  onClick={() => confirmDelete()}
                >
                  Delete
                </button>
              </div>
              <div className="c-2 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-secondary"
                  to={`/user/${userId}/view`}
                >
                  Back
                </NavLink>
              </div>
              <div className="c-2 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={(e) => confirmEdit(e)}
                >
                  Confirm edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
