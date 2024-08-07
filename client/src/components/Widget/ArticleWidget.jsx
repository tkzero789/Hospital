import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FeedIcon from "@mui/icons-material/Feed";
import "components/Widget/Widget.scss";

const ArticleWidget = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/article`).then((res) => {
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
          <div>
            <div className="widget__icon-article">
              <FeedIcon className="icon-article" />
            </div>
          </div>
          <div>
            <span>{data.length}</span>
            <h4>Total articles</h4>
          </div>
          <Link to="/article-table">View</Link>
        </div>
      </div>
    </>
  );
};

export default ArticleWidget;
