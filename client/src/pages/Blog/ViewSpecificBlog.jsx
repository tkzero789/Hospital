import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";
import Footer from "components/HomePage/Footer/Footer";
import "pages/Blog/Blog.css";

const ViewSpecificBlog = () => {
  const { blogSlug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blog")
      .then((res) => {
        setTimeout(() => {
          setBlogs(res.data);
          setIsLoading(false);
        }, 400);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(true);
      });
  }, []);

  const blog = blogs.find((blog) => blog.slug === blogSlug);

  console.log(blogs);

  // Function to map month numbers to month names
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Subtract 1 to get the correct index (0-based) from the month number (1-based)
    return monthNames[parseInt(monthNumber, 10) - 1];
  };

  const formatDate = (dateString) => {
    const parts = dateString.split("/");
    const monthName = getMonthName(parts[0]);
    return `${monthName} ${parts[1]}, ${parts[2]}`;
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{blog && blog.title ? blog.title : ""}</title>
        </Helmet>
      </HelmetProvider>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="content-container">
            <Breadcrumbs
              className="breadcrumbs"
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link className="text-blue-2" to="/home">
                Home
              </Link>
              ,
              <Link className="text-blue-2" to="/news/page-1">
                News & Insights
              </Link>
              ,
            </Breadcrumbs>
          </div>

          <div className="content-container individual-blog">
            <div key={blog.id}>
              <h2>{blog.title}</h2>
              <Link className="blog-tag">{blog.tag}</Link>
              <div className="blog-author-info">
                <div className="d-flex flex-column">
                  <div className="text-secondary-1">
                    By: <span className="text-blue-3">{blog.author}</span>
                  </div>
                  <span className="text-secondary-1">
                    Last updated: {formatDate(blog.createdAt.split(" ")[1])}
                  </span>
                </div>
                <div className="ms-auto">
                  <Link
                    className="text-decoration-none text-blue fs-3 me-2"
                    to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link
                    className="text-decoration-none text-black fs-3 me-2"
                    to="#"
                  >
                    <i className="bi bi-twitter-x"></i>
                  </Link>

                  <Link
                    className="text-decoration-none text-blue-1 fs-3 me-2"
                    to="#"
                  >
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </div>
              </div>
              <p>{blog.intro}</p>
              {blog.content?.content.map((item, itemIndex) => {
                const keyPrefix = `${item.type}-${itemIndex}`;

                if (item.type === "paragraph") {
                  if (item.content === undefined) {
                    return null;
                  }
                  return (
                    <p key={keyPrefix}>
                      {item.content?.map((textObj, textObjIndex) => {
                        const key = `${keyPrefix}-p-${textObjIndex}`;
                        if (
                          textObj.marks &&
                          textObj.marks.some((mark) => mark.type === "bold")
                        ) {
                          return (
                            <strong key={key}>
                              <span>{textObj.text}</span>
                            </strong>
                          );
                        } else {
                          return <span key={key}>{textObj.text}</span>;
                        }
                      })}
                    </p>
                  );
                } else if (item.type === "bulletList") {
                  return (
                    <ul key={keyPrefix}>
                      {item.content?.map((listItem, listItemIndex) => {
                        const liKey = `${keyPrefix}-li-${listItemIndex}`;
                        return (
                          <li key={liKey}>
                            {listItem.content?.map(
                              (paragraph, paragraphIndex) => {
                                const spanKey = `${liKey}-span-${paragraphIndex}`;
                                return (
                                  <span key={spanKey}>
                                    {paragraph.content?.map(
                                      (textObj, textObjIndex) => {
                                        const textKey = `${spanKey}-text-${textObjIndex}`;
                                        return (
                                          <span key={textKey}>
                                            {textObj.text}
                                          </span>
                                        );
                                      }
                                    )}
                                  </span>
                                );
                              }
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  );
                } else if (item.type === "orderedList") {
                  return (
                    <ol key={keyPrefix}>
                      {item.content?.map((listItem, listItemIndex) => {
                        const liKey = `${keyPrefix}-li-${listItemIndex}`;
                        return (
                          <li key={liKey}>
                            {listItem.content?.map(
                              (paragraph, paragraphIndex) => {
                                const spanKey = `${liKey}-span-${paragraphIndex}`;
                                return (
                                  <span key={spanKey}>
                                    {paragraph.content?.map(
                                      (textObj, textObjIndex) => {
                                        const textKey = `${spanKey}-text-${textObjIndex}`;
                                        return (
                                          <span key={textKey}>
                                            {textObj.text}
                                          </span>
                                        );
                                      }
                                    )}
                                  </span>
                                );
                              }
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  );
                } else if (item.type === "heading" && item.attrs.level === 4) {
                  return (
                    <h4 key={keyPrefix}>
                      {item.content?.map((textObj, textObjIndex) => {
                        const key = `${keyPrefix}-h4-${textObjIndex}`;
                        return <span key={key}>{textObj.text}</span>;
                      })}
                    </h4>
                  );
                } else if (item.type === "image") {
                  const imgKey = `${keyPrefix}-img`;
                  return (
                    <div className="blog-img" key={imgKey}>
                      <img src={item.attrs.src} alt={item.attrs.alt || ""} />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ViewSpecificBlog;
