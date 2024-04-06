import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminNavBar from "../components/AdminNavBar";
import DoctorNav from "../components/DoctorNav";

const Article = (props) => (
  <div className="article-item d-flex px-0 py-0 ms-3 my-2 ">
    <div className="d-flex border border-secondary-subtle shadow-sm rounded">
      <div
        className="article-item py-0 px-0 b rounded-start px-3 py-2"
        style={{ display: "flex" }}
      >
        <Link
          className="text-body text-decoration-none"
          to={`/edit-article/${props.article._id}`}
        >
          <div>{props.article.title}</div>
        </Link>
      </div>
      <div>
        <Link
          to={`/edit-article/${props.article._id}`}
          className="rounded position-absolute bg-success bg-gradient py-2 px-3 ms-3"
        >
          <i className="text-light text-opacity-75 bi bi-pencil"></i>
        </Link>
      </div>
      <div>
        <Link>
          <i
            className="rounded position-absolute bg-danger bg-gradient bi bi-trash-fill text-light text-opacity-75 py-2 px-3 ms-7"
            onClick={() => {
              props.onDelete(props.article._id);
            }}
          ></i>
        </Link>
      </div>
    </div>
  </div>
);

export default function ArticleByDisease() {
  const [articles, setArticles] = useState([]);
  const params = useParams();
  useEffect(() => {
    axios
      .get(
        `https://symptom-checker-with-mern-backend.onrender.com/article-list/${params.id.toString()}`
      )
      .then((res) => {
        const articles = res.data;
        setArticles(articles);
      })
      .catch((err) => {
        const message = `An error occurred: ${err}`;
        window.alert(message);
        return;
      });
  }, [articles.length]);

  async function onDelete(id) {
    if (window.confirm("Are you sure you want to delete this article?")) {
      axios
        .delete(
          `https://symptom-checker-with-mern-backend.onrender.com/article/${id}`
        )
        .then(() => {
          const newarticles = articles.filter((article) => article._id !== id);
          setArticles(newarticles);
        })
        .catch((err) => {
          const message = `An error occurred: ${err}`;
          window.alert(message);
          return;
        });
    }
  }

  function articleList() {
    return articles.map((article) => {
      return (
        <Article
          article={article}
          onDelete={() => onDelete(article._id)}
          key={article._id}
        />
      );
    });
  }

  return (
    <>
      <div>
        <DoctorNav />
        <AdminNavBar />
        <h4 className="container text-center text-body pt-5">
          DANH SÁCH BÀI VIẾT LIÊN QUAN
        </h4>
        <div className="container p-5">
          <div className="border border-secondary border-opacity-25 rounded shadow p-5">
            <form>
              <h4 className="card-title text-body">Những bài viết đã có:</h4>

              <div className="row d-flex px-3 pt-2 pb-2">{articleList()}</div>

              <div className="d-flex justify-content-evenly row pt-3">
                <div className="col-3 d-grid gap-2">
                  <NavLink
                    className="btn btn-primary bg-gradient"
                    to={`/create-article/${params.id.toString()}`}
                  >
                    TẠO BÀI VIẾT MỚI
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
