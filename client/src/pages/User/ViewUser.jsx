import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import UserForm from "components/UserForm/UserForm";

export default function ViewUser() {
  const [user, setUser] = useState({
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

  useEffect(() => {
    console.log(userId);
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
    if (window.confirm("Are you sure you want to delete?")) {
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
            <UserForm user={user} editMode={false} />
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
                  to={`/user-table`}
                >
                  Back
                </NavLink>
              </div>
              <div className="c-2 d-grid gap-2">
                <NavLink
                  className="btn btn-warning"
                  to={`/user/${userId}/edit`}
                >
                  Edit
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
