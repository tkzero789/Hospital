import React, { useState } from "react";
import { useNavigate } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";

import AdminNavBar from "../components/AdminNavBar";
import ExistedSymptoms from "../components/ExistedSymptoms";
import ExistedDetails from "../components/ExistedDetails";
import WriteArticle from "../components/WriteAriticle";

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

  const [articleSymptoms, setArticleSymptoms] = useState([]);

  const [step, setStep] = useState(1);

  const StepDisplay = () => {
    if (step === 1) {
      return (
        <ExistedSymptoms
          articleSymptoms={articleSymptoms}
          setArticleSymptoms={setArticleSymptoms}
        />
      );
    } else if (step === 2) {
      return (
        <ExistedDetails
          articleSymptoms={articleSymptoms}
          setArticleSymptoms={setArticleSymptoms}
        />
      );
    } else {
      if (articleSymptoms.length > 0) {
        article["diseaseSymptoms"] = articleSymptoms;
      }
      return <WriteArticle article={article} setArticle={setArticle} />;
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
      console.log(newArticle);
      await fetch("http://localhost:5000/article/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newArticle),
      }).catch((error) => {
        window.alert(error);
        return;
      });
      console.log("Article created");
      console.log(article);
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
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <AdminNavBar />
      <h3 className="container text-center text-danger pt-5">TẠO BÀI VIẾT</h3>
      <div className="container p-5">
        <div className="card border-danger-subtle p-5">
          <form>
            <div>{StepDisplay()}</div>

            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={step === 1}
                  onClick={handlePrev}
                >
                  QUAY LẠI
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-danger"
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
