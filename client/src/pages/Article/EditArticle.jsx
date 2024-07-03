import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "sonner";
import axios from "axios";
import ArticleForm from "components/Article/ArticleForm";
import ConfirmModal from "components/UI/ConfirmModal";

export default function EditArticle({ userRole, userInfos }) {
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
      action = confirmEdit;
      break;
    case "cancel":
      action = confirmCancel;
      break;
    default:
      action = null;
  }

  const now = new Date();

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
        overview: "",
        detail: "",
        image: "",
      },
    ],
    treatments: [
      {
        overview: "",
        detail: "",
        image: "",
      },
    ],
    medSpecialty: "",
    createInfos: {
      doctorCreated: "",
      doctorId: "",
      timeCreated: "",
      timeEdited: now,
    },
    isDisplay: false,
    status: "",
    doctorReqID: "",
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
            timeEdited: now,
          },
          status: "Updated Revision",
          doctorReqID: userInfos.doctorID,
        });
        setOrigTitle(dbArticle.title);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [articleId, navigate]);

  // Cancel
  function confirmCancel() {
    navigate("/article-table");
  }

  // Confirm edit
  async function confirmEdit() {
    // validation fields
    if (article.title === "") {
      toast.error("Please enter article title");
      return;
    } else if (
      article.infos.filter(
        (info) =>
          info.about === "" || info.overview === "" || info.detail === ""
      ).length > 0
    ) {
      toast.error("Please enter info");
      return;
    } else if (
      article.treatments.filter(
        (trm) => trm.about === "" || trm.overview === "" || trm.detail === ""
      ).length > 0
    ) {
      toast.error("Please enter treatments");
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
          .put(
            `http://localhost:5000/article/edit/${articleId}`,
            article,
            apiConfig
          )
          .then((res) => {
            if (res.data && res.data.message === "Article already exists") {
              throw new Error("Thanks, please wait for admin approval!");
            }
            setIsClicked(true);
            console.log("Article edited", res.data);
          });
      } catch (err) {
        const message = `Error: ${err}`;
        window.alert(message);
      }
      setTimeout(() => {
        toast.success("Submitted revisions successfully");
        setTimeout(() => {
          navigate(`/disease/${diseaseId}/article-table`);
        }, 1200);
      }, 500);
    }
  }

  return (
    <div>
      <h3 className="container text-center text-body pt-5">Edit article</h3>
      <div className="container p-5">
        <div className="card p-5">
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
              <div className="col-2 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={(event) =>
                    handleShowModal(
                      event,
                      "cancel",
                      "Cancel article editing",
                      "Would you like to perform this action?"
                    )
                  }
                >
                  Cancel
                </button>
              </div>
              <div className="col-2 d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={(event) =>
                    handleShowModal(
                      event,
                      "edit",
                      "Review and submit revisions",
                      "Once confirmed, your revisions will be submitted and will go through a review process. Would you like to proceed?"
                    )
                  }
                >
                  Submit revisions
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
  );
}
