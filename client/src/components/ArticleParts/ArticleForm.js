import axios from "axios";
import React from "react";

const ArticleForm = ({ article, setArticle, mode }) => {
  // Article title
  const updateTitleField = (event) => {
    setArticle({ ...article, title: event.target.value });
  };

  // Overview
  const updateOverviewField = (event, field) => {
    let infos = [...article.infos];
    infos[0] = { ...infos[0], [field]: event.target.value };
    setArticle({ ...article, infos: infos });
  };

  // Upload
  const uploadOverviewImage = async (event, infoIndex) => {
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

  return (
    <div>
      <div className="form-group row pb-5">
        <h4 className="text-dark-1 col-3">Disease</h4>
        <input
          type="text"
          className="form-control border-primary-subtle col"
          name="diseaseName"
          value={article.diseaseName}
          readOnly={true}
        />
      </div>
      <div className="form-group row pb-5">
        <h4 className="text-dark-1 col-3">Article title</h4>
        <input
          type="text"
          className="form-control border-primary-subtle col"
          name="title"
          placeholder="Enter title for article"
          value={article.title}
          readOnly={mode === "view"}
          onChange={(e) => updateTitleField(e)}
        />
      </div>

      <div className="row pb-5">
        {article.infos.map((info) => {
          return (
            <div key={info.id}>
              <div className="form row pb-3">
                <div className="d-flex col-12">
                  <h4 className="text-dark-1 pb-2">Info</h4>
                </div>
                {/* Overview */}
                <textarea
                  name="overview"
                  value={info.overview}
                  readOnly={mode === "view"}
                  className="form-control border-primary-subtle col-9 mb-2"
                  placeholder="Overview"
                  rows="5"
                  onChange={(e) => updateOverviewField(e, "overview")}
                />
                {/* Upload image */}
                <input
                  type="file"
                  name="image"
                  className="form-control border-primary-subtle col-9 mb-2"
                  disabled={mode === "view"}
                  placeholder="Upload image"
                  onChange={(e) => uploadOverviewImage(e, 0)}
                />
                {article.infos[0].image && (
                  <img
                    className="d-block w-50 mx-auto"
                    src={article.infos[0].image}
                    alt="Uploaded"
                  />
                )}
                {/* Detail */}
                <textarea
                  name="detail"
                  value={info.detail}
                  readOnly={mode === "view"}
                  className="form-control border-primary-subtle col-9"
                  placeholder="Details"
                  rows="10"
                  onChange={(e) => updateOverviewField(e, "detail")}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="row pb-5">
        {article.treatments.map((treatment) => {
          return (
            <div key={treatment.id}>
              <div className="form row pb-3">
                <div className="d-flex col-12">
                  <h4 className="text-dark-1 pb-2">Treament</h4>
                </div>
                {/* Overview */}
                <textarea
                  name="overview"
                  value={treatment.overview}
                  readOnly={mode === "view"}
                  className="form-control border-primary-subtle col-9 mb-2"
                  placeholder="Overview"
                  rows="5"
                  onChange={(e) => updateTreatmentField(e, "overview")}
                />
                {/* Upload image */}
                <input
                  type="file"
                  name="image"
                  className="form-control border-primary-subtle col-9 mb-2"
                  disabled={mode === "view"}
                  placeholder="Upload image"
                  onChange={(e) => uploadTreatmentImage(e, 0)}
                />
                {article.treatments[0].image && (
                  <img
                    className="d-block w-50 mx-auto"
                    src={article.treatments[0].image}
                    alt="Uploaded"
                  />
                )}
                {/* Detail */}
                <textarea
                  name="detail"
                  value={treatment.detail}
                  readOnly={mode === "view"}
                  className="form-control border-primary-subtle col-9"
                  placeholder="Details"
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
