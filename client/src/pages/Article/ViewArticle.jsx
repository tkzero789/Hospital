import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import ArticleForm from "components/Article/ArticleForm";
import ArticlePatView from "components/Article/ArticleCheckView";
import ConfirmModal from "components/UI/ConfirmModal";

export default function ViewArticle({ userRole, userInfos }) {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  // State for pop-up modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [actionType, setActionType] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  // Show modal
  const handleShowModal = (event, actionType, title, body) => {
    event.preventDefault();
    setActionType(actionType);
    setModalContent({ title, body });
    setShowModal(true);
  };

  // Hide modal
  const handleHideModal = () => {
    setActionType(null);
    setModalContent({ title: "", body: "" });
    setShowModal(false);
  };

  let action;
  switch (actionType) {
    case "edit":
      action = requestEdit;
      break;
    case "delete":
      action = confirmDelete;
      break;
    default:
      action = null;
  }

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
  const { articleId, diseaseId } = useParams();
  const navigate = useNavigate();
  console.log("articleId", articleId);
  console.log("diseaseId", diseaseId);

  // get article from DB by articleId
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/article/${articleId}`)
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

  // Set display
  async function setDisplay() {
    try {
      console.log(apiConfig);
      await axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/article/${article.id}/set-isdisplay`,
          { diseaseId: article.diseaseId },
          apiConfig
        )
        .then((res) => {
          window.alert("Set as main article successfully!");
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

  // Delete
  async function confirmDelete() {
    setIsClicked(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/article/delete/${articleId}`,
        apiConfig
      );
    } catch (err) {
      console.log(`${err}`);
    }
    setTimeout(() => {
      toast.success("Deleted article successfully!");
      setTimeout(() => {
        navigate(`/disease/${diseaseId}/article-table`);
      }, 1200);
    }, 500);
  }

  // Request edit
  async function requestEdit() {
    setIsClicked(true);
    try {
      axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/article/update/${articleId}`,
        {
          status: "Edit Requested",
        },
        apiConfig
      );
    } catch (err) {
      console.log(`${err}`);
    }
    setTimeout(() => {
      toast.success("Requested successfully!");
      setTimeout(() => {
        navigate("/article-table");
      }, 1200);
    }, 500);
  }

  return (
    <div>
      {isPatView ? (
        ArticlePatView({ article, setIsPatView })
      ) : (
        <div>
          <h3 className="container text-center text-body pt-5">View article</h3>
          <div className="container p-5">
            <div className="card border-0 box-shadow-6 p-5">
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
                        ? "Already the main article"
                        : "Set as main article"}
                    </button>
                  </div>
                )}
                <div className="row pt-3 pb-3 justify-content-end">
                  {userRole === "admin" && (
                    <div className="col-2 d-grid gap-2 me-auto">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={(event) =>
                          handleShowModal(
                            event,
                            "delete",
                            "Delete article",
                            "This action will permanently delete the article from the database. Would you like to proceed?"
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  <div className="col-2 d-grid gap-2">
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
                  <div className="col-2 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setIsPatView(true)}
                    >
                      See user's view
                    </button>
                  </div>
                  {userRole === "admin" && (
                    <div className="col-2 d-grid gap-2">
                      <button
                        className="btn btn-warning"
                        onClick={(event) =>
                          handleShowModal(
                            event,
                            "edit",
                            "Request changes",
                            "Would you like to request content revisions for this article?"
                          )
                        }
                      >
                        Request changes
                      </button>
                    </div>
                  )}
                </div>
              </form>
              <Toaster
                toastOptions={{
                  className: "toast-noti",
                }}
                position="top-right"
                richColors
              />
              <ConfirmModal
                title={modalContent.title}
                body={modalContent.body}
                show={showModal}
                hide={handleHideModal}
                action={action}
                isClicked={isClicked}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
