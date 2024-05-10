import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import MainNav from "../../components/Navbar/MainNav";
import LowNav from "../../components/Navbar/LowNav";
import Footer from "../../components/ForPages/Footer";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

const ViewSpecificBlog = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blog")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!blogs) {
    return <div>Loading...</div>;
  }

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return <div>Blog not found</div>;
  }

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
          ,
          <Link className="text-secondary" to="/view-blog-list">
            Tin tức
          </Link>
          ,<Typography className="text-dark">{blog.title}</Typography>,
        </Breadcrumbs>
      </div>

      <div className="content-container individual-blog">
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.intro}</p>
          {blog.image && (
            <div className="blog-img">
              <img src={blog.image} alt={blog.title} />
            </div>
          )}
          {blog.content?.content.map((item, index) => {
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
      <Footer />
    </>
  );
};

export default ViewSpecificBlog;
