import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

import ArticleForm from "../../components/ArticleParts/ArticleForm";

export default function ViewArticleTemp({ userRole, userInfos }) {
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
      .get(`http://localhost:5000/article-temp/${articleId}`)
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

  async function onApprove() {
    // create new article
    const newArticle = { ...article, status: "Approved" };
    axios
      .post("http://localhost:5000/article/add", newArticle)
      .then((res) => {
        if (res.data && res.data.message === "Article already exists") {
          window.alert("Bài viết cùng tên cho bệnh này đã tồn tại!");
        } else {
          console.log("Article created:", res.data);
          setArticle({
            id: "",
            title: "",
            diseaseId: "",
            diseaseName: "",
            infos: [],
            treatments: [],
            medSpecialty: "",
            createInfos: {
              doctorCreated: "",
              doctorID: "",
              timeCreated: "",
              timeEdited: "",
            },
            isDisplay: false,
            status: "",
          });
        }
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    // update disease article
    const newArtShort = {
      id: newArticle.id,
      title: newArticle.title,
      doctorID: newArticle.createInfos.doctorID,
    };
    axios
      .post(
        `http://localhost:5000/disease/${diseaseId}/add-article`,
        newArtShort
      )
      .then((res) => {
        console.log("Disease relatedArticle Added:", res.data);
        navigate(`/article-table`);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    // delete article in temp
    onDelete();
  }

  async function onDelete() {
    if (
      window.confirm("Bạn có chắc muốn xóa bài viết này trong bộ nhớ tạm thời?")
    ) {
      axios
        .delete(`http://localhost:5000/article-temp/${articleId}`)
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
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/article-table`}
                >
                  QUAY LẠI
                </NavLink>
              </div>
              <div className="col-3 d-grid gap-2">
                <NavLink
                  className="btn btn-outline-primary"
                  to={`/disease/${diseaseId}/article-temp/${articleId}/pat-view`}
                >
                  XEM CHẾ ĐỘ NGƯỜI DÙNG
                </NavLink>
              </div>
              {userRole === "head-doctor" && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => onApprove()}
                  >
                    DUYỆT BÀI VIẾT
                  </button>
                </div>
              )}
              {(userRole === "head-doctor" ||
                userInfos.doctorID === article.createInfos.doctorID) && (
                <div className="col-3 d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onDelete()}
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
