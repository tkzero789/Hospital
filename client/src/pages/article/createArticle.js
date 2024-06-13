import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "sonner";
import ArticleForm from "components/Article/ArticleForm";
import ArticlePatView from "components/Article/ArticlePatView";
import ConfirmModal from "components/UI/ConfirmModal/ConfirmModal";

export default function CreateArticle({ userRole, userInfos }) {
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
    case "create":
      action = confirmCreate;
      break;
    default:
      action = null;
  }

  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()}`;

  const [isPatView, setIsPatView] = useState(false);
  const [article, setArticle] = useState({
    id: uuidv4(),
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
    medSpecialty: userInfos.medSpecialty,
    createInfos: {
      doctorCreated: userInfos.fullName,
      doctorID: userInfos.doctorID,
      timeCreated: formattedTime,
      timeEdited: null,
    },
    isDisplay: false,
    status: "Pending Create",
    doctorReqID: userInfos.doctorID,
  });

  const { diseaseId } = useParams();
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/disease/${diseaseId}`)
      .then((res) => {
        const disease = res.data;
        setArticle({
          ...article,
          diseaseId: disease.id,
          diseaseName: disease.name,
        });
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [diseaseId]);

  // Cancel
  function confirmCancel() {
    navigate("/disease-table");
  }

  // Create
  async function confirmCreate() {
    // validation fields
    if (article.title === "") {
      toast.error("Please enter title");
      return;
    } else if (
      article.infos.filter(
        (info) =>
          info.about === "" || info.overview === "" || info.detail === ""
      ).length > 0
    ) {
      toast.error("Disease info missing");
      return;
    } else if (
      article.treatments.filter(
        (trm) => trm.about === "" || trm.overview === "" || trm.detail === ""
      ).length > 0
    ) {
      toast.error("Disease treatment missing");
      return;
    } else {
      setIsClicked(true);
      try {
        // Create new article
        await axios
          .post("http://localhost:5000/article/add", article, apiConfig)
          .then((res) => {
            if (res.data && res.data.message === "Article already exists") {
              throw new Error("Duplicated");
            }
            console.log("Article created:", res.data);
          });
      } catch (err) {
        const message = `Error: ${err}`;
        window.alert(message);
      }
      setTimeout(() => {
        toast.success("Created successfully!");
        setTimeout(() => {
          navigate(`/disease/${diseaseId}/article-table`);
        }, 1200);
      }, 500);
    }
  }

  console.log("Article: ", article);

  return (
    <div>
      {isPatView ? (
        ArticlePatView({ article, setIsPatView })
      ) : (
        <div>
          <h3 className="container text-center text-dark-header pt-5">
            Create new article
          </h3>
          <div className="container p-5">
            <div className="card bg-light p-5">
              <form>
                <div>
                  {
                    <ArticleForm
                      article={article}
                      setArticle={setArticle}
                      mode="create"
                    />
                  }
                </div>

                <div className="row pt-3 pb-3 justify-content-end">
                  <div className="c-2 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={confirmCancel}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="c-2 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => setIsPatView(true)}
                    >
                      User's view
                    </button>
                  </div>
                  <div className="c-2 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(event) =>
                        handleShowModal(
                          event,
                          "create",
                          "Confirm create",
                          "Are you sure you want to create this article with from selected disease?"
                        )
                      }
                    >
                      Create
                    </button>
                  </div>
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
