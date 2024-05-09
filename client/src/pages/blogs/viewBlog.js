import axios from "axios";
import LowNav from "../../components/Navbar/LowNav";
import MainNav from "../../components/Navbar/MainNav";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewBlog = () => {
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
        <h4>Blogs list</h4>
        <div className="blog-list">
          {blogs.map((blog, index) => (
            <Link key={index} to={`/view-blog/${blog.id}`}>
              Blog {index + 1}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
