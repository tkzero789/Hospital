import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewBlog({ userRole }) {
  const [blog, setBlog] = useState({
    title: "",
    intro: "",
    content: "",
    status: "",
    image: "",
    createAt: "",
  });
  const { blogId } = useParams();
  const navigate = useNavigate();

  // Fetch blog content based on id
  useEffect(() => {
    console.log(blogId);
    axios
      .get(`http://localhost:5000/blog/${blogId}`)
      .then((res) => {
        setBlog(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [blogId]);

  // Update blog status
  function updateStatus(newStatus) {
    console.log(newStatus);
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
  }

  // Delete a blog from database
  const deleteBlog = () => {
    axios
      .delete(`http://localhost:5000/blog/${blogId}`)
      .then((res) => {
        console.log(res);
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

  return (
    <>
      <div className="content-container individual-blog">
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.intro}</p>
          {blog.image && (
            <div className="blog-img">
              <img src={blog.image} alt={blog.title} />
            </div>
          )}
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
            }
            return null;
          })}
        </div>
      </div>
      <div className="row pt-3 pb-3 justify-content-end">
        <div className="col-3 d-grid gap-2">
          <NavLink className="btn btn-outline-primary" to={`/blog-table`}>
            QUAY LẠI
          </NavLink>
        </div>
        {userRole === "admin" && (
          <div>
            <div className="col-3 d-grid gap-2">
              <button
                type="button"
                className="btn btn-outline-primary"
                disabled={blog.status === "Accepted"}
                onClick={() => updateStatus("Accepted")}
              >
                CHẤP NHẬN
              </button>
            </div>
            <div className="col-3 d-grid gap-2">
              <button
                type="button"
                className="btn btn-outline-danger"
                disabled={blog.status === "Declined"}
                onClick={() => updateStatus("Declined")}
              >
                TỪ CHỐI
              </button>
            </div>
            <div className="col-3 d-grid gap-2">
              <button
                type="button"
                className="btn btn-outline-danger"
                disabled={blog.status === "Pending"}
                onClick={() => deleteBlog()}
              >
                Xoá
              </button>
            </div>
          </div>
        )}
        {(userRole === "head-doctor" || userRole === "doctor") && (
          <div className="col-3 d-grid gap-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              disabled={blog.status === "Accepted"}
              onClick={editBlog}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </>
  );
}
