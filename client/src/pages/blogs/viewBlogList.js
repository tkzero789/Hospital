import axios from "axios";
import LowNav from "../../components/Navbar/LowNav";
import MainNav from "../../components/Navbar/MainNav";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ViewBlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blog")
      .then((res) => {
        const blogData = res.data;
        setBlogs(blogData);
        console.log(blogData);
      })
      .catch((err) => {
        const message = err;
        console.log(message);
      });
  }, []);

  blogs.map((blog) => console.log(blog.id));

  return (
    <>
      <MainNav />
      <LowNav />
      <div className="content-container">
        <Breadcrumbs
          className="breadcrumbs"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link className="text-secondary" to="/home">
            Trang chủ
          </Link>
          ,<Typography className="text-dark">Tin tức</Typography>,
        </Breadcrumbs>
      </div>
      <div className="content-container">
        <h4>Blogs list</h4>
        <div className="blog-list">
          {blogs.map((blog, index) => {
            if (blog.status === "Pending") {
              return null;
            } else if (blog.status === "Accepted") {
              return (
                <Link key={index} to={`/view-blog-list/${blog.id}`}>
                  {blog.title ? blog.title : "Does not have a title"}
                </Link>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default ViewBlogList;
