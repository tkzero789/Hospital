import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import DoctorNav from "../components/Navbar/DoctorNav";
import AdminNavBar from "../components/Navbar/AdminNavBar";
import ArticleForm from "../components/ArticleForm";

export default function EditArticle({ userInfos }) {
  const [article, setArticle] = useState({
    id: uuidv4(),
    title: "",
    diseaseId: "",
    diseaseName: "",
    infos: [],
    treatments: [],
    createInfos: {
      doctorCreated: "",
      doctorID: "",
      timeCreated: "",
      timeEdited: null,
    },
  });
  const { diseaseId, articleId } = useParams();
  const navigate = useNavigate();

  // get article by articleId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/${articleId}`)
      .then((res) => {
        const dbArticle = res.data;
        if (!dbArticle) {
          window.alert(`Không tìm thấy bài viết với id ${articleId} `);
          navigate("/disease-list");
          return;
        }
        if (dbArticle.createInfos.doctorID !== userInfos.doctorID) {
          window.alert("Chỉ có bác sĩ tạo ra mới được chỉnh sửa dữ liệu");
          navigate("/disease-list");
          return;
        }
        setArticle({
          ...dbArticle,
          createInfos: {
            ...dbArticle.createInfos,
            timeEdited: Date.now(),
          },
        });
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [articleId, navigate]);

  // handle edit article
  async function confirmEdit(e) {
    // validation fields
    if (article.title === "") {
      alert("Thiếu tên bài viết");
    } else if (article.infos.filter((info) => info.detail === "").length > 0) {
      alert("Thiếu thông tin bệnh");
    } else if (
      article.treatments.filter((trm) => trm.detail === "").length > 0
    ) {
      alert("Thiếu phương pháp chữa trị");
    } else {
      e.preventDefault();
      // update article
      const _article = { ...article };
      axios
        .post(`http://localhost:5000/article/update/${articleId}`, _article)
        .then((res) => {
          console.log("Article edited:", res.data);
          setArticle({
            id: "",
            title: "",
            diseaseId: "",
            diseaseName: "",
            infos: [],
            treatments: [],
            createInfos: {
              doctorCreated: "",
              doctorID: "",
              timeCreated: "",
              timeEdited: null,
            },
          });
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
      // update disease article
      const newArtShort = {
        id: _article.id,
        title: _article.title,
        doctorID: _article.createInfos.doctorID,
      };
      console.log(newArtShort);
      axios
        .post(
          `http://localhost:5000/disease/update-article/${diseaseId}`,
          newArtShort
        )
        .then((res) => {
          console.log("Disease relatedArticle Edited:", res.data);
          navigate(`/disease/${diseaseId}/article/${articleId}/view`);
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
  }

  return (
    <div>
      <DoctorNav />
      <AdminNavBar />
      <h3 className="container text-center text-body pt-5">
        CHỈNH SỬA BÀI VIẾT
      </h3>
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
                  to={`/disease/${diseaseId}/article/${articleId}/view`}
                >
                  TRỞ VỀ CHẾ ĐỘ XEM
                </NavLink>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    confirmEdit(e);
                  }}
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
