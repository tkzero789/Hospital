import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SymptomForm from "../../components/SymptomParts/SymptomForm";

export default function EditSymptom({ userRole, userInfos }) {
  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

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
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [symptomId, navigate]);

  async function confirmEdit() {
    try {
      const response = await axios.put(
        `http://localhost:5000/symptom/edit/${symptom.id}`,
        { ...symptom, status: "Pending Update" }
      );
      if (response.data.message === "Symptom updated successfully") {
        window.alert("Symptom updated successfully");
        navigate("/symptom-table");
      } else {
        window.alert(response.data.message);
      }
    } catch (err) {
      window.alert(`Error: ${err}`);
    }
  }

  // Cancel
  function confirmCancel() {
    navigate("/symptom-table");
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">Edit symptom</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                setSymptom={setSymptom}
                mode="doctor edit"
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
                    confirmCancel();
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={confirmEdit}
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
