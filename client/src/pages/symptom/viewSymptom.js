import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

export default function ViewSymptom({ userInfos }) {
  const [symptom, setSymptom] = useState({
    id: "",
    symptomName: "",
    categories: [
      {
        id: "",
        categoryName: "Vị trí",
        descriptions: [
          {
            id: "",
            descriptionDetail: "",
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
  });
  const { symptomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom/${symptomId}`)
      .then((res) => {
        const dbsymptom = res.data;
        if (!dbsymptom) {
          const id = symptomId;
          window.alert(`Symptom with id ${id} not found`);
          navigate("/create-symptom");
          return;
        }
        setSymptom(dbsymptom);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [symptomId, navigate]);

  return (
    <div>
      <div className="container p-5">
        <div className="card border-secondary-subtle p-5">
          <div className="form-group row pb-5">
            <h4 className="card-title text-body col-3">Tên triệu chứng:</h4>
            <input
              type="text"
              className="form-control border-secondary-subtle col"
              name="name"
              value={symptom.name}
              readOnly
            />
          </div>
          <h4 className="card-title text-body">Chỉnh sửa mô tả chi tiết:</h4>
          {symptom.categories.map((category) => {
            return (
              <div key={category.id}>
                <div className="form row pb-3 mt-5">
                  <div className="col-2" style={{ display: "flex" }}>
                    <h5 className="text-body">Thuộc tính:</h5>
                  </div>
                  <input
                    name="categoryName"
                    value={category.categoryName}
                    className="form-control border-secondary-subtle col"
                    readOnly
                  ></input>
                </div>
                <div className="row">
                  {category.descriptions.map((description) => (
                    <div
                      className="form-group pb-3 col-12"
                      style={{ display: "flex" }}
                    >
                      <input
                        name="descriptionDetail"
                        value={description.descriptionDetail}
                        type="text"
                        className="form-control border-secondary-subtle "
                        placeholder="Mô tả"
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="row pt-3 justify-content-end">
            <div className="col-3 d-grid gap-2">
              <NavLink
                className="btn btn-outline-primary"
                to={`/symptom-table`}
              >
                QUAY LẠI
              </NavLink>
            </div>
            {userInfos.doctorID === symptom.createInfos.doctorID && (
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/symptom/${symptomId}/edit`}
                >
                  CHỈNH SỬA TRIỆU CHỨNG
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
