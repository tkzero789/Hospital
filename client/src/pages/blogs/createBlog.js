import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState, useCallback } from "react";
import Italic from "@tiptap/extension-italic";
import Image from "@tiptap/extension-image";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "../../pages/blogs/texteditor.scss";

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
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <i className="bi bi-type-h1"></i>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <i className="bi bi-type-h2"></i>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <i className="bi bi-type-h3"></i>
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
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <i className="bi bi-quote"></i>
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

const CreateBlog = () => {
  const [blog, setBlog] = useState({
    id: null,
    title: "",
    content: "",
    image: null,
    createAt: null,
  });

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

  const handleClick = async (e) => {
    e.preventDefault();
    const updatedBlog = {
      ...blog,
      id: uuidv4(),
      createdAt: new Date().toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    };

    try {
      await axios.post("http://localhost:5000/blog/add", updatedBlog);
      setBlog(updatedBlog);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setBlog({ ...blog, title: e.target.value });
  };

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
  };

  return (
    <>
      <div className="content-container">
        <div className="text-editor">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
        <label htmlFor="title">Title</label>
        <input type="text" value={blog.title} onChange={onChange} />
        <button onClick={handleClick}>Submit</button>

        <input
          type="file"
          name="image"
          className="form-control border-primary-subtle col-9 mb-2"
          placeholder="Ảnh minh họa"
          onChange={(e) => updateInfoImage(e)}
        />
        {blog.image ? (
          <img className="text-editor-img" src={blog.image} alt="Blog img" />
        ) : (
          "Chưa có ảnh nào được upload"
        )}
      </div>
    </>
  );
};

export default CreateBlog;
