import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useParams, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import Footer from "components/HomePage/Footer/Footer";
import BlogFilter from "components/Blog/BlogFilter";
import MobileBlogFilter from "components/Blog/MobileBlogFilter";
import Spinner from "components/UI/Spinner";
import BlogSkeleton from "components/Blog/BlogSkeleton";
import FormatDate from "utilities/FormatDate";
import "pages/Blog/Blog.scss";

const ViewBlogList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const pageWithNumber = params.pageWithNumber;
  const pageNumber = parseInt(pageWithNumber.split("-")[1], 10);
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber, 10) || 1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [displayBlogs, setDisplayBlogs] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const blogsPerPage = 5;

  // Fetch data & filter blogs based on selected tag
  useEffect(() => {
    const fetchAndProcessBlogs = async () => {
      let allFilteredBlogs;

      // If there is at least on tag being selected
      if (selectedTags.length > 0) {
        setIsChecked(true);
        setIsFilter(true);
        const tagsQuery = selectedTags
          .map((tag) => encodeURIComponent(tag))
          .join(",");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/news/blogByTags?tags=${tagsQuery}`
        );
        allFilteredBlogs = response.data;

        // Calculate and update totalPages based on the number of allFilteredBlogs
        const newTotalPages = Math.ceil(allFilteredBlogs.length / blogsPerPage);
        setTotalPages(newTotalPages);

        // Determine which blogs to display based on the current page
        const startIndex = (currentPage - 1) * blogsPerPage;
        const endIndex = startIndex + blogsPerPage;
        const blogsToDisplay = allFilteredBlogs.slice(startIndex, endIndex);

        await new Promise((resolve) => setTimeout(resolve, 0)); // re-render the skeleton

        setDisplayBlogs(blogsToDisplay);

        await new Promise((resolve) => setTimeout(resolve, 500)); // display the skeleton for extra 0.5s

        setIsFilter(false);
      } else {
        setIsChecked(false);
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/news/blog?page=${currentPage}&limit=${blogsPerPage}`
        );
        let data = response.data;
        console.log(data);

        // Update the state (5 blogs per page)
        setDisplayBlogs(data.blogs);

        // Update the number of totalPages
        setTotalPages(data.totalPages);

        setIsLoading(false);
      }
    };

    fetchAndProcessBlogs();
  }, [selectedTags, currentPage]);

  // Handle checkbox change when select tag
  const handleCheckboxChange = (tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
    setCurrentPage(1);
    paginate(1);
  };

  // Open mobile filter blogs option
  const handleOpenFilter = (e) => {
    e.preventDefault();
    setOpenFilter(!openFilter);
  };

  // Pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/news/page-${pageNumber}`);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>News</title>
        </Helmet>
      </HelmetProvider>
      {isLoading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="blog-list w-100">
            <div className="content-container">
              <h1>News and Insights</h1>
              <div className="d-flex">
                <BlogFilter
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                  handleCheckboxChange={handleCheckboxChange}
                  isFilter={isFilter}
                  setCurrentPage={setCurrentPage}
                  paginate={paginate}
                />
                <div className="blog-list-items">
                  {/* Mobile blog filter */}
                  <button
                    className="m-open-filter-btn"
                    onClick={handleOpenFilter}
                  >
                    <i className="bi bi-filter"></i>
                    <span className="ps-1">Filter blogs</span>
                  </button>
                  <MobileBlogFilter
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    handleCheckboxChange={handleCheckboxChange}
                    isFilter={isFilter}
                    setCurrentPage={setCurrentPage}
                    paginate={paginate}
                  />
                  <div className="blog-list-items-wrapper">
                    <span>Latest Health News & Updates</span>
                    {isFilter ? (
                      <BlogSkeleton />
                    ) : (
                      displayBlogs.map((blog) => {
                        const thumbnailImage = blog.content?.content.find(
                          (item) => item.type === "image"
                        );
                        return (
                          <div className="blog-list-item" key={blog.id}>
                            {/* Mobile blog link title */}
                            <div className="mobile-blog-link d-none">
                              <Link
                                to={`/news/view/${blog.slug}`}
                                target={isChecked ? "_blank" : undefined}
                              >
                                {blog.title
                                  ? blog.title
                                  : "Does not have a title"}
                              </Link>
                            </div>
                            {/* Mobile blog image and intro */}
                            <div className="mobile-blog-img-and-intro d-none">
                              <div className="d-flex">
                                <Link
                                  className="mobile-blog-thumbnail-img"
                                  to={`/news/view/${blog.slug}`}
                                  target={isChecked ? "_blank" : undefined}
                                >
                                  {thumbnailImage && (
                                    <img
                                      src={thumbnailImage.attrs.src}
                                      alt={
                                        thumbnailImage.attrs.alt ||
                                        "Thumbnail image"
                                      }
                                      loading="lazy"
                                    />
                                  )}
                                </Link>
                                <div className="mobile-blog-intro">
                                  <Link>
                                    {blog.tag
                                      ? blog.tag
                                      : "Does not have a tag"}
                                  </Link>
                                  <span className="d-inline fw-thin fs-14 text-secondary-1 ps-2">
                                    <FormatDate date={blog.createdAt} />
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
                                to={`/news/view/${blog.slug}`}
                                target={isChecked ? "_blank" : undefined}
                              >
                                {thumbnailImage && (
                                  <img
                                    src={thumbnailImage.attrs.src}
                                    alt={
                                      thumbnailImage.attrs.alt ||
                                      "Thumbnail image"
                                    }
                                    loading="lazy"
                                  />
                                )}
                              </Link>
                            </div>
                            <div className="c-9 md-8">
                              <div className="blog-link-and-intro">
                                <div className="d-block">
                                  <Link
                                    to={`/news/view/${blog.slug}`}
                                    target={isChecked ? "_blank" : undefined}
                                  >
                                    {blog.title
                                      ? blog.title
                                      : "Does not have a title"}
                                  </Link>
                                </div>
                                <Link>
                                  {blog.tag ? blog.tag : "Does not have a tag"}{" "}
                                </Link>
                                <span className="d-inline fw-thin fs-14 text-secondary-1 ps-2">
                                  <FormatDate date={blog.createdAt} />
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
                      })
                    )}
                  </div>
                </div>
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
