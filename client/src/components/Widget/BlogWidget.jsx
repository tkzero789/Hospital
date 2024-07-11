import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import "components/Widget/Widget.scss";

const BlogWidget = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/blog`).then((res) => {
        setData(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <div className="widget">
        <div className="widget__wrapper">
          <div className="widget__icon-blog">
            <NewspaperIcon className="icon-blog" />
          </div>
          <div>
            <span>{data.length}</span>
            <h4>Total blogs</h4>
          </div>
          <Link to="/blog-table">View</Link>
        </div>
      </div>
    </>
  );
};

export default BlogWidget;
