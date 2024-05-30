import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SymptomForm from "../../components/SymptomParts/SymptomForm";

export default function ApproveSymptom({ userRole, userInfos }) {
  const { symptomId } = useParams();

  const navigate = useNavigate();
  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [symptom, setSymptom] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/symptom/${symptomId}`).then((res) => {
      setSymptom(res.data);
    });
  }, [symptomId]);

  console.log(symptom);

  async function confirmApprove(e) {
    e.preventDefault();
    if (
      symptom.status === "Pending Create" ||
      symptom.status === "Pending Update" ||
      symptom.status === "Request Edit"
    ) {
      try {
        // Create symptom
        await axios
          .post(`http://localhost:5000/symptom/update/${symptomId}`, {
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
    }
    navigate("/symptom-table");
  }

  async function confirmDelete() {
    try {
      await axios.delete(`http://localhost:5000/symptom/delete/${symptomId}`);
    } catch (err) {
      console.log(`${err}`);
    }
    navigate("/symptom-table");
  }

  return (
    <div>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                mode="view"
                origCats={[]}
                origDescs={[]}
              />
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-2 d-grid gap-2">
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
              {(userRole === "admin" ||
                userInfos.doctorID === symptom.createInfos.doctorID) && (
                <div className="col-2 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
              {userRole === "admin" && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={(e) => {
                      confirmApprove(e);
                    }}
                  >
                    Approve
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
