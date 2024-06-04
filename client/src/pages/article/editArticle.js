import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import ArticleForm from "../../components/ArticleParts/ArticleForm";

export default function EditArticle({ userRole, userInfos }) {
  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [origTitle, setOrigTitle] = useState("");
  const { diseaseId, articleId } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    id: "",
    title: "",
    diseaseId: "",
    diseaseName: "",
    infos: [
      {
        id: uuidv4(),
        number: 1,
        about: "",
        overview: "",
        detail: "",
        image: null,
      },
    ],
    treatments: [
      {
        id: uuidv4(),
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
    isDisplay: false,
    status: "",
  });

  // get article by articleId
  useEffect(() => {
    axios
      .get(`http://localhost:5000/article/${articleId}`)
      .then((res) => {
        const dbArticle = res.data;
        if (!dbArticle) {
          window.alert(`Can't find article with id ${articleId} `);
          navigate(-1);
          return;
        }
        if (dbArticle.createInfos.doctorID !== userInfos.doctorID) {
          window.alert("Only head doctors can modify this article");
          navigate(-1);
          return;
        }
        setArticle({
          ...dbArticle,
          idTemp: uuidv4(),
          createInfos: {
            ...dbArticle.createInfos,
            timeEdited: formattedTime,
          },
          status: "Pending Update",
          doctorReqID: userInfos.doctorID,
        });
        setOrigTitle(dbArticle.title);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [articleId, navigate]);

  function confirmCancel() {
    navigate("/article-table");
  }

  async function confirmEdit(e) {
    e.preventDefault();
    // validation fields
    if (article.title === "") {
      alert("Please enter article title");
      return;
    } else if (
      article.infos.filter(
        (info) =>
          info.about === "" || info.overview === "" || info.detail === ""
      ).length > 0
    ) {
      alert("Please enter info for this article");
      return;
    } else if (
      article.treatments.filter(
        (trm) => trm.about === "" || trm.overview === "" || trm.detail === ""
      ).length > 0
    ) {
      alert("Please enter treatments info for this article");
      return;
    } else {
      try {
        if (origTitle !== article.title) {
          await axios
            .get(`http://localhost:5000/article/${article.title}`)
            .then((res) => {
              if (res.data) {
                throw new Error("Duplicated article name!");
              }
            });
        }
        // Edit article
        axios
          .put(`http://localhost:5000/article/edit/${articleId}`, article)
          .then((res) => {
            if (res.data && res.data.message === "Article already exists") {
              throw new Error("Thanks, wait for admin approval!");
            }
            console.log("Article edited", res.data);
          });
        navigate(`/disease/${diseaseId}/article-table`);
      } catch (err) {
        const message = `Error: ${err}`;
        window.alert(message);
      }
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">Edit article</h3>
      <div className="container p-5">
        <div className="card border-primary-subtle p-5">
          <form>
            <div>
              {
                <ArticleForm
                  article={article}
                  setArticle={setArticle}
                  mode="edit"
                />
              }
            </div>
            <div className="row pt-3 pb-3 justify-content-end">
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={confirmCancel}
                >
                  Cancel
                </button>
              </div>
              <div className="col-3 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    confirmEdit(e);
                  }}
                >
                  Confirm edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
