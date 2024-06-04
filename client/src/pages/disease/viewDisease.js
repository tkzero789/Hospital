import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import DiseaseName from "../../components/DiseaseParts/DiseaseName";

export default function ViewDisease({ userRole, userInfos }) {
  const [disease, setDisease] = useState([]);
  const [dbSymps, setDbSymps] = useState([]);
  const { diseaseId } = useParams();
  const navigate = useNavigate();

  // get disease from DB by diseaseId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/${diseaseId}`)
      .then((res) => {
        console.log(res.data);
        const dbdisease = res.data;
        setDisease(dbdisease);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [diseaseId, navigate]);

  // get symptoms from DB
  useEffect(() => {
    axios
      .get("http://localhost:5000/symptom")
      .then((res) => {
        setDbSymps(res.data);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  // delete disease
  async function confirmDelete() {
    try {
      await axios.delete(`http://localhost:5000/disease/delete/${diseaseId}`);
    } catch (err) {
      console.log(`${err}`);
    }
    navigate("/disease-table");
  }

  async function confirmApprove() {
    if (
      disease.status === "Pending Create" ||
      disease.status === "Pending Update" ||
      disease.status === "Request Edit"
    ) {
      try {
        // Update status symptom
        await axios
          .put(`http://localhost:5000/disease/update/${diseaseId}`, {
            status: "Approved",
          })
          .then((res) => {
            if (res.data && res.data.message === "Symptom already exists") {
              throw new Error("Duplicated symptom!");
            }
            console.log("Symptom created", res.data);
          });
      } catch (err) {
        const message = `Error: ${err}`;
        window.alert(message);
      }
    } else if (disease.status === "Approved") {
      try {
        // Update status symptom
        await axios
          .put(`http://localhost:5000/disease/update/${diseaseId}`, {
            status: "Request Edit",
          })
          .then((res) => {
            if (res.data && res.data.message === "Symptom already exists") {
              throw new Error("Duplicated symptom!");
            }
            console.log("Symptom created", res.data);
          });
      } catch (err) {
        const message = `Error: ${err}`;
        window.alert(message);
      }
    }
    navigate("/disease-table");
  }

  return (
    <div>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              {
                <DiseaseName
                  disease={disease}
                  setDisease={setDisease}
                  dbSymps={dbSymps}
                  mode="view"
                />
              }
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/disease/${diseaseId}/article-table`}
                >
                  Articles
                </NavLink>
              </div>
              {userRole === "admin" && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
              {userInfos.doctorID === disease?.createInfos?.doctorID &&
                disease.status === "Request Edit" && (
                  <div className="col-3 d-grid gap-2">
                    <NavLink
                      className="btn btn-warning"
                      to={`/disease/${diseaseId}/edit`}
                    >
                      Edit
                    </NavLink>
                  </div>
                )}
              {userRole === "admin" && disease.status !== "Approved" && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={confirmApprove}
                  >
                    Approve
                  </button>
                </div>
              )}
              {userRole === "admin" && disease.status === "Approved" && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={confirmApprove}
                  >
                    Request edit
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
