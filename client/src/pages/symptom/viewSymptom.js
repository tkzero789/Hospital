import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import axios from "axios";

import SymptomForm from "../../components/SymptomParts/SymptomForm";

export default function ViewSymptom({ userRole, userInfos }) {
  const [symptom, setSymptom] = useState({
    id: "",
    name: "",
    categories: [
      {
        id: "",
        categoryName: "Position",
        descriptions: [
          {
            id: "",
            descriptionDetail: "",
          },
        ],
      },
    ],
    diseaseUsedIds: [],
    createInfos: {
      doctorCreated: "",
      doctorId: "",
      timeCreated: "",
      timeEdited: "",
    },
    status: "",
  });
  const { symptomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom/${symptomId}`)
      .then((res) => {
        const dbsymptom = res.data;
        console.log(dbsymptom);
        if (!dbsymptom) {
          const id = symptomId;
          window.alert(`Symptom with id ${id} not found`);
          navigate("/symptom-table");
          return;
        }
        setSymptom(dbsymptom);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [symptomId, navigate]);

  async function confirmDelete() {
    try {
      await axios.delete(`http://localhost:5000/symptom/delete/${symptomId}`);
    } catch (err) {
      console.log(`${err}`);
    }
    navigate("/symptom-table");
  }

  // Request edit
  function requestEdit() {
    axios
      .post(`http://localhost:5000/symptom/update/${symptomId}`, {
        status: "Request Edit",
      })
      .then((res) => {
        setSymptom(res.data);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
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
              {userRole === "admin" && (
                <div className="col-3 d-grid gap-2">
                  <button className="btn btn-warning" onClick={requestEdit}>
                    Request edit
                  </button>
                </div>
              )}
              {userRole === "head-doctor" && (
                <div className="col-3 d-grid gap-2">
                  <NavLink
                    className="btn btn-warning"
                    to={`/symptom/${symptomId}/edit`}
                  >
                    Edit
                  </NavLink>
                </div>
              )}
              {userRole === "admin" && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={(e) => {
                      confirmDelete(e);
                    }}
                  >
                    Delete
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
