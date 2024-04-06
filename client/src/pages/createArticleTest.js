import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "bootstrap-icons/font/bootstrap-icons.css";

import DoctorNav from "../components/DoctorNav";
import AdminNavBar from "../components/AdminNavBar";

export default function CreateAritcleTest() {
  const [article, setArticle] = useState({
    title: "",
    author: "BS Anh Kiet",
    diseaseId: "",
    diseaseName: "",
    infos: [],
    treatments: [],
  });
  const [disease, setDisease] = useState({});

  const params = useParams();
  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-backend.onrender.com/disease/${params.id.toString()}`
      )
      .then((res) => {
        const disease = res.data;
        setArticle({
          ...article,
          diseaseId: disease._id,
          diseaseName: disease.name,
        });
        setDisease(disease);
      })
      .then(() => {
        console.log(article);
        console.log(disease);
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }, []);

  const navigate = useNavigate();

  const [finalInfoNumber, setFinalInfoNumber] = useState(
    article.infos.length + 1
  );

  const addInfoField = () => {
    let _article = { ...article };
    _article.infos.push({
      index: uuidv4(),
      number: finalInfoNumber,
      detail: "",
    });
    setFinalInfoNumber(finalInfoNumber + 1);
    setArticle(_article);
  };

  const updateInfoField = (infoNo, event) => {
    let _article = { ...article };
    _article.infos[infoNo - 1][event.target.name] = event.target.value;
    setArticle(_article);
  };

  const deleteInfoField = (infoNo) => {
    let _article = { ...article };
    _article.infos = _article.infos.filter((info) => info.number !== infoNo);
    _article.infos = _article.infos.map((info) => ({
      ...info,
      number: info.number > infoNo ? info.number - 1 : info.number,
    }));
    setFinalInfoNumber(finalInfoNumber - 1);
    setArticle(_article);
  };

  const [finalTreatmentNumber, setFinalTreatmentNumber] = useState(
    article.treatments.length + 1
  );

  const addTreatmentField = () => {
    let _article = { ...article };
    _article.treatments.push({
      index: uuidv4(),
      number: finalTreatmentNumber,
      detail: "",
    });
    setFinalTreatmentNumber(finalTreatmentNumber + 1);
    setArticle(_article);
  };

  const updateTreatmentField = (treatmentNo, event) => {
    let _article = { ...article };
    _article.treatments[treatmentNo - 1][event.target.name] =
      event.target.value;
    setArticle(_article);
  };

  const deleteTreatmentField = (treatmentNo) => {
    let _article = { ...article };
    _article.treatments = _article.treatments.filter(
      (treatment) => treatment.number !== treatmentNo
    );
    _article.treatments = _article.treatments.map((treatment) => ({
      ...treatment,
      number:
        treatment.number > treatmentNo
          ? treatment.number - 1
          : treatment.number,
    }));
    setFinalTreatmentNumber(finalTreatmentNumber - 1);
    setArticle(_article);
  };

  const updateTitleField = (event) => {
    let _article = { ...article };
    _article[event.target.name] = event.target.value;
    setArticle(_article);
  };

  async function confirmCreate(e) {
    if (article.title === "") {
      alert("Thiếu tên bài viết");
    } else if (article.diseaseName === "") {
      alert("Thiếu tên căn bệnh");
    } else if (article.infos.filter((info) => info.detail === "").length > 0) {
      alert("Thiếu thông tin bệnh");
    } else if (
      article.treatments.filter((treatment) => treatment.detail === "").length >
      0
    ) {
      alert("Thiếu phương pháp chữa trị");
    } else {
      e.preventDefault();
      const newArticle = { ...article };
      axios
        .post(
          "https://symptom-checker-with-mern-backend.onrender.com/article/add",
          newArticle
        )
        .then((res) => {
          console.log("Article created");
          console.log(res.data);
          setArticle({
            title: "",
            author: "BS Anh Kiet",
            diseaseId: "",
            diseaseName: "",
            infos: [],
            treatments: [],
          });
          navigate(`/article-list/${params.id.toString()}`);
        })
        .catch((err) => {
          const message = `An error occurred: ${err}`;
          window.alert(message);
          return;
        });
    }
  }
  const Symptom = (props) => {
    return (
      <div className="col-4 p-2">
        <div className="border border-primary-subtle p-2 text-center">
          <p className="m-0">{props.symptom.symptomName}</p>
        </div>
      </div>
    );
  };

  const Details = (props) => {
    const categoryList = props.symptom.categories;
    const descriptionList = categoryList.map(
      (category) => category.descriptions
    );
    const descriptionDetailArray = descriptionList.flatMap((sublist) =>
      sublist.map((item) => item.descriptionDetail)
    );
    return (
      <div className="p-2">
        <p className="m-0">
          - {props.symptom.symptomName}: {descriptionDetailArray.join(", ")}
        </p>
      </div>
    );
  };

  return (
    <div>
      <DoctorNav />
      <AdminNavBar />
      <h3 className="container text-center text-body pt-5">TẠO BÀI VIẾT</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">TÊN BÀI VIẾT</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="title"
                  value={article.title}
                  onChange={(e) => updateTitleField(e)}
                />
              </div>

              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">TÊN CĂN BỆNH</h4>
                <input
                  type="text"
                  className="form-control border-primary-subtle col"
                  name="diseaseName"
                  value={article.diseaseName}
                />
              </div>

              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">TRIỆU CHỨNG</h4>
                <div className="border border-primary-subtle rounded col-9">
                  <div className="row">
                    {disease.symptoms.map((symptom) => {
                      return <Symptom symptom={symptom} key={symptom._id} />;
                    })}
                  </div>
                </div>
              </div>

              <div className="form-group row pb-5">
                <h4 className="text-blue-2 col-3">MÔ TẢ CHI TIẾT</h4>
                <div className="border border-primary-subtle rounded col">
                  {disease.symptoms.map((symptom) => {
                    return <Details symptom={symptom} key={symptom._id} />;
                  })}
                </div>
              </div>

              <div className="row pb-5">
                {article.infos.map((info) => {
                  return (
                    <div key={info.index}>
                      <div className="form row pb-3">
                        <div className="col-12" style={{ display: "flex" }}>
                          <i
                            class="bi bi-file-minus"
                            style={{ color: "red", marginRight: "5px" }}
                            onClick={(e) => deleteInfoField(info.number)}
                          ></i>
                          <h4 className="text-blue-2">
                            THÔNG TIN {info.number}
                          </h4>
                        </div>
                        <textarea
                          name="detail"
                          value={info.detail}
                          className="form-control border-primary-subtle col-9"
                          placeholder="Thông tin"
                          rows="4"
                          onChange={(e) => updateInfoField(info.number, e)}
                        />
                      </div>
                    </div>
                  );
                })}
                <div onClick={addInfoField} className="btn btn-outline-primary">
                  <h4 className="text-blue-2">THÊM THÔNG TIN</h4>
                </div>
              </div>

              <div className="row pb-5">
                {article.treatments.map((treatment) => {
                  return (
                    <div key={treatment.index}>
                      <div className="form row pb-3">
                        <div className="col-12" style={{ display: "flex" }}>
                          <i
                            class="bi bi-file-minus"
                            style={{ color: "red", marginRight: "5px" }}
                            onClick={(e) =>
                              deleteTreatmentField(treatment.number)
                            }
                          ></i>
                          <h4 className="text-blue-2">
                            PHƯƠNG PHÁP {treatment.number}
                          </h4>
                        </div>
                        <textarea
                          name="detail"
                          value={treatment.detail}
                          className="form-control border-primary-subtle col-9"
                          placeholder="Thông tin"
                          rows="4"
                          onChange={(e) =>
                            updateTreatmentField(treatment.number, e)
                          }
                        />
                      </div>
                    </div>
                  );
                })}
                <div
                  onClick={addTreatmentField}
                  className="btn btn-outline-primary"
                >
                  <h4 className="text-blue-2">THÊM PHƯƠNG PHÁP CHỮA TRỊ</h4>
                </div>
              </div>
            </div>

            <div className="row pt-3 pb-3 justify-content-end">
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
