import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { EditorContent, useEditor } from "@tiptap/react";
import { Toaster, toast } from "sonner";
import StarterKit from "@tiptap/starter-kit";
import Italic from "@tiptap/extension-italic";
import Image from "@tiptap/extension-image";
import axios from "axios";
import ConfirmModal from "components/UI/ConfirmModal";
import MenuBar from "components/Blog/MenuBar";
import "pages/Blog/Texteditor.scss";
import "pages/Blog/Blog.scss";

const CreateBlog = ({ userInfos }) => {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  // State for pop-up modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [actionType, setActionType] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  // Show modal
  const handleShowModal = (event, actionType, title, body) => {
    event.preventDefault();
    setActionType(actionType);
    setModalContent({ title, body });
    setShowModal(true);
  };

  // Hide modal
  const handleHideModal = () => {
    setActionType(null);
    setModalContent({ title: "", body: "" });
    setShowModal(false);
  };

  let action;
  switch (actionType) {
    case "create":
      action = confirmCreate;
      break;
    case "cancel":
      action = confirmCancel;
      break;
    default:
      action = null;
  }

  // Navigate
  const navigate = useNavigate();

  // Create a ref for the file input
  const fileInputRef = useRef();

  // Blog state
  const [blog, setBlog] = useState({
    id: null,
    title: "",
    tag: "",
    intro: "",
    image: [],
    content: "",
    slug: "",
    author: userInfos.fullName,
    doctorID: userInfos.doctorID,
    createAt: null,
    status: "Awaiting Review",
  });

  // Text editor
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

  // Confirm cancel
  function confirmCancel() {
    navigate("/blog-table");
  }

  // Confirm create button
  async function confirmCreate() {
    let isSuccessful = false;

    if (blog.title === "") {
      window.alert("Please enter the title for this blog");
      return;
    } else if (blog.tag === "") {
      window.alert("Please select a tag for this blog");
      return;
    } else if (blog.intro === "") {
      window.alert("Please enter the intro");
      return;
    } else if (blog.image.length === 0) {
      window.alert("Please upload image(s) for this blog");
      return;
    } else if (
      blog.content === "" ||
      blog.content.content.some(
        (item) => item.type === "paragraph" && !item.content
      )
    ) {
      window.alert("Please enter the text content for this blog");
      return;
    } else if (!blog.content.content.some((item) => item.type === "image")) {
      window.alert("Please drag the uploaded image(s) into the text editor");
      return;
    }

    const now = new Date();
    const updatedBlog = {
      ...blog,
      id: uuidv4(),
      createdAt: now,
    };

    try {
      await axios.post(
        `https://bayside-render-server.onrender.com/blog/add`,
        updatedBlog,
        apiConfig
      );
      setBlog(updatedBlog);
      isSuccessful = true;
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "A blog with this title already exists."
      ) {
        // Handle the specific case of a duplicate blog title
        alert(
          "A blog with this title already exists. Please choose a different title."
        );
      } else {
        // Handle other types of errors
        console.log(error);
        alert("An error occurred while creating the blog. Please try again.");
      }
      return;
    }

    if (isSuccessful) {
      setIsClicked(true);
      setTimeout(() => {
        toast.success("Created successfully!");
        setTimeout(() => {
          navigate("/blog-table");
        }, 1200);
      }, 500);
    }
  }

  // Slug generation function
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphens
      .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens
  };

  // Value from title input
  const onChangeTitle = (e) => {
    const newTitle = e.target.value;
    const newSlug = generateSlug(newTitle);
    setBlog({ ...blog, title: newTitle, slug: newSlug });
  };

  // Value from tag select
  const onChangeTag = (e) => {
    setBlog({ ...blog, tag: e.target.value });
  };

  // Value from intro input
  const onChangeIntro = (e) => {
    setBlog({ ...blog, intro: e.target.value });
  };

  // Upload image
  const uploadImage = async (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    try {
      const response = await axios.post(
        `https://bayside-render-server.onrender.com/blog/upload`,
        formData,
        {
          ...apiConfig,
          headers: {
            ...apiConfig.headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setBlog((prevBlog) => ({
        ...prevBlog,
        image: [...prevBlog.image, response.data.link],
      }));
    } catch (error) {
      console.error(error);
    }
    fileInputRef.current = event.target;
  };

  // Remove uploaded image
  const removeImage = async (index) => {
    const imageToRemove = blog.image[index];
    if (imageToRemove) {
      try {
        const key = imageToRemove.split("/").pop();
        console.log("key url", imageToRemove);
        await axios.post(
          `https://bayside-render-server.onrender.com/blog/deleteImg`,
          { key },
          apiConfig
        );

        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Check if the image to remove exists in the content array
        // const imageExistsInContent = blog.content.content.some(
        //   (contentItem) =>
        //     contentItem.type === "image" &&
        //     contentItem.attrs.src.split("/").pop() === key
        // );

        // Update the blog state to remove the image
        setBlog((prevBlog) => ({
          ...prevBlog,
          image: prevBlog.image.filter((_, imgIndex) => imgIndex !== index),
          content: {
            ...prevBlog.content,
            content: prevBlog.content.content.filter(
              (contentItem) =>
                !(
                  contentItem.type === "image" &&
                  contentItem.attrs.src.split("/").pop() === key
                )
            ),
          },
        }));

        // Remove image in the textarea
        removeImageFromEditorContent(imageToRemove);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Remove image from EditorContent
  const removeImageFromEditorContent = (imageUrl) => {
    if (editor) {
      const currentContent = editor.getJSON();
      const removeImageNode = (nodes) =>
        nodes.filter((node) => {
          if (node.type === "image" && node.attrs.src === imageUrl) {
            return false;
          }
          if (node.content) {
            node.content = removeImageNode(node.content);
          }
          return true;
        });

      const updatedContent = {
        ...currentContent,
        content: removeImageNode(currentContent.content),
      };

      editor.commands.setContent(updatedContent);
    }
  };

  console.log(blog);

  return (
    <>
      <div className="content-container create-blog-text-editor">
        <h3>Create new blog</h3>
        <span>
          By: <span className="text-blue-3">{userInfos.fullName}</span>
        </span>
        <div className="text-editor-title">
          <label htmlFor="title">Title:</label>
          <textarea value={blog.title} onChange={onChangeTitle} />
        </div>
        <div className="text-editor-tag">
          <label htmlFor="category">Category:</label>
          <select value={blog.tag} onChange={onChangeTag}>
            <option value="">Select category</option>
            <option value="Children's Health">Children's Health</option>
            <option value="Diet & Food">Diet & Food</option>
            <option value="Emotional Wellbeing">Emotional Wellbeing</option>
            <option value="Exercise & Fitness">Exercise & Fitness</option>
            <option value="Men's Health">Men's Health</option>
            <option value="Parenting">Parenting</option>
            <option value="Pregnancy & Childbirth">
              Pregnacy & Childbirth
            </option>
            <option value="Primary Care">Primary Care</option>
            <option value="Science & Research">Science & Research</option>
            <option value="Sex & Relationship">Sex & Relationship</option>
            <option value="Wellness">Wellness</option>
            <option value="Women's Health">Women's Health</option>
          </select>
        </div>
        <div className="text-editor-intro">
          <label htmlFor="intro">Introduction:</label>
          <textarea
            className="intro-textarea"
            value={blog.intro}
            onChange={onChangeIntro}
          />
        </div>
        <div className="text-editor-img">
          <label htmlFor="image">Blog image:</label>
          <div>
            <button onClick={() => fileInputRef.current.click()}>
              <i className="bi bi-upload"></i>
              <span>Upload image</span>
            </button>
            <input
              type="file"
              name="image"
              className="flex-grow-1 ps-3 py-1"
              onChange={(e) => uploadImage(e)}
              ref={fileInputRef}
            />
          </div>
        </div>
        <div className="text-editor-uploaded-img">
          {blog.image && blog.image.length > 0 ? (
            blog.image.map((img, index) => (
              <div key={index}>
                <img src={img} alt="Blog img" />
                <button onClick={() => removeImage(index)}>Remove image</button>
              </div>
            ))
          ) : (
            <div className="w-100">
              Image area empty. Please upload an image.
            </div>
          )}
        </div>
        <label htmlFor="info">Blog content:</label>
        <div className="text-editor">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>

        <div className="text-editor-btn">
          <button
            className="c-2 btn btn-outline-secondary"
            onClick={(event) =>
              handleShowModal(
                event,
                "cancel",
                "Cancel blog creation",
                "Would you like to perform this action?"
              )
            }
          >
            Cancel
          </button>
          <button
            className="c-2 btn btn-primary"
            onClick={(event) =>
              handleShowModal(
                event,
                "create",
                "Create new blog",
                "Once confirmed, your submission will go through a review process. Would you like to perform this action?"
              )
            }
          >
            Create
          </button>
        </div>
      </div>
      <Toaster
        toastOptions={{
          className: "toast-noti",
        }}
        richColors
      />
      <ConfirmModal
        title={modalContent.title}
        body={modalContent.body}
        show={showModal}
        hide={handleHideModal}
        action={action}
        isClicked={isClicked}
      />
    </>
  );
};

export default CreateBlog;
