import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Italic from "@tiptap/extension-italic";
import Image from "@tiptap/extension-image";
import axios from "axios";
import ConfirmModal from "components/UI/ConfirmModal";
import MenuBar from "components/Blog/MenuBar";
import "pages/Blog/Texteditor.scss";
import "pages/Blog/Blog.scss";
import Spinner from "components/UI/Spinner";

const EditBlog = ({ userInfos }) => {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  // Track image being removed from blog state
  const [imagesToRemoveFromS3, setImagesToRemoveFromS3] = useState([]);

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
    case "edit":
      action = confirmEdit;
      break;
    case "cancel":
      action = confirmCancel;
      break;
    default:
      action = null;
  }

  const navigate = useNavigate();
  // Create a ref for the file input
  const fileInputRef = useRef();

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

  const { blogId } = useParams();

  // Blog state
  const [blog, setBlog] = useState(null);

  // Fetch blog content based on id
  useEffect(() => {
    console.log(blogId);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/blog/${blogId}`)
      .then((res) => {
        setBlog(res.data);
        if (editor) {
          editor.commands.setContent(res.data.content);
        }
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, [blogId, editor]);
  // if node is undefined
  if (!blog) {
    return (
      <div className="spinner">
        <Spinner />
      </div>
    );
  }

  // Confirm cancel
  function confirmCancel() {
    if (
      blog.content.content.filter((item) => item.type === "image").length !==
      blog.image.length
    ) {
      window.alert(
        "Please drag the uploaded image(s) into the text editor. If you do not plan to use them, please remove the unused images before exiting."
      );
      return;
    }

    navigate(`/blog/${blogId}/view`);
  }

  console.log(blog.image.length);
  console.log(
    blog.content.content.filter((item) => item.type === "image").length
  );

  // Confirm edit button
  async function confirmEdit() {
    let isSuccessful = false;

    // Check empty input
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
    } else if (
      blog.content.content.filter((item) => item.type === "image").length !==
      blog.image.length
    ) {
      window.alert(
        "Please drag the uploaded image(s) into the text editor. If you do not plan to use them, please remove the unused images before submitting."
      );
      return;
    }

    // Process each image removal from S3
    for (const key of imagesToRemoveFromS3) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/blog/deleteImg`,
          { key },
          apiConfig
        );
      } catch (error) {
        console.error("Failed to remove image from S3:", error);
        window.alert(
          "Failed to remove an image from the server. Please try again."
        );
        return;
      }
    }

    const now = new Date();
    const newSlug = generateSlug(blog.title);
    const updatedBlog = {
      ...blog,
      slug: newSlug,
      status: "Updated Revision",
      createdAt: now,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/blog/edit/${blogId}`,
        updatedBlog,
        apiConfig
      );
      setBlog(updatedBlog);
      isSuccessful = true;
      console.log(updatedBlog);
    } catch (error) {
      console.log(error);
      return;
    }

    if (isSuccessful) {
      setIsClicked(true);
      setTimeout(() => {
        toast.success("Edited successfully!");
        setTimeout(() => {
          navigate("/blog-table");
        }, 1200);
      }, 500);
    }
    // Clear tracking images
    setImagesToRemoveFromS3([]);
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
        `${process.env.REACT_APP_API_BASE_URL}/blog/upload`,
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

  // Remove existing image (but not totally remove from s3 yet)
  const removeImgTemp = (index) => {
    const imageToRemove = blog.image[index];
    const key = imageToRemove.split("/").pop();

    // Add the key (url) to track the image link
    setImagesToRemoveFromS3((prevKey) => [...prevKey, key]);

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Check if the image to remove exists in the content array
    const imageExistsInContent = blog.content.content.some(
      (contentItem) =>
        contentItem.type === "image" &&
        contentItem.attrs.src.split("/").pop() === key
    );

    setBlog((prevBlog) => ({
      ...prevBlog,
      image: prevBlog.image.filter((_, imgIndex) => imgIndex !== index),
      content: imageExistsInContent
        ? {
            ...prevBlog.content,
            content: prevBlog.content.content.filter(
              (contentItem) =>
                !(
                  contentItem.type === "image" &&
                  contentItem.attrs.src.split("/").pop() === key
                )
            ),
          }
        : { ...prevBlog.content },
    }));

    removeImageFromEditorContent(imageToRemove);
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
        <h3>Edit blog</h3>
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
          <textarea value={blog.intro} onChange={onChangeIntro} />
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
                <button onClick={() => removeImgTemp(index)}>
                  Remove image
                </button>
              </div>
            ))
          ) : (
            <div className="w-100">
              Image area empty. Please upload an image.
            </div>
          )}
        </div>
        <label htmlFor="info">Info</label>
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
                "Cancel blog editing",
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
                "edit",
                "Review and submit revisions",
                "Once confirmed, your revisions will be submitted and will go through a review process. Would you like to proceed?"
              )
            }
          >
            Submit revisions
          </button>
        </div>
      </div>
      <Toaster
        toastOptions={{
          className: "toast-noti",
        }}
        position="top-right"
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

export default EditBlog;
