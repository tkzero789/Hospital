import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
import ConfirmModal from "components/UI/ConfirmModal";
import FormatDate from "utilities/FormatDate";
import "pages/Blog/Blog.scss";

export default function ViewBlog({ userRole, userInfos }) {
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
    case "request":
      action = requestEdit;
      break;
    case "delete":
      action = confirmDelete;
      break;

    default:
      action = null;
  }

  const [blog, setBlog] = useState({});
  const { blogId } = useParams();
  const navigate = useNavigate();

  // Fetch blog content based on id
  useEffect(() => {
    axios
      .get(`https://bayside-render-server.onrender.com/blog/${blogId}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [blogId]);

  // Approve
  async function confirmApprove() {
    axios
      .post(
        `https://bayside-render-server.onrender.com/blog/update/${blogId}`,
        {
          status: "Approved",
        },
        apiConfig
      )
      .then(() => {
        setIsClicked(true);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
    setTimeout(() => {
      toast.success("Approved!");
      setTimeout(() => {
        navigate("/blog-table");
      }, 1200);
    }, 500);
  }

  // Request edit
  async function requestEdit() {
    axios
      .post(
        `https://bayside-render-server.onrender.com/blog/update/${blogId}`,
        {
          status: "Edit Requested",
        },
        apiConfig
      )
      .then(() => {
        setIsClicked(true);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
    setTimeout(() => {
      toast.success("Requested successfully!");
      setTimeout(() => {
        navigate("/blog-table");
      }, 1200);
    }, 500);
  }

  // Delete a blog from database
  async function confirmDelete() {
    axios
      .delete(
        `https://bayside-render-server.onrender.com/blog/${blogId}`,
        apiConfig
      )
      .then(() => {
        setIsClicked(true);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
    setTimeout(() => {
      toast.success("Deleted blog successfully!");
      setTimeout(() => {
        navigate("/blog-table");
      }, 1200);
    }, 500);
  }

  // Navigate to edit current viewed blog
  function editBlog() {
    navigate(`/blog/${blogId}/edit`);
  }

  return (
    <>
      <div className="content-container individual-blog justify-content-center">
        <div key={blog.id} className="w-60 pt-4">
          <h2>{blog.title}</h2>
          <Link className="blog-tag pe-none">{blog.tag}</Link>
          <div className="blog-author-info">
            <div className="d-flex flex-column">
              <div className="text-secondary-1">
                By: <span className="text-blue-3">{blog.author}</span>
              </div>
              <span className="text-secondary-1">
                Last updated: <FormatDate date={blog.createdAt} />
              </span>
            </div>
          </div>
          <div className="pt-2 border-top-1"></div>
          <p>{blog.intro}</p>
          {blog.content?.content?.map((item, index) => {
            if (item.type === "paragraph") {
              if (item.content === undefined) {
                return null;
              }
              return (
                <p key={`paragraph-${index}`}>
                  {item.content?.map((textObj, textObjIndex) => {
                    if (
                      textObj.marks &&
                      textObj.marks.some((mark) => mark.type === "bold")
                    ) {
                      return (
                        <strong key={`strong-${index}-${textObjIndex}`}>
                          <span>{textObj.text}</span>
                        </strong>
                      );
                    } else {
                      return (
                        <span key={`span-${index}-${textObjIndex}`}>
                          {textObj.text}
                        </span>
                      );
                    }
                  })}
                </p>
              );
            } else if (item.type === "bulletList") {
              return (
                <ul key={`bulletList-${index}`}>
                  {item.content?.map((listItem, listItemIndex) => (
                    <li key={`listItem-${index}-${listItemIndex}`}>
                      {listItem.content?.map((paragraph, paragraphIndex) => (
                        <span
                          key={`paragraph-${index}-${listItemIndex}-${paragraphIndex}`}
                        >
                          {paragraph.content?.map((textObj, textObjIndex) => (
                            <span
                              key={`textObj-${index}-${listItemIndex}-${paragraphIndex}-${textObjIndex}`}
                            >
                              {textObj.text}
                            </span>
                          ))}
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              );
            } else if (item.type === "orderedList") {
              return (
                <ol key={`orderedList-${index}`}>
                  {item.content?.map((listItem, listItemIndex) => (
                    <li key={`listItem-${index}-${listItemIndex}`}>
                      {listItem.content?.map((paragraph, paragraphIndex) => (
                        <span
                          key={`paragraph-${index}-${listItemIndex}-${paragraphIndex}`}
                        >
                          {paragraph.content?.map((textObj, textObjIndex) => (
                            <span
                              key={`textObj-${index}-${listItemIndex}-${paragraphIndex}-${textObjIndex}`}
                            >
                              {textObj.text}
                            </span>
                          ))}
                        </span>
                      ))}
                    </li>
                  ))}
                </ol>
              );
            } else if (item.type === "heading" && item.attrs.level === 4) {
              return (
                <h4 key={`heading-${index}`}>
                  {item.content?.map((textObj, textObjIndex) => (
                    <span key={`textObj-${index}-${textObjIndex}`}>
                      {textObj.text}
                    </span>
                  ))}
                </h4>
              );
            } else if (item.type === "image") {
              return (
                <div className="blog-img" key={`image-${index}`}>
                  <img src={item.attrs.src} alt={item.attrs.alt || ""} />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="content-container">
        <hr className="my-4" />
        <div className="d-flex justify-content-end pt-4 pb-5">
          {userRole === "admin" && (
            <div className="c-2 px-2 me-auto">
              <button
                type="button"
                className="btn w-100 btn-outline-danger"
                onClick={(event) =>
                  handleShowModal(
                    event,
                    "delete",
                    "Delete blog",
                    "This action will permanently delete the blog from the database. Would you like to proceed?"
                  )
                }
              >
                Delete
              </button>
            </div>
          )}
          <div className="c-2 px-2">
            <NavLink
              className="btn btn-outline-secondary w-100"
              to={`/blog-table`}
            >
              Back
            </NavLink>
          </div>
          {userRole === "admin" && (
            <>
              {blog.status !== "Edit Requested" && (
                <div className="c-2 px-2">
                  <button
                    type="button"
                    className="btn w-100 btn-warning"
                    disabled={blog.status === "Edit Requested"}
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "request",
                        "Request changes",
                        "Would you like to request content revisions for this blog?"
                      )
                    }
                  >
                    Request changes
                  </button>
                </div>
              )}
              {(blog.status === "Awaiting Review" ||
                blog.status === "Updated Revision") && (
                <div className="c-2 px-2">
                  <button
                    type="button"
                    className="btn w-100 btn-success"
                    onClick={(event) =>
                      handleShowModal(
                        event,
                        "approve",
                        "Approval confirmation",
                        "The approved blog will be added into the database. Would you like to perform this action?"
                      )
                    }
                  >
                    Approve
                  </button>
                </div>
              )}
            </>
          )}
          {(userRole === "head-doctor" || userRole === "doctor") &&
            blog.status === "Edit Requested" &&
            userInfos.doctorID === blog.doctorID && (
              <div className="c-2 px-2">
                <button
                  type="button"
                  className="btn btn-warning w-100"
                  onClick={editBlog}
                >
                  Edit
                </button>
              </div>
            )}
        </div>
      </div>
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
    </>
  );
}
