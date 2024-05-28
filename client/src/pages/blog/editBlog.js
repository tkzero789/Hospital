import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Italic from "@tiptap/extension-italic";
import Image from "@tiptap/extension-image";
import "../../pages/blog/texteditor.scss";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="menu-bar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <i className="bi bi-type-bold"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <i className="bi bi-type-italic"></i>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          Tựa đề phụ
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <i className="bi bi-list-ul"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <i className="bi bi-list-ol"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </>
  );
};

const EditBlog = ({ userInfos }) => {
  const navigate = useNavigate();
  // Create a ref for the file input
  const fileInputRef = useRef();

  const { blogId } = useParams();

  const [blog, setBlog] = useState(null);
  const [userUploadedImage, setUserUploadedImage] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Italic, Image],
    content: "",
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setBlog((prev) => ({
        ...prev,
        content: json,
      }));
    },
  });

  // Fetch blog content based on id
  useEffect(() => {
    console.log(blogId);
    axios
      .get(`http://localhost:5000/blog/${blogId}`)
      .then((res) => {
        setBlog(res.data);
        if (editor) {
          editor.commands.setContent(res.data.content);
        }
      })
      .catch((err) => {
        const message = `Có lỗi xảy ra: ${err}`;
        window.alert(message);
      });
  }, [blogId, editor]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  // Submit button
  const handleClick = async (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(
      now.getMonth() + 1
    ).padStart(2, "0")}/${now.getFullYear()}`;
    const updatedBlog = {
      ...blog,
      status: "Pending",
      createdAt: formattedTime,
    };

    try {
      await axios.post(
        `http://localhost:5000/blog/edit/${blogId}`,
        updatedBlog
      );
      setBlog(updatedBlog);
      console.log(updatedBlog);
    } catch (error) {
      console.log(error);
    }
    navigate("/blog-table");
  };

  // Value from title input
  const onChangeTitle = (e) => {
    setBlog({ ...blog, title: e.target.value });
  };

  // Value from intro input
  const onChangeIntro = (e) => {
    setBlog({ ...blog, intro: e.target.value });
  };

  // Upload image
  const updateInfoImage = async (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    const response = await axios.post(
      `http://localhost:5000/blog/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setBlog((prevBlog) => ({
      ...prevBlog,
      image: response.data.link,
    }));
    setUserUploadedImage(true);
    fileInputRef.current = event.target;
  };

  // Remove image
  const removeImage = async (e) => {
    e.preventDefault();
    try {
      // Extract the key from the image URL
      const key = blog.image.split("/").pop();

      await axios.post(`http://localhost:5000/blog/delete`, { key });

      // Remove the image from the blog state
      setBlog((prevBlog) => ({
        ...prevBlog,
        image: null,
      }));
    } catch (error) {
      console.error(error);
    }
    setUserUploadedImage(false);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="content-container create-blog-text-editor">
        <h1>Chỉnh sửa bài blog:</h1>
        <span>
          Tác giả: <span className="text-blue-1">{userInfos.fullName}</span>
        </span>
        <div className="text-editor-title">
          <label htmlFor="title">Tựa đề:</label>
          <textarea value={blog.title} onChange={onChangeTitle} />
        </div>
        <div className="text-editor-intro">
          <label htmlFor="intro">Đoạn mở đầu:</label>
          <textarea value={blog.intro} onChange={onChangeIntro} />
        </div>
        <div className="text-editor-img">
          <label htmlFor="image">Ảnh bài blog:</label>
          <input
            type="file"
            name="image"
            className="form-control border-primary-subtle col-9 mb-2"
            placeholder="Ảnh minh họa"
            onChange={(e) => updateInfoImage(e)}
            ref={fileInputRef}
          />
        </div>
        {userUploadedImage ? (
          <div className="text-editor-img">
            <img src={blog.image} alt="Blog img" />
            <button onClick={removeImage} className="border rounded">
              <i className="bi bi-trash3-fill"></i>
            </button>
          </div>
        ) : (
          <div className="pt-2">Chưa có ảnh nào được upload</div>
        )}
        <label htmlFor="info">Info</label>
        <div className="text-editor">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>

        <div className="text-editor-btn">
          <Link
            className="btn btn-outline-secondary"
            to={`/blog/${blogId}/view`}
          >
            Quay lại
          </Link>
          <button className="btn btn-primary ms-auto" onClick={handleClick}>
            Xác nhận chỉnh sửa
          </button>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
