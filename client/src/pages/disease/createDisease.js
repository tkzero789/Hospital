import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import DiseaseAgeGen from "../../components/DiseaseParts/DiseaseAgeGen";
import DiseaseSymptoms from "../../components/DiseaseParts/DiseaseSymptoms";
import DiseaseSympDes from "../../components/DiseaseParts/DiseaseSympDes";
import DiseaseNewSympDes from "../../components/DiseaseParts/DiseaseNewSympDes";
import DiseaseName from "../../components/DiseaseParts/DiseaseName";

export default function CreateDisease({ userInfos }) {
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

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
      timeCreated: formattedDate,
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
      });
  }, []);

  function StepDisplay() {
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
          userInfos={userInfos}
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
  }

  function handlePrev() {
    setStep((step) => step - 1);
  }
  function handleNext() {
    setStep((step) => step + 1);
  }

  function checkNewSympDes() {
    if (disease.symptoms.length > 0) {
      const dbSympNames = dbSymps.map((dbSymp) => dbSymp.name);
      for (const symp of disease.symptoms) {
        if (chosenSymps.includes(symp.id)) {
          const dbCats = dbSymps.filter(
            (dbSymp) => dbSymp.name === symp.name
          )[0].categories;
          const dbCatNames = dbCats.map((dbCat) => dbCat.categoryName);
          for (const cat of symp.categories) {
            if (chosenCats.includes(cat.id)) {
              const dbDes = dbCats.filter(
                (dbCat) => dbCat.categoryName === cat.categoryName
              )[0].descriptions;
              const dbDesDetail = dbDes.map((dbDes) => dbDes.descriptionDetail);
              for (const des of cat.descriptions) {
                if (!chosenDes.includes(des.id)) {
                  if (des.descriptionDetail === "") {
                    window.alert(`Vui lòng điền mô tả`);
                    return;
                  }
                  if (dbDesDetail.includes(des.descriptionDetail)) {
                    window.alert(
                      `Mô tả ${des.descriptionDetail} của thuộc tính ${cat.categoryName} của triệu chứng ${symp.name} đã tồn tại!`
                    );
                    return;
                  }
                }
              }
            } else if (!chosenCats.includes(cat.id)) {
              if (dbCatNames.includes(cat.categoryName)) {
                window.alert(
                  `Thuộc tính ${cat.categoryName} của triệu chứng ${symp.name} đã tồn tại!`
                );
                return;
              }
              for (const des of cat.descriptions) {
                if (des.descriptionDetail === "") {
                  window.alert(`Vui lòng điền mô tả`);
                  return;
                }
              }
            }
          }
        } else if (!chosenSymps.includes(symp.id)) {
          if (symp.name === "") {
            window.alert(`Vui lòng điền triệu chứng`);
            return;
          }
          if (dbSympNames.includes(symp.name)) {
            window.alert(`Triệu chứng ${symp.name} đã tồn tại!`);
            return;
          }
          for (const cat of symp.categories) {
            for (const des of cat.descriptions) {
              if (des.descriptionDetail === "") {
                window.alert(`Vui lòng điền mô tả`);
                return;
              }
            }
          }
        }
      }
      handleNext();
    }
  }

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
    const editedSymptoms = disease.symptoms
      .filter((symptom) =>
        chosenSymps.some((existSymp) => existSymp === symptom.id)
      )
      .map((item) => ({
        ...item,
        diseaseId: disease.id,
        status: "Pending Update",
      }));
    const newSymptoms = disease.symptoms
      .filter((symptom) =>
        chosenSymps.some((existSymp) => existSymp !== symptom.id)
      )
      .map((item) => ({
        ...item,
        diseaseId: disease.id,
        status: "Pending Create",
      }));
    const updatePromises = [];
    // update edited symptoms
    if (editedSymptoms.length > 0) {
      for (const editedSymp of editedSymptoms) {
        updatePromises.push(
          axios
            .post(`http://localhost:5000/symptom-temp/add`, editedSymp)
            .then((res) => {
              console.log(
                "Triệu chứng sẽ được chỉnh sửa sau khi được admin chấp thuận",
                res.data
              );
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
      for (const newSymp of newSymptoms) {
        createPromises.push(
          axios
            .post("http://localhost:5000/symptom-temp/add", newSymp)
            .then((res) => {
              if (res.data && res.data.message === "Symptom already exists") {
                window.alert(
                  "Triệu chứng cùng tên đang được người khác thêm vào!"
                );
              } else {
                console.log(
                  "Triệu chứng sẽ được thêm vào sau khi được admin chấp thuận",
                  res.data
                );
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
    const newDisease = {
      ...disease,
      symptoms: disease.symptoms.map((symptom) => ({
        id: symptom.id,
        name: symptom.name,
        categories: symptom.categories,
      })),
      status: "Pending Create",
    };
    try {
      await Promise.all([...updatePromises, ...createPromises]);
      const response = await axios.post(
        "http://localhost:5000/disease-temp/add",
        newDisease
      );
      if (response.data && response.data.message === "Disease already exists") {
        window.alert("Căn bệnh cùng tên đang được người khác thêm vào!");
      } else {
        console.log(
          "Căn bệnh sẽ được thêm vào sau khi được admin chấp thuận",
          response.data
        );
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
            timeCreated: formattedDate,
            timeEdited: null,
          },
        });
        setStep(1);
        navigate("/disease-table");
      }
    } catch (err) {
      console.error("Error during symptom updates/creations:", err);
      window.alert("Có lỗi xảy ra khi cập nhật/tạo triệu chứng!");
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">TẠO CĂN BỆNH</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>{StepDisplay()}</div>

            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
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
