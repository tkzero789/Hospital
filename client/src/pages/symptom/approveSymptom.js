import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SymptomForm from "../../components/SymptomParts/SymptomForm";

export default function ApproveSymptom({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const [symptom, setSymptom] = useState({
    id: "",
    name: "",
    position: "",
    categories: [
      {
        id: "",
        categoryName: "Vị trí",
        descriptions: [
          {
            id: "",
            descriptionDetail: "",
            descriptionImg: "",
          },
        ],
      },
    ],
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
      .get(`http://localhost:5000/symptom-temp/${symptomId}/`, apiConfig)
      .then((res) => {
        const dbsymptom = res.data;
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

  async function confirmApprove(e) {
    e.preventDefault();
    if (symptom.status === "Pending Create") {
      axios
        .post(
          `http://localhost:5000/symptom/add/`,
          { ...symptom, status: "Approved" },
          apiConfig
        )
        .then((res) => {
          if (res.data && res.data.message === "Symptom already exists") {
            window.alert("Căn bệnh cùng tên đã có trong cơ sở dữ liệu!");
            return;
          }
          console.log("Symptom created", res.data);
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    } else if (symptom.status === "Pending Update") {
      await axios
        .get(`http://localhost:5000/symptom/${symptom.name}`)
        .then((res) => {
          if (res.data) {
            window.alert("Căn bệnh cùng tên đã có trong cơ sở dữ liệu");
          }
          return;
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
      await axios
        .post(
          `http://localhost:5000/symptom/update/${symptomId}`,
          { ...symptom, status: "Approved" },
          apiConfig
        )
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
    confirmDelete(e);
  }

  function confirmDelete(e) {
    e.preventDefault();
    if (window.confirm("Xóa căn bệnh này trong bộ nhớ tạm thời?")) {
      axios
        .delete(`http://localhost:5000/symptom-temp/${symptomId}`, apiConfig)
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
      navigate(`/symptom-table`);
    }
  }

  return (
    <div>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                setSymptom={setSymptom}
                editMode={false}
              />
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/symptom-table`}
                >
                  QUAY LẠI
                </NavLink>
              </div>
              {userRole === "admin" && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={(e) => {
                      confirmApprove(e);
                    }}
                  >
                    XÁC NHẬN DUYỆT
                  </button>
                </div>
              )}
              {(userRole === "admin" ||
                userInfos.doctorID === symptom.createInfos.doctorID) && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={(e) => {
                      confirmDelete(e);
                    }}
                  >
                    XÁC NHẬN XÓA
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
