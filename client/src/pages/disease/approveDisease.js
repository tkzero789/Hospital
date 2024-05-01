import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

import DiseaseName from "../../components/DiseaseParts/DiseaseName";

export default function ApproveDisease({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
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
    status: "",
  });
  const [tempSymps, setTempSymps] = useState([]);
  const { diseaseId } = useParams();
  const navigate = useNavigate();

  // get disease from DB temp by diseaseId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease-temp/${diseaseId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
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

  // approve disease
  async function onApprove() {
    const symptomIds = disease.symptoms.map((symptom) => symptom.id);
    await axios
      .post(
        `http://localhost:5000/symptom-temp/by-ids`,
        {
          ids: symptomIds,
          diseaseId: diseaseId,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      .then((res) => {
        setTempSymps(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    const editedSymptoms = tempSymps
      .filter((symp) => symp.status === "Pending Update")
      .map((editedSymp) => ({ ...editedSymp, status: "Approved" }));
    const newSymptoms = tempSymps
      .filter((symp) => symp.status === "Pending Create")
      .map((newSymp) => ({ ...newSymp, status: "Approved" }));
    console.log(newSymptoms);
    console.log(editedSymptoms);
    console.log(disease);
    return;
    // update edited symptoms
    const updatePromises = [];
    if (editedSymptoms.length > 0) {
      for (const editedSymptom of editedSymptoms) {
        updatePromises.push(
          axios
            .post(
              `http://localhost:5000/symptom/update-from-disease/${editedSymptom.id}`,
              editedSymptom,
              {
                headers: { Authorization: `Bearer ${userToken}` },
              }
            )
            .then((res) => {
              console.log("Symptom edited", res.data);
            })
            .catch((err) => {
              const message = `Có lỗi xảy ra: ${err}`;
              window.alert(message);
            })
        );
      }
    }
    // create new symptoms from disease
    const createPromises = [];
    if (newSymptoms.length > 0) {
      for (const newSymptom of newSymptoms) {
        createPromises.push(
          axios
            .post("http://localhost:5000/symptom/add", newSymptom, {
              headers: { Authorization: `Bearer ${userToken}` },
            })
            .then((res) => {
              if (res.data && res.data.message === "Symptom already exists") {
                window.alert("Triệu chứng đã tồn tại!");
              } else {
                console.log("Symptom created", res.data);
              }
            })
            .catch((err) => {
              const message = `Có lỗi xảy ra: ${err}`;
              window.alert(message);
            })
        );
      }
    }
    // create new disease
    if (disease.status === "Pending Create") {
    }
    const _disease = { ...disease, status: "Approved" };
    try {
      await Promise.all([...updatePromises, ...createPromises]);
      if (disease.status === "Pending Create") {
        const response = await axios.post(
          "http://localhost:5000/disease/add",
          _disease,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        if (
          response.data &&
          response.data.message === "Disease already exists"
        ) {
          window.alert("Căn bệnh đã tồn tại!");
        } else {
          console.log("Căn bệnh đã được thêm vào", response.data);
          setDisease({
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
            status: "",
          });
        }
      } else if (disease.status === "Pending Update") {
        const response = await axios.post(
          `http://localhost:5000/disease/update/${diseaseId}`,
          _disease,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        console.log("Căn bệnh đã được cập nhật", response.data);
        setDisease({
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
          status: "",
        });
      }
    } catch (err) {
      console.error("Error during symptom updates/creations:", err);
      window.alert("Có lỗi xảy ra khi cập nhật/tạo triệu chứng!");
    }
    onDelete();
  }

  // delete disease
  async function onDelete() {
    if (
      window.confirm("Bạn có chắc muốn xóa căn bệnh này ở bộ nhớ tạm thời?")
    ) {
      axios
        .delete(`http://localhost:5000/disease-temp/${diseaseId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
      for (const symptom of disease.symptoms) {
        axios
          .delete(
            `http://localhost:5000/symptom-temp/${symptom.id}/${diseaseId}`,
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          )
          .then((res) => {
            console.log("Symptom deleted in temp", res.data);
            navigate("/disease-table");
          })
          .catch((err) => {
            const message = `Có lỗi xảy ra: ${err}`;
            window.alert(message);
          });
      }
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
              {userRole === "admin" && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => onApprove()}
                  >
                    DUYỆT CĂN BỆNH
                  </button>
                </div>
              )}
              {(userRole === "admin" ||
                userInfos.doctorID === disease.createInfos.doctorID) && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete()}
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
