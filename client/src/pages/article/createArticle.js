import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "bootstrap-icons/font/bootstrap-icons.css";

import ArticleForm from "../../components/ArticleParts/ArticleForm";

export default function CreateArticle({ userInfos }) {
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [article, setArticle] = useState({
    id: uuidv4(),
    title: "",
    diseaseId: "",
    diseaseName: "",
    infos: [],
    treatments: [],
    medSpecialty: "",
    createInfos: {
      doctorCreated: userInfos.fullName,
      doctorID: userInfos.doctorID,
      timeCreated: formattedDate,
      timeEdited: null,
    },
    isDisplay: false,
    status: "Pending Create",
  });
  const { diseaseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/${diseaseId}`)
      .then((res) => {
        const disease = res.data;
        setArticle({
          ...article,
          diseaseId: disease.id,
          diseaseName: disease.name,
          medSpecialty: userInfos.medSpecialty,
        });
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [diseaseId]);

  async function confirmCreate(e) {
    // validation fields
    if (article.title === "") {
      alert("Thiếu tên bài viết");
      return;
    } else if (
      article.infos.filter((info) => info.about === "" || info.detail === "")
        .length > 0
    ) {
      alert("Thiếu thông tin bệnh");
      return;
    } else if (
      article.treatments.filter(
        (treatment) => treatment.about === "" || treatment.detail === ""
      ).length > 0
    ) {
      alert("Thiếu phương pháp chữa trị");
      return;
    } else {
      e.preventDefault();
      // create new article in temp
      const newArticle = { ...article };
      axios
        .post("http://localhost:5000/article-temp/add", newArticle)
        .then((res) => {
          if (res.data && res.data.message === "Article already exists") {
            window.alert("Bài viết cùng tên cho bệnh này đang được chờ duyệt!");
          } else {
            console.log("Article created:", res.data);
            setArticle({
              id: uuidv4(),
              title: "",
              diseaseId: "",
              diseaseName: "",
              infos: [],
              treatments: [],
              medSpecialty: "",
              createInfos: {
                doctorCreated: userInfos.fullName,
                doctorID: userInfos.doctorID,
                timeCreated: formattedDate,
                timeEdited: null,
              },
              isDisplay: false,
              status: "Pending Create",
            });
            navigate(`/disease/${diseaseId}/article-table`);
          }
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">TẠO BÀI VIẾT</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              {
                <ArticleForm
                  article={article}
                  setArticle={setArticle}
                  editMode={true}
                />
              }
            </div>

            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/disease/${diseaseId}/article-table`}
                >
                  HỦY TẠO BÀI VIẾT
                </NavLink>
              </div>
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