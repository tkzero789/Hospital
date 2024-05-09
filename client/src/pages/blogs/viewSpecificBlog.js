import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import MainNav from "../../components/Navbar/MainNav";
import LowNav from "../../components/Navbar/LowNav";

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
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          {blog.content.content.map((item, index) => {
            if (item.type === "paragraph") {
              return (
                <p key={index}>
                  {item.content.map((textObj, textObjIndex) => (
                    <span key={textObjIndex}>{textObj.text}</span>
                  ))}
                </p>
              );
            } else if (item.type === "bulletList") {
              return (
                <ul key={index}>
                  {item.content.map((listItem, listItemIndex) => (
                    <li key={listItemIndex}>
                      {listItem.content.map((paragraph, paragraphIndex) => (
                        <span key={paragraphIndex}>
                          {paragraph.content.map((textObj, textObjIndex) => (
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
                  {item.content.map((listItem, listItemIndex) => (
                    <li key={listItemIndex}>
                      {listItem.content.map((paragraph, paragraphIndex) => (
                        <span key={paragraphIndex}>
                          {paragraph.content.map((textObj, textObjIndex) => (
                            <span key={textObjIndex}>{textObj.text}</span>
                          ))}
                        </span>
                      ))}
                    </li>
                  ))}
                </ol>
              );
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default ViewSpecificBlog;
