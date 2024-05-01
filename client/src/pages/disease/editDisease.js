import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

import DiseaseAgeGen from "../../components/DiseaseParts/DiseaseAgeGen";
import DiseaseSymptoms from "../../components/DiseaseParts/DiseaseSymptoms";
import DiseaseSympDes from "../../components/DiseaseParts/DiseaseSympDes";
import DiseaseNewSympDes from "../../components/DiseaseParts/DiseaseNewSympDes";
import DiseaseName from "../../components/DiseaseParts/DiseaseName";

export default function EditDisease({ userInfos }) {
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

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
  // dbSymps are Symptoms in DB
  const [dbSymps, setDbSymps] = useState([]);
  const [newSymps, setNewSymps] = useState([]);
  // chosenSymps, chosenCats, chosenDes are Symptoms, Categories and Descriptions existing in DB
  // AND have been chosen in the process, only contain id
  const [chosenSymps, setChosenSymps] = useState([]);
  const [chosenCats, setChosenCats] = useState([]);
  const [chosenDes, setChosenDes] = useState([]);
  const { diseaseId } = useParams();
  const navigate = useNavigate();
  // set form steps, form include 5 steps
  const [step, setStep] = useState(1);

  // get disease from DB by diseaseId and set chosenSymps, chosenCats, chosenDes
  // this will set the state of chosen ones checked before the process starts
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
        if (dbdisease.createInfos.doctorID !== userInfos.doctorID) {
          window.alert("Chỉ có bác sĩ tạo ra mới được chỉnh sửa dữ liệu");
          navigate("/disease-table");
          return;
        }
        console.log(dbdisease);
        setDisease({
          ...dbdisease,
          createInfos: {
            ...dbdisease.createInfos,
            timeEdited: formattedDate,
          },
          status: "Pending Update",
        });
        setChosenSymps(dbdisease.symptoms.map((symptom) => symptom.id));
        const catIds = dbdisease.symptoms
          .flatMap((symptom) => symptom.categories)
          .map((cat) => cat.id);
        setChosenCats(catIds);
        const desIds = dbdisease.symptoms
          .flatMap((symptom) => symptom.categories)
          .flatMap((cat) => cat.descriptions)
          .map((des) => des.id);
        setChosenDes(desIds);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [diseaseId, navigate]);

  // get symptoms from DB
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

  // display components step by step
  const StepDisplay = () => {
    if (step === 1) {
      return <DiseaseAgeGen disease={disease} setDisease={setDisease} />;
    } else if (step === 2) {
      return (
        <DiseaseSymptoms
          disease={disease}
          setDisease={setDisease}
          dbSymps={dbSymps}
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
          setDisease={setDisease}
          dbSymps={dbSymps}
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
          newSymps={newSymps}
          setNewSymps={setNewSymps}
          userInfos={userInfos}
        />
      );
    } else {
      return <DiseaseName disease={disease} setDisease={setDisease} />;
    }
  };

  // handle next and prev button
  const handlePrev = () => {
    setStep((step) => step - 1);
  };
  const handleNext = () => {
    setStep((step) => step + 1);
  };

  // at step 4 (add new symptom description), before go to next step, check if there is any
  // new symptom or category or description has same name with existing ones in DB
  function checkNewSympDes() {
    if (disease.symptoms.length > 0) {
      const dbSympNames = dbSymps.map((dbSymp) => dbSymp.name);
      for (const symp of disease.symptoms) {
        console.log(symp.name);
        if (chosenSymps.includes(symp.id)) {
          const dbCats = dbSymps.filter(
            (dbSymp) => dbSymp.name === symp.name
          )[0].categories;
          const dbCatNames = dbCats.map((dbCat) => dbCat.categoryName);
          for (const cat of symp.categories) {
            console.log(cat.categoryName);
            if (chosenCats.includes(cat.id)) {
              const dbDes = dbCats.filter(
                (dbCat) => dbCat.categoryName === cat.categoryName
              )[0].descriptions;
              const dbDesDetail = dbDes.map((dbDes) => dbDes.descriptionDetail);
              for (const des of cat.descriptions) {
                console.log(des);
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

  // handle edit disease
  async function confirmEdit(e) {
    e.preventDefault();
    // validate each field
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
    const updatePromises = [];
    // update edited symptoms
    if (chosenSymps.length > 0) {
      const editedSymptoms = disease.symptoms
        .filter((symptom) =>
          chosenSymps.some((existSymp) => existSymp === symptom.id)
        )
        .map((item) => ({ ...item, status: "Pending Update" }));
      if (editedSymptoms.length > 0) {
        for (const editedSymptom of editedSymptoms) {
          updatePromises.push(
            axios
              .post(`http://localhost:5000/symptom-temp/add`, editedSymptom)
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
    }
    // create new symptoms from disease
    const createPromises = [];
    if (newSymps.length > 0) {
      for (const newSymp of newSymps) {
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
    // update disease
    const updatedDisease = {
      ...disease,
      symptoms: disease.symptoms.map((symptom) => ({
        id: symptom.id,
        name: symptom.name,
        categories: symptom.categories,
      })),
      status: "Pending Update",
    };
    try {
      await Promise.all([...updatePromises, ...createPromises]);
      const response = await axios.post(
        "http://localhost:5000/disease-temp/add",
        updatedDisease
      );
      if (response.data && response.data.message === "Disease already exists") {
        window.alert("Căn bệnh cùng tên đang được chỉnh sửa!");
      } else {
        console.log(
          "Căn bệnh sẽ được chỉnh sửa sau khi được admin chấp thuận",
          response.data
        );
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
        setStep(1);
        navigate("/disease-table");
      }
    } catch (err) {
      window.alert("Có lỗi xảy ra khi cập nhật/tạo triệu chứng!");
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">
        CHỈNH SỬA CĂN BỆNH
      </h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>{StepDisplay()}</div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                {step === 1 ? (
                  <NavLink
                    className="btn btn-outline-primary"
                    to={`/disease/${diseaseId}/view`}
                  >
                    TRỞ VỀ CHẾ ĐỘ XEM
                  </NavLink>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handlePrev}
                  >
                    QUAY LẠI
                  </button>
                )}
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    if (step === 5) {
                      confirmEdit(e);
                    } else if (step === 4) {
                      checkNewSympDes();
                    } else {
                      handleNext();
                    }
                  }}
                >
                  {step === 5 ? "XÁC NHẬN CHỈNH SỬA" : "TIẾP THEO"}
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
