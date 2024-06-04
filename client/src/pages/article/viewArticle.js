import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import ArticleForm from "../../components/ArticleParts/ArticleForm";
import ArticlePatView from "../../components/ArticleParts/ArticlePatView";

export default function ViewArticle({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  const [article, setArticle] = useState({
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
  const [isPatView, setIsPatView] = useState(false);
  const { diseaseId, articleId } = useParams();
  const navigate = useNavigate();

  // get article from DB by articleId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/${articleId}`)
      .then((res) => {
        const dbArticle = res.data;
        if (!dbArticle) {
          window.alert(`Can't find this article with id ${articleId} `);
          navigate(-1);
          return;
        }
        setArticle(dbArticle);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [articleId, navigate]);

  // delete article by articleId
  function confirmDelete() {
    if (window.confirm("Do you want to delete?")) {
      // delete article in disease
      axios
        .post(
          `http://localhost:5000/disease/${diseaseId}/delete-article/${articleId}`
        )
        .catch((err) => {
          const message = `Error: ${err}`;
          window.alert(message);
        });
      // delete article
      axios
        .delete(`http://localhost:5000/article/${articleId}`)
        .catch((err) => {
          const message = `Error: ${err}`;
          window.alert(message);
        });
      navigate(`disease/${diseaseId}/article-table`);
    }
  }

  async function setDisplay() {
    try {
      console.log(apiConfig);
      await axios
        .post(
          `http://localhost:5000/article/${article.id}/set-isdisplay`,
          { diseaseId: article.diseaseId },
          apiConfig
        )
        .then((res) => {
          window.alert("Default article");
          console.log(res);
          setArticle({
            ...article,
            isDisplay: true,
          });
        });
    } catch (err) {
      const message = `Error: ${err}`;
      window.alert(message);
    }
  }

  async function requestEdit() {
    try {
      axios.put(`http://localhost:5000/article/update/${articleId}`, {
        status: "Request Edit",
      });
    } catch (err) {
      console.log(`${err}`);
    }
  }

  return (
    <div>
      {isPatView ? (
        ArticlePatView({ article, setIsPatView })
      ) : (
        <div>
          <h3 className="container text-center text-body pt-5">View article</h3>
          <div className="container p-5">
            <div className="card border-primary-subtle p-5">
              <form>
                <div>
                  {
                    <ArticleForm
                      article={article}
                      setArticle={setArticle}
                      mode="view"
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
                        ? "Default article"
                        : "Set default article"}
                    </button>
                  </div>
                )}
                <div className="row pt-3 pb-3 justify-content-end">
                  <div className="col-3 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Back
                    </button>
                  </div>
                  {userRole === "admin" && (
                    <div className="col-3 d-grid gap-2">
                      <button className="btn btn-warning" onClick={requestEdit}>
                        Request edit
                      </button>
                    </div>
                  )}
                  <div className="col-3 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setIsPatView(true)}
                    >
                      See user's view
                    </button>
                  </div>
                  {userRole === "admin" && (
                    <div className="col-3 d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={confirmDelete}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
