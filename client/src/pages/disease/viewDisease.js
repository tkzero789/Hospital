import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

import DiseaseName from "../../components/DiseaseParts/DiseaseName";

export default function ViewDisease({ userInfos }) {
  const [disease, setDisease] = useState({
    id: "",
    name: "",
    ageRanges: [],
    genders: [],
    symptoms: [],
    medSpecialty: "",
    relatedArticles: [],
    createInfos: {
      doctorCreated: "",
      doctorId: "",
      timeCreated: "",
      timeEdited: "",
    },
  });
  const { diseaseId } = useParams();
  const navigate = useNavigate();

  // get disease from DB by diseaseId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/${diseaseId}`)
      .then((res) => {
        const dbdisease = res.data;
        if (!dbdisease) {
          window.alert(`Không tìm thấy căn bệnh với id ${diseaseId}`);
          navigate("/disease-table");
          return;
        }
        setDisease(dbdisease);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [diseaseId, navigate]);

  // delete disease
  async function onDelete(id) {
    if (window.confirm("Bạn có chắc muốn xóa căn bệnh này?")) {
      axios
        .delete(`http://localhost:5000/disease/${id}`)
        .then(() => {
          navigate("/disease-table");
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
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
                  editMode={false}
                />
              }
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/disease-table`}
                >
                  QUAY LẠI
                </NavLink>
              </div>
              {userInfos.doctorID === disease.createInfos.doctorID && (
                <div className="col-3 d-grid gap-2">
                  <NavLink
                    className="btn btn-outline-primary"
                    to={`/disease/${diseaseId}/edit`}
                  >
                    CHỈNH SỬA CĂN BỆNH
                  </NavLink>
                </div>
              )}
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/disease/${diseaseId}/article-table`}
                >
                  DANH SÁCH BÀI VIẾT
                </NavLink>
              </div>
              {userInfos.doctorID === disease.createInfos.doctorID && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(disease.id)}
                  >
                    XÓA CĂN BỆNH
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
