import React, { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import SymptomForm from "../../components/SymptomParts/SymptomForm";
import { NavLink } from "react-router-dom";

export default function CreateSymptom({ userRole, userInfos }) {
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [symptom, setSymptom] = useState({
    id: uuidv4(),
    name: "",
    position: "Đầu",
    categories: [
      {
        id: uuidv4(),
        categoryName: "Vị trí",
        descriptions: [
          {
            id: uuidv4(),
            descriptionDetail: "",
            descriptionImg: "",
          },
        ],
      },
    ],
    createInfos: {
      doctorCreated: "admin",
      doctorId: "admin",
      timeCreated: formattedDate,
      timeEdited: null,
    },
    status: "Approved",
  });

  const navigate = useNavigate();

  async function confirmCreate(e) {
    e.preventDefault();
    const newSymptom = { ...symptom };
    axios
      .post("http://localhost:5000/symptom/add", newSymptom)
      .then((res) => {
        console.log("Symptom created", res.data);
        setSymptom({
          id: uuidv4(),
          name: "",
          position: "Đầu",
          categories: [
            {
              index: uuidv4(),
              categoryName: "Vị trí",
              descriptions: [
                {
                  index: uuidv4(),
                  descriptionDetail: "",
                },
              ],
            },
          ],
          status: "Approved",
        });
        navigate("/symptom-table");
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">
        TẠO TRIỆU CHỨNG VÀ MÔ TẢ
      </h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                setSymptom={setSymptom}
                editMode={true}
              />
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/symptom-table`}
                >
                  HỦY TẠO CĂN BỆNH
                </NavLink>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    confirmCreate(e);
                  }}
                >
                  XÁC NHẬN TẠO
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
