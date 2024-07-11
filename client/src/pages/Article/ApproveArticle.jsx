import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";
import ArticleForm from "components/Article/ArticleForm";
import ArticlePatView from "components/Article/ArticleCheckView";
import ConfirmModal from "components/UI/ConfirmModal";

export default function ApproveArticle({ userRole, userInfos }) {
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
    case "approve":
      action = confirmApprove;
      break;
    case "edit":
      action = requestEdit;
      break;
    case "delete":
      action = confirmDelete;
      break;
    default:
      action = null;
  }

  const [isPatView, setIsPatView] = useState(false);
  const { articleId } = useParams();
  const [article, setArticle] = useState({
    id: "",
    title: "",
    diseaseId: "",
    diseaseName: "",
    infos: [
      {
        overview: "",
        detail: "",
        image: null,
      },
    ],
    treatments: [
      {
        overview: "",
        detail: "",
        image: null,
      },
    ],
    medSpecialty: "",
    createInfos: {
      doctorCreated: "",
      doctorID: "",
      timeCreated: "",
      timeEdited: null,
    },
    isDisplay: "",
    status: "",
    doctorReqID: "",
  });
  const navigate = useNavigate();

  // get article from DB by articleId
  useEffect(() => {
    axios
      .get(`https://bayside-render-server.onrender.com/article/${articleId}`)
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

  // Approve
  async function confirmApprove() {
    axios
      .put(
        `https://bayside-render-server.onrender.com/article/update/${articleId}`,
        {
          status: "Approved",
        },
        apiConfig
      )
      .then((res) => {
        if (res.data && res.data.message === "Article already exists") {
          throw new Error("Article already exists!");
        }
        setIsClicked(true);
        console.log("Article created:", res.data);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
    setTimeout(() => {
      toast.success("Approved!");
      setTimeout(() => {
        navigate("/article-table");
      }, 1200);
    }, 500);
  }

  // Request edit
  async function requestEdit() {
    setIsClicked(true);
    try {
      axios.put(
        `https://bayside-render-server.onrender.com/article/update/${articleId}`,
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

  // Delete
  async function confirmDelete() {
    setIsClicked(true);
    try {
      await axios.delete(
        `https://bayside-render-server.onrender.com/article/delete/${articleId}`,
        apiConfig
      );
    } catch (err) {
      console.log(`${err}`);
    }
    setTimeout(() => {
      toast.success("Deleted article successfully!");
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
          <h3 className="container text-center text-dark-header pt-5">
            Article approval
          </h3>
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
                <div className="row pt-3 pb-3 justify-content-end">
                  {userRole === "admin" && (
                    <div className="c-2 d-grid gap-2 me-auto">
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
                  <div className="c-2 d-grid gap-2">
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

                  <div className="c-2 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setIsPatView(true)}
                    >
                      See user's view
                    </button>
                  </div>
                  {userRole === "admin" &&
                    article.status !== "Edit Requested" && (
                      <div className="c-2 d-grid gap-2">
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

                  {userRole === "admin" &&
                    (article.status === "Awaiting Review" ||
                      article.status === "Updated Revision") && (
                      <div className="c-2 d-grid gap-2">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={(event) =>
                            handleShowModal(
                              event,
                              "approve",
                              "Approval confirmation",
                              "The approved article will be added into the database. Would you like to perform this action?"
                            )
                          }
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  {userRole !== "admin" &&
                    article.status === "Edit Requested" &&
                    userInfos.doctorID === article.createInfos.doctorID && (
                      <div className="c-2 d-grid gap-2">
                        <Link
                          className="btn btn-warning"
                          to={`/disease/${article.diseaseId}/article/${article.id}/edit`}
                        >
                          Edit
                        </Link>
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
