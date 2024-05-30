import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import SymptomForm from "../../components/SymptomParts/SymptomForm";

export default function CreateSymptom({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [symptom, setSymptom] = useState({
    id: uuidv4(),
    name: "",
    position: "Head",
    categories: [
      {
        id: uuidv4(),
        categoryName: "Position",
        descriptions: [
          {
            id: uuidv4(),
            descriptionDetail: "",
          },
        ],
      },
    ],
    createInfos: {
      doctorCreated: userInfos.fullName,
      doctorID: userInfos.doctorID,
      timeCreated: formattedTime,
      timeEdited: null,
    },
    status: "Pending Create",
    doctorReqID: userInfos.doctorID,
  });

  const navigate = useNavigate();

  function confirmCancel() {
    navigate("/symptom-table");
  }

  async function confirmCreate(e) {
    if (symptom.name === "") {
      window.alert("Please enter symptom name");
      return;
    } else if (symptom.categories.length === 0) {
      window.alert("Please add symptom's description");
      return;
    } else
      for (const cat of symptom.categories) {
        for (const des of cat.descriptions) {
          if (des.descriptionDetail === "") {
            window.alert("Please add symptom's description");
            return;
          }
        }
      }
    e.preventDefault();
    try {
      // Create new symptom
      const updatedSymptom = { ...symptom };
      await axios
        .post("http://localhost:5000/symptom/add", updatedSymptom, apiConfig)
        .then((res) => {
          if (res.data && res.data.message === "Symptom already exists") {
            throw new Error("Duplicated symptom!");
          }
          console.log("Symptom created", res.data);
        });
      navigate(`/symptom-table`);
    } catch (err) {
      const message = `Error: ${err}`;
      window.alert(message);
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">Create symptom</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                setSymptom={setSymptom}
                mode="create"
                origCats={[]}
                origDescs={[]}
              />
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    confirmCancel();
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    confirmCreate(e);
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
