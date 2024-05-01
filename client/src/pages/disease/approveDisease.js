import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

import DiseaseName from "../../components/DiseaseParts/DiseaseName";

export default function ApproveDisease({ userRole, userInfos }) {
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
  const { diseaseId } = useParams();
  const navigate = useNavigate();

  // get disease from DB by diseaseId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease-temp/${diseaseId}`)
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
    let tempSymptoms = [];
    const symptomIds = disease.symptoms.map((symptom) => symptom.id);
    await axios
      .post(`http://localhost:5000/symptom-temp/by-ids`, {
        ids: symptomIds,
        diseaseId: diseaseId,
      })
      .then((res) => {
        if (res.data.length > 0) {
          tempSymptoms = res.data;
        }
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    const editedSymptoms = tempSymptoms.filter(
      (symp) => symp.status === "Pending Update"
    );
    const newSymptoms = tempSymptoms
      .filter((symp) => symp.status === "Pending Create")
      .map((newSymp) => ({ ...newSymp, status: "Approved" }));
    // update edited symptoms
    const updatePromises = [];
    if (editedSymptoms.length > 0) {
      for (const editedSymptom of editedSymptoms) {
        updatePromises.push(
          axios
            .post(
              `http://localhost:5000/symptom/update-from-disease/${editedSymptom.id}`,
              editedSymptom
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
            .post("http://localhost:5000/symptom/add", newSymptom)
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
    const newDisease = { ...disease, status: "Approved" };
    try {
      await Promise.all([...updatePromises, ...createPromises]);
      if (disease.status === "Pending Create") {
        const response = await axios.post(
          "http://localhost:5000/disease/add",
          newDisease
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
          newDisease
        );
        console.log("Căn bệnh đã được cập nhật vào", response.data);
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
    onDelete(diseaseId);
  }

  // delete disease
  async function onDelete(diseaseId) {
    if (
      window.confirm("Bạn có chắc muốn xóa căn bệnh này ở bộ nhớ tạm thời?")
    ) {
      axios
        .delete(`http://localhost:5000/disease-temp/${diseaseId}`)
        .then(() => {
          navigate("/disease-table");
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
      for (const symptom of disease.symptoms) {
        axios
          .delete(
            `http://localhost:5000/symptom-temp/${symptom.id}/${diseaseId}`
          )
          .then((res) => {
            console.log("Symptom deleted in temp", res.data);
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
                    onClick={() => onDelete(diseaseId)}
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
