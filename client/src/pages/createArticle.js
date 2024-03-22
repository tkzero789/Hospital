import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

import DoctorNav from "../components/DoctorNav";
import AdminNavBar from "../components/AdminNavBar";
import ArticleSymptoms from "../components/ArticleSymptoms";
import ArticleDetails from "../components/ArticleDetails";
import ArticleInfosAndTreatments from "../components/ArticleInfosAndTreatments";

export default function CreateAritcle() {
  const [article, setArticle] = useState({
    title: "",
    author: "BS Anh Kiet",
    diseaseName: "",
    diseaseAgeRanges: [],
    diseaseGenders: [],
    diseaseSymptoms: [],
    diseaseInfos: [],
    diseaseTreatments: [],
  });

  const [step, setStep] = useState(1);

  const StepDisplay = () => {
    if (step === 1) {
      return <ArticleSymptoms article={article} setArticle={setArticle} />;
    } else if (step === 2) {
      return <ArticleDetails article={article} setArticle={setArticle} />;
    } else {
      return (
        <ArticleInfosAndTreatments article={article} setArticle={setArticle} />
      );
    }
  };

  const handlePrev = () => {
    setStep((step) => step - 1);
  };
  const handleNext = () => {
    setStep((step) => step + 1);
  };

  const navigate = useNavigate();

  async function confirmCreate(e) {
    if (article.title === "") {
      alert("Thiếu tên bài viết");
    } else if (article.diseaseName === "") {
      alert("Thiếu tên căn bệnh");
    } else if (article.diseaseAgeRanges.length < 1) {
      alert("Thiếu độ tuổi bệnh nhân");
    } else if (article.diseaseGenders.length < 1) {
      alert("Thiếu giới tính bệnh nhân");
    } else if (article.diseaseSymptoms.length < 1) {
      alert("Thiếu triệu chứng bệnh");
    } else if (
      article.diseaseInfos.filter((info) => info.detail === "").length > 0
    ) {
      alert("Thiếu thông tin bệnh");
    } else if (
      article.diseaseTreatments.filter((treatment) => treatment.detail === "")
        .length > 0
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
            diseaseName: "",
            diseaseAgeRanges: [],
            diseaseGenders: [],
            diseaseSymptoms: [],
            diseaseInfos: [],
            diseaseTreatments: [],
          });
          setStep(1);
          navigate("/create-article");
        })
        .catch((err) => {
          const message = `An error occurred: ${err}`;
          window.alert(message);
          return;
        });
    }
  }

  return (
    <div>
      <DoctorNav />
      <AdminNavBar />
      <h3 className="container text-center text-body pt-5">TẠO BÀI VIẾT</h3>
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
                    if (step === 3) {
                      confirmCreate(e);
                    } else {
                      handleNext();
                    }
                  }}
                >
                  {step === 3 ? "XÁC NHẬN TẠO" : "TIẾP THEO"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
