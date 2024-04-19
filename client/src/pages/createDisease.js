import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "bootstrap-icons/font/bootstrap-icons.css";

import DoctorNav from "../components/Navbar/DoctorNav";
import AdminNavBar from "../components/Navbar/AdminNavBar";
import DiseaseAgeGen from "../components/DiseaseAgeGen";
import DiseaseSymptoms from "../components/DiseaseSymptoms";
import DiseaseSympDes from "../components/DiseaseSympDes";
import DiseaseNewSympDes from "../components/DiseaseNewSympDes";
import DiseaseName from "../components/DiseaseName";

export default function CreateDisease({ userInfos }) {
  const [disease, setDisease] = useState({
    id: uuidv4(),
    name: "",
    ageRanges: [],
    genders: [],
    symptoms: [],
    medSpecialty: userInfos.medSpecialty,
    relatedArticles: [],
    createInfos: {
      doctorCreated: userInfos.fullName,
      doctorID: userInfos.doctorID,
      timeCreated: Date.now(),
      timeEdited: null,
    },
  });
  const [dbSymps, setDbSymps] = useState([]);
  // chosenSymps, chosenCats, chosenDes are Symptoms, Categories and Descriptions existing in DB
  // AND have been chosen in the process, only contain id
  const [chosenSymps, setChosenSymps] = useState([]);
  const [chosenCats, setChosenCats] = useState([]);
  const [chosenDes, setChosenDes] = useState([]);
  // set form steps
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/symptom")
      .then((res) => {
        setDbSymps(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
        return;
      });
  }, []);

  const StepDisplay = () => {
    if (step === 1) {
      return <DiseaseAgeGen disease={disease} setDisease={setDisease} />;
    } else if (step === 2) {
      return (
        <DiseaseSymptoms
          disease={disease}
          dbSymps={dbSymps}
          setDisease={setDisease}
          chosenSymps={chosenSymps}
          setChosenSymps={setChosenSymps}
          chosenCats={chosenCats}
          setChosenCats={setChosenCats}
          chosenDes={chosenDes}
          setChosenDes={setChosenDes}
        />
      );
    } else if (step === 3) {
      return (
        <DiseaseSympDes
          disease={disease}
          dbSymps={dbSymps}
          setDisease={setDisease}
          chosenSymps={chosenSymps}
          chosenCats={chosenCats}
          setChosenCats={setChosenCats}
          chosenDes={chosenDes}
          setChosenDes={setChosenDes}
        />
      );
    } else if (step === 4) {
      return (
        <DiseaseNewSympDes
          disease={disease}
          setDisease={setDisease}
          chosenSymps={chosenSymps}
          chosenCats={chosenCats}
          chosenDes={chosenDes}
        />
      );
    } else {
      return (
        <DiseaseName
          disease={disease}
          setDisease={setDisease}
          editMode={true}
        />
      );
    }
  };

  const handlePrev = () => {
    setStep((step) => step - 1);
  };
  const handleNext = () => {
    setStep((step) => step + 1);
  };

  const checkNewSympDes = () => {
    if (disease.symptoms.length > 0) {
      const dbSympNames = dbSymps.map((dbSymp) => dbSymp.name);
      for (const symp of disease.symptoms) {
        if (symp.name === "") {
          window.alert(`Vui lòng điền triệu chứng`);
          return;
        } else if (!chosenSymps.includes(symp.id)) {
          if (dbSympNames.includes(symp.name)) {
            window.alert(`Triệu chứng ${symp.name} đã tồn tại!`);
            return;
          } else continue;
        }
        if (symp.categories.length > 0) {
          let dbCats = dbSymps.filter((dbSymp) => dbSymp.name === symp.name)[0]
            .categories;
          console.log(dbCats);
          let dbCatNames = dbCats.map((dbCat) => dbCat.categoryName);
          for (const cat of symp.categories) {
            if (!chosenCats.includes(cat.id)) {
              if (dbCatNames.includes(cat.categoryName)) {
                window.alert(
                  `Thuộc tính ${cat.categoryName} của triệu chứng ${symp.name} đã tồn tại!`
                );
                return;
              } else continue;
            }
            if (cat.descriptions.length > 0) {
              console.log(cat.categoryName);
              console.log(
                dbCats.filter(
                  (dbCat) => dbCat.categoryName === cat.categoryName
                )
              );
              let dbDes = dbCats.filter(
                (dbCat) => dbCat.categoryName === cat.categoryName
              )[0].descriptions;
              let dbDesDetail = dbDes.map((dbDes) => dbDes.descriptionDetail);
              for (const des of cat.descriptions) {
                if (symp.name === "") {
                  window.alert(`Vui lòng điền mô tả`);

                  return;
                } else if (!chosenDes.includes(des.id)) {
                  if (dbDesDetail.includes(des.descriptionDetail)) {
                    window.alert(
                      `Mô tả ${des.descriptionDetail} của thuộc tính ${cat.categoryName} của triệu chứng ${symp.name} đã tồn tại!`
                    );
                    return;
                  } else continue;
                }
              }
            }
          }
        }
      }
      handleNext();
    }
  };

  async function confirmCreate(e) {
    e.preventDefault();
    if (!disease.name) {
      window.alert("Chưa nhập tên bệnh");
      return;
    } else if (disease.ageRanges.length === 0) {
      window.alert("Chưa chọn độ tuôi");
      return;
    } else if (disease.genders.length === 0) {
      window.alert("Chưa chọn giới tính");
      return;
    } else if (disease.symptoms.length === 0) {
      window.alert("Chưa có triệu chứng");
      return;
    }
    let editedSymptoms = [];
    let newSymptoms = [];
    if (chosenSymps.length > 0) {
      console.log(chosenSymps);
      editedSymptoms = disease.symptoms.filter((symptom) =>
        chosenSymps.some((existSymp) => existSymp === symptom.id)
      );
      console.log(editedSymptoms);
      newSymptoms = disease.symptoms.filter(
        (symptom) => !chosenSymps.some((existSymp) => existSymp === symptom.id)
      );
      console.log(newSymptoms);
    } else {
      newSymptoms = disease.symptoms;
    }
    const newDisease = { ...disease };
    // update edited symptoms
    if (editedSymptoms.length > 0) {
      for (const editedSymptom of editedSymptoms) {
        axios
          .post(
            `http://localhost:5000/symptom/update-from-disease/${editedSymptom.id}`,
            editedSymptom
          )
          .then((res) => {
            console.log("Symptom edited");
            console.log(res.data);
          })
          .catch((err) => {
            const message = `Có lỗi xảy ra: ${err}`;
            window.alert(message);
            return;
          });
      }
    }
    // create new symptoms from disease
    if (newSymptoms.length > 0) {
      for (const newSymptom of newSymptoms) {
        axios
          .post("http://localhost:5000/symptom/add", newSymptom)
          .then((res) => {
            if (res.data && res.data.message === "Symptom already exists") {
              window.alert("Triệu chứng đã tồn tại!");
            } else {
              console.log("Symptom created");
              console.log(res.data);
            }
          })
          .catch((err) => {
            const message = `Có lỗi xảy ra: ${err}`;
            window.alert(message);
            return;
          });
      }
    }
    // create new disease
    axios
      .post("http://localhost:5000/disease/add", newDisease)
      .then((res) => {
        if (res.data && res.data.message === "Disease already exists") {
          window.alert("Căn bệnh đã tồn tại!");
          return;
        } else {
          console.log("Disease created");
          console.log(res.data);
          setDisease({
            id: uuidv4(),
            name: "",
            ageRanges: [],
            genders: [],
            symptoms: [],
            medSpecialty: userInfos.medSpecialty,
            relatedArticles: [],
            createInfos: {
              doctorCreated: userInfos.fullName,
              doctorID: userInfos.doctorID,
              timeCreated: Date.now(),
              timeEdited: null,
            },
          });
          setStep(1);
          navigate("/disease-list");
        }
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
        return;
      });
  }

  return (
    <div>
      <DoctorNav />
      <AdminNavBar />
      <h3 className="container text-center text-body pt-5">TẠO CĂN BỆNH</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>{StepDisplay()}</div>

            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled={step === 1}
                  onClick={handlePrev}
                >
                  QUAY LẠI
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    if (step === 5) {
                      confirmCreate(e);
                    } else if (step === 4) {
                      checkNewSympDes();
                    } else {
                      handleNext();
                    }
                  }}
                >
                  {step === 5 ? "XÁC NHẬN TẠO" : "TIẾP THEO"}
                </button>
              </div>
              {step === 2 && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={(e) => {
                      setStep(4);
                    }}
                  >
                    TRIỆU CHỨNG MỚI
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
