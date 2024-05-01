import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import SymptomForm from "../../components/SymptomParts/SymptomForm";

export default function EditSymptom({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

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
    doctorReqID: "",
  });
  // store original name to check duplicate if admin changes the name
  const [origName, setOrigName] = useState("");
  // store original categories and descriptions id to set readOnly if not admin edit mode
  const [origCats, setOrigCats] = useState([]);
  const [origDescs, setOrigDescs] = useState([]);
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
          navigate("/symptom-table");
          return;
        }
        setSymptom({
          ...dbsymptom,
          createInfos: {
            ...dbsymptom.createInfos,
            timeEdited: formattedDate,
          },
          status: "Pending Update",
          doctorReqID: userInfos.doctorID,
        });
        setOrigName(dbsymptom.name);
        setOrigCats(dbsymptom.categories.map((cat) => cat.id));
        setOrigDescs(
          dbsymptom.categories
            .flatMap((cat) => cat.descriptions)
            .map((desc) => desc.id)
        );
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [symptomId, navigate]);

  async function confirmAdminEdit(e) {
    if (symptom.name === "") {
      window.alert("Chưa nhập tên bệnh");
      return;
    } else if (symptom.categories.length === 0) {
      window.alert("Triệu chứng chưa có mô tả nào");
      return;
    } else {
      for (const cat of symptom.categories) {
        for (const des of cat.descriptions) {
          if (des.descriptionDetail === "") {
            window.alert("Chưa nhập mô tả");
            return;
          }
        }
      }
    }
    e.preventDefault();
    if (origName !== symptom.name) {
      await axios
        .get(`http://localhost:5000/symptom/${symptom.name}`)
        .then((res) => {
          if (res.data) {
            window.alert("Căn bệnh cùng tên đã có trong database");
            return;
          }
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
    axios
      .post(
        `http://localhost:5000/symptom/update/${symptomId}`,
        { ...symptom, status: "Approved" },
        apiConfig
      )
      .then((res) => {
        console.log("Symptom edited", res.data);
        navigate(`/symptom/${symptomId}/view`);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }

  async function confirmEdit(e) {
    if (symptom.name === "") {
      window.alert("Chưa nhập tên bệnh");
      return;
    } else if (symptom.categories.length === 0) {
      window.alert("Triệu chứng chưa có mô tả nào");
      return;
    } else
      for (const cat of symptom.categories) {
        for (const des of cat.descriptions) {
          if (des.descriptionDetail === "") {
            window.alert("Chưa nhập mô tả");
            return;
          }
        }
      }
    e.preventDefault();
    axios
      .post(`http://localhost:5000/symptom-temp/add`, symptom, apiConfig)
      .then((res) => {
        if (res.data && res.data.message === "Symptom already exists") {
          window.alert(
            "Bạn đã chỉnh sửa căn bệnh này, vui lòng đợi admin xét duyệt!"
          );
          return;
        }
        console.log("Symptom edited", res.data);
        setSymptom({
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
          doctorReqID: "",
        });
        navigate(`/symptom-table`);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">
        CHỈNH SỬA TRIỆU CHỨNG VÀ MÔ TẢ
      </h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <SymptomForm
                symptom={symptom}
                setSymptom={setSymptom}
                mode={userRole === "admin" ? "admin edit" : "doctor edit"}
                origCats={origCats}
                origDescs={origDescs}
              />
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/symptom/${symptomId}/view`}
                >
                  HỦY CHỈNH SỬA CĂN BỆNH
                </NavLink>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={
                    userRole === "admin"
                      ? (e) => {
                          confirmAdminEdit(e);
                        }
                      : (e) => {
                          confirmEdit(e);
                        }
                  }
                >
                  XÁC NHẬN CHỈNH SỬA
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
