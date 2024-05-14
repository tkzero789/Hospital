import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewBlog({ userRole, userInfos }) {
  const [blog, setBlog] = useState({});
  const { blogId } = useParams();
  const navigate = useNavigate();

  // Fetch blog content based on id
  useEffect(() => {
    axios
      .get(`http://localhost:5000/blog/${blogId}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [blogId]);

  // Update blog status
  function updateStatus(newStatus) {
    axios
      .post(`http://localhost:5000/blog/update/${blogId}`, {
        status: newStatus,
      })
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
    navigate("/blog-table");
  }

  // Delete a blog from database
  const deleteBlog = () => {
    axios
      .delete(`http://localhost:5000/blog/${blogId}`)
      .then((res) => {
        navigate("/blog-table");
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  };

  // Navigate to edit current viewed blog
  function editBlog() {
    navigate(`/blog/${blogId}/edit`);
  }

  console.log(userInfos.doctorID);
  console.log(blog);

  return (
    <>
      <div className="content-container individual-blog">
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <div className="blog-author-info">
            <div className="d-flex flex-column">
              <div className="text-secondary-1">
                Tác giả:{" "}
                <span className="text-blue-1 fw-bold">{blog.author}</span>
              </div>
              <span className="text-secondary-1">
                Cập nhật lần cuối: {blog.createdAt}
              </span>
            </div>
          </div>
          <p>{blog.intro}</p>
          {blog.content?.content?.map((item, index) => {
            if (item.type === "paragraph") {
              if (item.content === undefined) {
                return null;
              }
              return (
                <p key={index}>
                  {item.content?.map((textObj, textObjIndex) => {
                    if (
                      textObj.marks &&
                      textObj.marks.some((mark) => mark.type === "bold")
                    ) {
                      return (
                        <strong>
                          <span key={textObjIndex}>{textObj.text}</span>
                        </strong>
                      );
                    } else {
                      return <span key={textObjIndex}>{textObj.text}</span>;
                    }
                  })}
                </p>
              );
            } else if (item.type === "bulletList") {
              return (
                <ul key={index}>
                  {item.content?.map((listItem, listItemIndex) => (
                    <li key={listItemIndex}>
                      {listItem.content?.map((paragraph, paragraphIndex) => (
                        <span key={paragraphIndex}>
                          {paragraph.content?.map((textObj, textObjIndex) => (
                            <span key={textObjIndex}>{textObj.text}</span>
                          ))}
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              );
            } else if (item.type === "orderedList") {
              return (
                <ol key={index}>
                  {item.content?.map((listItem, listItemIndex) => (
                    <li key={listItemIndex}>
                      {listItem.content?.map((paragraph, paragraphIndex) => (
                        <span key={paragraphIndex}>
                          {paragraph.content?.map((textObj, textObjIndex) => (
                            <span key={textObjIndex}>{textObj.text}</span>
                          ))}
                        </span>
                      ))}
                    </li>
                  ))}
                </ol>
              );
            } else if (item.type === "heading" && item.attrs.level === 1) {
              return (
                <h1 key={index}>
                  {item.content?.map((textObj, textObjIndex) => (
                    <span key={textObjIndex}>{textObj.text}</span>
                  ))}
                </h1>
              );
            } else if (item.type === "image") {
              return (
                <div className="blog-img">
                  <img
                    key={index}
                    src={item.attrs.src}
                    alt={item.attrs.alt || ""}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="row justify-content-end pe-5 pt-3 pb-5">
        <div className="col-2 d-grid">
          <NavLink
            className="btn btn-outline-secondary col-3 w-100"
            to={`/blog-table`}
          >
            Quay lại
          </NavLink>
        </div>
        {userRole === "admin" && (
          <>
            <div className="col-2 d-grid">
              <button
                type="button"
                className={`btn ${
                  blog.status === "Accepted" || blog.status === "Request edit"
                    ? "btn-outline-success"
                    : "btn-success"
                }`}
                disabled={
                  blog.status === "Accepted" || blog.status === "Request edit"
                }
                onClick={() => updateStatus("Accepted")}
              >
                Chấp nhận
              </button>
            </div>
            <div className="col-2 d-grid">
              <button
                type="button"
                className={`btn ${
                  blog.status === "Request edit"
                    ? "btn-outline-warning"
                    : "btn-warning"
                }`}
                disabled={blog.status === "Request edit"}
                onClick={() => updateStatus("Request edit")}
              >
                Yêu cầu chỉnh sửa
              </button>
            </div>

            <div className="col-2 d-grid">
              <button
                type="button"
                className={`btn ${
                  blog.status === "Pending" || blog.status === "Accepted"
                    ? "btn-outline-danger"
                    : "btn-danger"
                }`}
                disabled={
                  blog.status === "Pending" || blog.status === "Accepted"
                }
                onClick={() => deleteBlog()}
              >
                Xoá
              </button>
            </div>
          </>
        )}

        {(userRole === "head-doctor" || userRole === "doctor") && (
          <div className="col-2 d-grid">
            <button
              type="button"
              className="btn btn-success"
              disabled={
                blog.status === "Accepted" ||
                userInfos.doctorID !== blog.doctorID
              }
              onClick={editBlog}
            >
              Chỉnh sửa
            </button>
          </div>
        )}
      </div>
    </>
  );
}
