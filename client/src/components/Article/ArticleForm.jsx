import axios from "axios";
import React, { useRef } from "react";
import "components/Article/ArticleForm.scss";

const ArticleForm = ({ article, setArticle, mode }) => {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };
  // Article title
  const updateTitleField = (event) => {
    setArticle({ ...article, title: event.target.value });
  };

  // Create a ref for the file input
  const fileInputRef1 = useRef();
  const fileInputRef2 = useRef();

  // Overview
  const updateOverviewField = (event, field) => {
    let infos = [...article.infos];
    infos[0] = { ...infos[0], [field]: event.target.value };
    setArticle({ ...article, infos: infos });
  };

  // Upload
  const uploadOverviewImage = async (event, infoIndex) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    const response = await axios.post(
      `http://localhost:5000/article/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Create a new copy of the infos array
    const newInfos = [...article.infos];

    // Update the image field of the specific info object
    newInfos[infoIndex] = {
      ...newInfos[infoIndex],
      image: response.data.link,
    };

    // Update the article state
    setArticle({
      ...article,
      infos: newInfos,
    });
  };

  // Remove uploaded Overview image
  const removeOverviewImage = async (event) => {
    event.preventDefault();
    const imageToRemove = article.infos[0].image;
    if (imageToRemove) {
      try {
        const key = imageToRemove.split("/").pop();
        console.log("key url", imageToRemove);
        await axios.post(
          "http://localhost:5000/article/deleteImg",
          { key },
          apiConfig
        );
        // Clear the file input
        if (fileInputRef1.current) {
          fileInputRef1.current.value = "";
        }
        // Update the article state to set the infos.image to null
        setArticle((prevArticle) => ({
          ...prevArticle,
          infos: prevArticle.infos.map((info, index) =>
            index === 0 ? { ...info, image: null } : info
          ),
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Treatment detail
  const updateTreatmentField = (event, field) => {
    let treatments = [...article.treatments];
    treatments[0] = { ...treatments[0], [field]: event.target.value };
    setArticle({ ...article, treatments: treatments });
  };

  // Upload treatment image
  const uploadTreatmentImage = async (event, infoIndex) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    const response = await axios.post(
      `http://localhost:5000/article/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Create a new copy of the treatments array
    const newTreatments = [...article.treatments];

    // Update the image field of the specific treatment object
    newTreatments[infoIndex] = {
      ...newTreatments[infoIndex],
      image: response.data.link,
    };

    // Update the article state
    setArticle({
      ...article,
      treatments: newTreatments,
    });
  };

  // Remove uploaded Treatment image
  const removeTreatmentImage = async (event) => {
    event.preventDefault();
    const imageToRemove = article.treatments[0].image;
    if (imageToRemove) {
      try {
        const key = imageToRemove.split("/").pop();
        console.log("key url", imageToRemove);
        await axios.post(
          "http://localhost:5000/article/deleteImg",
          { key },
          apiConfig
        );
        // Clear the file input
        if (fileInputRef2.current) {
          fileInputRef2.current.value = "";
        }
        // Update the article state to set the infos.image to null
        setArticle((prevArticle) => ({
          ...prevArticle,
          treatments: prevArticle.treatments.map((treatment, index) =>
            index === 0 ? { ...treatment, image: null } : treatment
          ),
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Format overview list (detail)
  const addBulletToPointOverview = (e) => {
    e.preventDefault();
    const textarea = document.getElementsByName("detail-1")[0];
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const highlightedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);

    // Split the highlighted text into lines
    const lines = highlightedText.split("\n");

    // Check if lines already start with a bullet and modify accordingly
    const modifiedLines = lines.map((line) => {
      // Check if the line starts with spaces followed by a bullet
      if (line.startsWith("   • ")) {
        // Line already has a bullet, remove it
        return line.substring(5); // Adjust substring index based on bullet and space count
      } else {
        // Add the space and bullet if the line doesn't have it
        return `   • ${line}`;
      }
    });

    const modifiedHighlightedText = modifiedLines.join("\n");

    // Reconstruct the full text
    const newText = `${beforeText}${modifiedHighlightedText}${afterText}`;

    // Update the first info's overview
    const newInfos = article.infos.map((info, index) => {
      if (index === 0) {
        return { ...info, detail: newText };
      }
      return info;
    });

    setArticle({ ...article, infos: newInfos });
  };

  // Format treatment list (detail)
  const addBulletToPointTreatment = (e) => {
    e.preventDefault();
    const textarea = document.getElementsByName("detail-2")[0];
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const highlightedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);

    // Split the highlighted text into lines
    const lines = highlightedText.split("\n");

    // Check if lines already start with a bullet and modify accordingly
    const modifiedLines = lines.map((line) => {
      // Check if the line starts with spaces followed by a bullet
      if (line.startsWith("   • ")) {
        // Line already has a bullet, remove it
        return line.substring(5); // Adjust substring index based on bullet and space count
      } else {
        // Add the space and bullet if the line doesn't have it
        return `   • ${line}`;
      }
    });

    const modifiedHighlightedText = modifiedLines.join("\n");

    // Reconstruct the full text
    const newText = `${beforeText}${modifiedHighlightedText}${afterText}`;

    // Update the first info's overview
    const newInfos = article.infos.map((info, index) => {
      if (index === 0) {
        return { ...info, detail: newText };
      }
      return info;
    });

    setArticle({ ...article, treatments: newInfos });
  };

  console.log(article);

  return (
    <div>
      <div className="form-group row pb-5">
        <h4 className="text-dark-1 col-3 p-0">Disease</h4>
        <input
          type="text"
          className="form-control border-secondary-subtle col"
          name="diseaseName"
          value={article.diseaseName}
          readOnly={true}
        />
      </div>
      <div className="form-group row pb-5">
        <h4 className="text-dark-1 col-3 p-0">Article title</h4>
        <input
          type="text"
          className="form-control border-secondary-subtle col"
          name="title"
          placeholder="Enter the title for article"
          value={article.title}
          readOnly={mode === "view"}
          onChange={(e) => updateTitleField(e)}
        />
      </div>

      <div className="row pb-5">
        {article.infos.map((info, index) => {
          return (
            <div key={index}>
              <div className="form row pb-3">
                <div className="d-flex col-12 p-0">
                  <h4 className="text-dark-1 pb-2">Overview</h4>
                </div>
                {/* Overview */}
                <textarea
                  name="overview"
                  value={info.overview}
                  readOnly={mode === "view"}
                  className="form-control border-secondary-subtle col-9 mb-3"
                  placeholder="Intro paragraph"
                  rows="5"
                  onChange={(e) => updateOverviewField(e, "overview")}
                />
                {/* Upload image */}
                <div className="article-img-upload">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      fileInputRef1.current.click();
                    }}
                  >
                    <i className="bi bi-upload"></i>
                    <span>Upload image</span>
                  </button>
                  <input
                    type="file"
                    name="image"
                    disabled={mode === "view"}
                    placeholder="Upload image"
                    onChange={(e) => uploadOverviewImage(e, 0)}
                    ref={fileInputRef1}
                  />
                  {article.infos[0].image && (
                    <button
                      className={`${mode === "view" ? "d-none" : ""}`}
                      onClick={(e) => removeOverviewImage(e)}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  )}
                </div>
                {article.infos[0].image && (
                  <img
                    className="d-block w-50 mx-auto pt-2 pb-3"
                    src={article.infos[0].image}
                    alt="Uploaded"
                  />
                )}
                {/* Detail */}
                <div className="format-list-btn">
                  <button
                    onClick={(e) => addBulletToPointOverview(e)}
                    data-index={index}
                  >
                    <i className="bi bi-list-ul"></i>
                  </button>
                </div>
                <textarea
                  data-index={index}
                  name="detail-1"
                  value={info.detail}
                  readOnly={mode === "view"}
                  className="textarea-detail form-control border-secondary-subtle col-9"
                  placeholder="Detail paragraph(s)"
                  rows="10"
                  onChange={(e) => updateOverviewField(e, "detail")}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="row pb-5">
        {article.treatments.map((treatment, index) => {
          return (
            <div key={index}>
              <div className="form row pb-3">
                <div className="d-flex col-12 p-0">
                  <h4 className="text-dark-1 pb-2">Treatment</h4>
                </div>
                {/* Overview */}
                <textarea
                  name="overview"
                  value={treatment.overview}
                  readOnly={mode === "view"}
                  className="form-control border-secondary-subtle col-9 mb-3"
                  placeholder="Intro paragraph"
                  rows="5"
                  onChange={(e) => updateTreatmentField(e, "overview")}
                />
                {/* Upload image */}
                <div className="article-img-upload">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      fileInputRef2.current.click();
                    }}
                  >
                    <i className="bi bi-upload"></i>
                    <span>Upload image</span>
                  </button>
                  <input
                    type="file"
                    name="image"
                    disabled={mode === "view"}
                    placeholder="Upload image"
                    onChange={(e) => uploadTreatmentImage(e, 0)}
                    ref={fileInputRef2}
                  />
                  {article.treatments[0].image && (
                    <button
                      className={`${mode === "view" ? "d-none" : ""}`}
                      onClick={(e) => removeTreatmentImage(e)}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  )}
                </div>
                {article.treatments[0].image && (
                  <img
                    className="d-block w-50 mx-auto pt-2 pb-3"
                    src={article.treatments[0].image}
                    alt="Uploaded"
                  />
                )}
                {/* Detail */}
                <div className="format-list-btn">
                  <button
                    onClick={(e) => addBulletToPointTreatment(e)}
                    data-index={index}
                  >
                    <i className="bi bi-list-ul"></i>
                  </button>
                </div>
                <textarea
                  data-index={index}
                  name="detail-2"
                  value={treatment.detail}
                  readOnly={mode === "view"}
                  className="textarea-detail form-control border-secondary-subtle col-9"
                  placeholder="Detail paragraph(s)"
                  rows="10"
                  onChange={(e) => updateTreatmentField(e, "detail")}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArticleForm;
