import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ArticleForm from "../../components/ArticleParts/ArticleForm";
import ArticlePatView from "../../components/ArticleParts/ArticlePatView";

export default function ApproveArticle({ userRole, userInfos }) {
  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [isPatView, setIsPatView] = useState(false);
  const { articleId } = useParams();
  const [article, setArticle] = useState({
    id: "",
    idTemp: "",
    title: "",
    diseaseId: "",
    diseaseName: "",
    infos: [
      {
        id: "",
        number: 1,
        about: "",
        overview: "",
        detail: "",
        image: null,
      },
    ],
    treatments: [
      {
        id: "",
        number: 1,
        about: "",
        overview: "",
        detail: "",
        image: null,
      },
    ],
    medSpecialty: "",
    createInfos: {
      doctorCreated: "",
      doctorId: "",
      timeCreated: "",
      timeEdited: "",
    },
    isDisplay: "",
    status: "",
    doctorReqID: "",
  });
  const navigate = useNavigate();

  // get article from DB by articleId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/${articleId}`)
      .then((res) => {
        const dbArticle = res.data;
        if (!dbArticle) {
          window.alert(`Can't find article`);
          navigate("/article-table");
          return;
        }
        setArticle(dbArticle);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [articleId, navigate]);

  async function confirmApprove() {
    axios
      .put(`http://localhost:5000/article/update/${articleId}`, {
        status: "Approved",
      })
      .then((res) => {
        if (res.data && res.data.message === "Article already exists") {
          throw new Error("Article already exists!");
        }
        console.log("Article created:", res.data);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
    navigate("/article-table");
  }

  async function confirmDelete() {
    try {
      await axios.delete(`http://localhost:5000/article/delete/${articleId}`);
    } catch (err) {
      console.log(`${err}`);
    }
    navigate("/article-table");
  }

  return (
    <div>
      {isPatView ? (
        ArticlePatView({ article, setIsPatView })
      ) : (
        <div>
          <h3 className="container text-center text-body pt-5">Article</h3>
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
                  <div className="col-3 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setIsPatView(true)}
                    >
                      See user's view
                    </button>
                  </div>
                  {userRole === "admin" &&
                    (article.status === "Pending Update" ||
                      article.status === "Pending Create") && (
                      <div className="col-3 d-grid gap-2">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={confirmApprove}
                        >
                          Approve
                        </button>
                      </div>
                    )}
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
