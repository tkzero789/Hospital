import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CategoryChart from "components/DataChart/CategoryChart";
import "components/Widget/Widget.scss";

const BlogListWidget = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);

  // Fetch current blogs
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}/blog/currentBlogs`)
        .then((res) => {
          setData(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Fetch all blogs to get category
  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/blog`).then((res) => {
        setCategory(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Count the tags
  const getBlogTags = (category) => {
    const tagArray = category.map((blog) => blog.tag);

    const tagCounts = tagArray.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
    console.log(tagCounts);
    return tagCounts;
  };
  // Asign the tagCounts to totalTags
  const totalTags = getBlogTags(category);

  // Transfer to acceptable format for MUI pie chart
  const getChartData = (tagCounts) => {
    return Object.entries(tagCounts).map(([label, value], index) => ({
      id: index,
      value,
      label,
    }));
  };

  // Assign the value of formatted tagCounts to chartData
  const chartData = getChartData(totalTags);

  return (
    <>
      <div className="blog__widget">
        <div className="blog__widget-wraper">
          <div className="blog__widget-list">
            <div>
              <div>
                <h4>Recent blogs</h4>
                <Link to="/blog-table">View all</Link>
              </div>
              <div className="blog__table">
                <div className="blog__table-detail">
                  <div className="blog__table-heading">
                    <span>Title</span>
                    <span>Category</span>
                    <span>Author</span>
                  </div>
                  <div className="blog__table-list">
                    <ul>
                      {data.map((blog, index) => (
                        <li key={index}>
                          <Link to={`/blog/${blog.id}/view`}>
                            <span>{blog.title}</span>
                            <span>{blog.tag}</span>
                            <span>{blog.author}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="category-chart">
              <div>
                <h4>Total blogs by category</h4>
              </div>
              <div>
                <CategoryChart data={chartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListWidget;
