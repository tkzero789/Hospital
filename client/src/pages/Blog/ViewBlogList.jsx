import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useParams, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import Footer from "components/HomePage/Footer/Footer";
import "pages/Blog/Blog.css";

const ViewBlogList = () => {
  const params = useParams();
  const pageWithNumber = params.pageWithNumber;
  const pageNumber = parseInt(pageWithNumber.split("-")[1], 10);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber, 10) || 1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const blogsPerPage = 5;

  // Fetch data
  useEffect(() => {
    axios
      .get("http://localhost:5000/blog")
      .then((res) => {
        const blogData = res.data.sort((a, b) => {
          const aDate =
            a.createdAt.split(" ")[1].split("/").reverse().join("-") +
            "T" +
            a.createdAt.split(" ")[0];
          const bDate =
            b.createdAt.split(" ")[1].split("/").reverse().join("-") +
            "T" +
            b.createdAt.split(" ")[0];
          return new Date(bDate) - new Date(aDate); // sort in descending order
        });
        setTimeout(() => {
          setBlogs(blogData);
          console.log(blogData);
          setIsLoading(false);
        }, 600);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // Filter blogs with status "Accepted"
  const acceptedBlogs = blogs.filter((blog) => blog.status === "Approved");

  // Calculate total pages
  useEffect(() => {
    const totalPages = Math.ceil(acceptedBlogs.length / blogsPerPage);
    setTotalPages(totalPages);
  }, [acceptedBlogs]);

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = acceptedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/news/page-${pageNumber}`);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

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
          <title>News</title>
        </Helmet>
      </HelmetProvider>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <div className="blog-list w-100">
            <div className="content-container">
              <h1>News and Insights</h1>
              <div className="blog-list-items">
                {currentBlogs.map((blog) => {
                  if (blog.status === "Pending Create") {
                    return null;
                  } else if (blog.status === "Approved") {
                    const thumbnailImage = blog.content?.content.find(
                      (item) => item.type === "image"
                    );
                    return (
                      <div className="blog-list-item" key={blog.id}>
                        {/* Mobile blog link title */}
                        <div className="mobile-blog-link d-none">
                          <Link to={`/news/view/${blog.id}`}>
                            {blog.title ? blog.title : "Does not have a title"}
                          </Link>
                        </div>
                        {/* Mobile blog image and intro */}
                        <div className="mobile-blog-img-and-intro d-none">
                          <div className="d-flex">
                            <Link
                              className="mobile-blog-thumbnail-img"
                              to={`/news/view/${blog.id}`}
                            >
                              {thumbnailImage && (
                                <img
                                  src={thumbnailImage.attrs.src}
                                  alt={
                                    thumbnailImage.attrs.alt ||
                                    "Thumbnail image"
                                  }
                                />
                              )}
                            </Link>
                            <div className="mobile-blog-intro">
                              <Link>
                                {blog.tag ? blog.tag : "Does not have a tag"}
                              </Link>
                              <span className="d-inline fw-thin fs-14 text-secondary-1">
                                {" "}
                                - {formatDate(blog.createdAt.split(" ")[1])}
                              </span>
                              <span>
                                {blog.intro
                                  ? blog.intro
                                  : "Does not have an intro"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="c-3 md-4">
                          <Link
                            className="blog-thumbnail-img"
                            to={`/news/view/${blog.id}`}
                          >
                            {thumbnailImage && (
                              <img
                                src={thumbnailImage.attrs.src}
                                alt={
                                  thumbnailImage.attrs.alt || "Thumbnail image"
                                }
                              />
                            )}
                          </Link>
                        </div>
                        <div className="c-9 md-8">
                          <div className="blog-link-and-intro">
                            <div className="d-block">
                              <Link to={`/news/view/${blog.slug}`}>
                                {blog.title
                                  ? blog.title
                                  : "Does not have a title"}
                              </Link>
                            </div>
                            <Link>
                              {blog.tag ? blog.tag : "Does not have a tag"}{" "}
                            </Link>
                            <span className="d-inline fw-thin fs-14 text-secondary-1">
                              {" "}
                              - {formatDate(blog.createdAt.split(" ")[1])}
                            </span>
                            <span>
                              {blog.intro
                                ? blog.intro
                                : "Does not have an intro"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="blog-pagination">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  showFirstButton
                  showLastButton
                  onChange={(event, page) => paginate(page)}
                  color="primary"
                />
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default ViewBlogList;
