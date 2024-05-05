import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

import ArticleForm from "../../components/ArticleParts/ArticleForm";

export default function ViewArticle({ userRole, userInfos }) {
  const [article, setArticle] = useState({
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
      timeEdited: "",
    },
    isDisplay: false,
    status: "",
  });
  const { diseaseId, articleId } = useParams();
  const navigate = useNavigate();

  // get article from DB by articleId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/${articleId}`)
      .then((res) => {
        const dbArticle = res.data;
        if (!dbArticle) {
          window.alert(`Không tìm thấy bài viết với id ${articleId} `);
          navigate("/article-table");
          return;
        }
        setArticle(dbArticle);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [articleId, navigate]);

  // delete article by articleId
  async function onDelete(articleId) {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      // delte article in disease
      axios
        .post(
          `http://localhost:5000/disease/${diseaseId}/delete-article/${articleId}`
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
      // delete article
      axios
        .delete(`http://localhost:5000/article/${articleId}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
      navigate(`/article-table`);
    }
  }

  async function setDisplay() {
    let existArticleId = "";
    // get article is set default displaying
    console.log(article);
    await axios
      .post(`http://localhost:5000/article/get-isdisplay`, {
        diseaseId: article.diseaseId,
      })
      .then((res) => {
        if (res.data) existArticleId = res.data.id;
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    await axios
      .post(`http://localhost:5000/article/set-isdisplay`, {
        id: article.id,
        isDisplay: true,
      })
      .then(() => {
        window.alert("Bài viết đã được đặt mặc định");
        setArticle({
          ...article,
          isDisplay: true,
        });
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    if (existArticleId !== "") {
      await axios
        .post(`http://localhost:5000/article/set-isdisplay`, {
          id: existArticleId,
          isDisplay: false,
        })
        .catch((err) => {
          const message = `Có lỗi xảy ra: ${err}`;
          window.alert(message);
        });
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">XEM BÀI VIẾT</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              {
                <ArticleForm
                  article={article}
                  setArticle={setArticle}
                  editMode={false}
                />
              }
            </div>
            {userRole === "head-doctor" && (
              <div className="row pt-3 pb-3 gap-2 justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  disabled={article.isDisplay === true}
                  onClick={() => setDisplay()}
                >
                  {article.isDisplay === true
                    ? "ĐANG LÀ BÀI VIẾT MẶC ĐỊNH"
                    : "ĐẶT LÀM BÀI VIẾT MẶC ĐỊNH"}
                </button>
              </div>
            )}
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/article-table`}
                >
                  QUAY LẠI
                </NavLink>
              </div>
              {userInfos.doctorID === article.createInfos.doctorID && (
                <div className="col-3 d-grid gap-2">
                  <NavLink
                    className="btn btn-outline-primary"
                    to={`/disease/${diseaseId}/article/${articleId}/edit`}
                  >
                    CHỈNH SỬA BÀI VIẾT
                  </NavLink>
                </div>
              )}
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/articles/${articleId}`}
                >
                  XEM CHẾ ĐỘ NGƯỜI DÙNG
                </NavLink>
              </div>
              {userInfos.doctorID === article.createInfos.doctorID && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(article.id)}
                  >
                    XÓA BÀI VIẾT
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
